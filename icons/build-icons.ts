import { promises as fs } from "node:fs";
import * as path from "node:path";
import glob from "glob";
import { parse } from "node-html-parser";
import { getSvgData, VariantType } from "./data.js";

/**
 * This script aim to generate a single SVG sprite integrating SVG data except size property
 * size property is set dynamically in a react component
 */

const SVG_STYLES = ["nav", "utility", "toaster", "heading", "chart", "player"] as VariantType[];
const FALLBACK_COLOR = "red";

let nbrOfIcons = 0;

const cwd = process.cwd();

const inputDir = path.join(cwd, "icons", "svg");
const inputDirRelative = path.relative(cwd, inputDir);
const outputDir = path.join(cwd.replace(/\/svg/g, ""), "public");
const outputDirRelative = path.relative(cwd, outputDir);

const files = glob
  .sync("**/*.svg", {
    cwd: inputDir,
  })
  .sort((a, b) => a.localeCompare(b));
if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`);
  process.exit(0);
}
/**
 * Outputs an SVG string with all the icons as symbols
 */
const generateSvgSprite = async ({ files, inputDir }: { files: string[]; inputDir: string }) => {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const input = await fs.readFile(path.join(inputDir, file), "utf8");
      const root = parse(input);
      const svg = root.querySelector("svg");
      const id = file.replace(/\.svg$/, "");
      if (!svg) throw new Error("No SVG element found");
      svg.tagName = "symbol";
      svg.setAttribute("id", id);
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xmlns:xlink");
      svg.removeAttribute("version");
      svg.removeAttribute("width");
      svg.removeAttribute("height");

      const backgroundColorReg = new RegExp(`backgroundColor`, "g");
      const mainColorReg = new RegExp(`mainColor`, "g");
      const { backgroundColor, mainColor } = findColors(id);

      return svg
        .toString()
        .replace(backgroundColorReg, `${backgroundColor}`)
        .replace(mainColorReg, `${mainColor.color[0]}`)
        .trim();
    })
  );

  nbrOfIcons = symbols.length;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`,
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n");
};

/**
 * Find in all svg data the properties of the icon and return them
 * @param id
 * @returns
 */
const findColors = (iconName: string) => {
  let backgroundColor = FALLBACK_COLOR;
  let mainColor = { color: ["", ""] };
  for (const variant of SVG_STYLES) {
    const svgData = getSvgData(variant);
    for (const [name, value] of Object.entries(svgData.icons)) {
      if (name === iconName) {
        backgroundColor = svgData.backgroundColor || FALLBACK_COLOR;
        mainColor = value;
        break;
      }
    }
  }
  return { backgroundColor, mainColor };
};

/**
 * Each write can trigger dev server reloads
 * so only write if the content has changed
 */
const writeIfChanged = async (filepath: string, newContent: string) => {
  const currentContent = await fs.readFile(filepath, "utf8");
  if (currentContent !== newContent) {
    return fs.writeFile(filepath, newContent, "utf8");
  }
};

// The relative paths are just for cleaner logs
console.log(`Generating sprite for ./${inputDirRelative} to ./${outputDirRelative}`);
console.log(
  `Found ${files.length} SVG files in ./${inputDirRelative} and generated ${nbrOfIcons} symbols`
);

const spritesheetContent = await generateSvgSprite({
  files,
  inputDir,
});
await writeIfChanged(path.join(outputDir, "sprite.svg"), spritesheetContent);
