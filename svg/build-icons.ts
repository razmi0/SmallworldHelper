import { promises as fs } from "node:fs";
import * as path from "node:path";
import glob from "glob";
import { parse } from "node-html-parser";

let nicons = 0;
const t1 = performance.now();
const cwd = process.cwd();

const inputDir = path.join(cwd, "svg", "icons");
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

const spritesheetContent = await generateSvgSprite({
  files,
  inputDir,
});
await writeIfChanged(path.join(outputDir, "sprite.svg"), spritesheetContent);
/**
 * Outputs an SVG string with all the icons as symbols
 */
async function generateSvgSprite({ files, inputDir }: { files: string[]; inputDir: string }) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const input = await fs.readFile(path.join(inputDir, file), "utf8");
      const root = parse(input);
      const svg = root.querySelector("svg");
      if (!svg) throw new Error("No SVG element found");
      svg.tagName = "symbol";
      svg.setAttribute("id", file.replace(/\.svg$/, ""));
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xmlns:xlink");
      svg.removeAttribute("version");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      return svg.toString().trim();
    })
  );

  nicons = symbols.length;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`,
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n");
}

/**
 * Each write can trigger dev server reloads
 * so only write if the content has changed
 */
async function writeIfChanged(filepath: string, newContent: string) {
  const currentContent = await fs.readFile(filepath, "utf8");
  if (currentContent !== newContent) {
    return fs.writeFile(filepath, newContent, "utf8");
  }
}

const t2 = performance.now();

// The relative paths are just for cleaner logs
console.log(`Generating sprite for ./${inputDirRelative} to ./${outputDirRelative}`);
console.log(
  `Found ${files.length} SVG files in ./${inputDirRelative} and generated ${nicons} symbols in ${
    t2 - t1
  }ms`
);
