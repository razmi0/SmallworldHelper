// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions,
//   ArcElement,
//   BarElement,
// } from "chart.js";
// import { Line as ChartLine, Pie as ChartPie, Bar as ChartBar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   BarElement
// );

// //test imports
// //--
// import { describe, it, expect } from "vitest";
// import { render } from "@testing-library/react";
// import { ChartContainer } from "../components/containers/Containers";

// type LineProps = {
//   data: ChartData<"line">;
//   options: ChartOptions<"line">;
//   theme?: "light" | "dark";
// };

// type BarProps = {
//   data: ChartData<"bar">;
//   options: ChartOptions<"bar">;
//   theme?: "light" | "dark";
// };

// type PieProps = {
//   data: ChartData<"pie">;
//   options: ChartOptions<"pie">;
//   theme?: "light" | "dark";
// };

// const Line = ({ data, options, theme = "dark" }: LineProps) => {
//   if (options.plugins?.tooltip) {
//     options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
//     options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
//   }
//   return <ChartLine data={data} options={options} />;
// };

// const Pie = ({ data, options, theme = "dark" }: PieProps) => {
//   if (options.plugins?.tooltip) {
//     options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
//     options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
//   }
//   return <ChartPie data={data} options={options} />;
// };

// const Bar = ({ data, options, theme = "dark" }: BarProps) => {
//   if (options.plugins?.tooltip) {
//     options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
//     options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
//   }
//   return <ChartBar options={options} data={data} />;
// };

// describe("<Charts />", () => {
//   it("should render charts correctly", () => {
//     const { container } = render(
//       <ChartContainer isOpen>
//         <Line
//           data={{
//             labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//             datasets: [
//               {
//                 label: "# of Votes",
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: "rgb(255, 99, 132)",
//                 borderColor: "rgba(255, 99, 132, 0.2)",
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               tooltip: {
//                 backgroundColor: "#242424",
//                 bodyColor: "#ffffffde",
//               },
//             },
//           }}
//         />
//         <Pie
//           data={{
//             labels: ["Red", "Blue", "Yellow"],
//             datasets: [
//               {
//                 label: "# of Votes",
//                 data: [12, 19, 3],
//                 backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               tooltip: {
//                 backgroundColor: "#242424",
//                 bodyColor: "#ffffffde",
//               },
//             },
//           }}
//         />
//         <Bar
//           data={{
//             labels: ["Red", "Blue", "Yellow"],
//             datasets: [
//               {
//                 label: "# of Votes",
//                 data: [12, 19, 3],
//                 backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               tooltip: {
//                 backgroundColor: "#242424",
//                 bodyColor: "#ffffffde",
//               },
//             },
//           }}
//         />
//       </ChartContainer>
//     );
//     expect(container.firstChild).toMatchSnapshot();
//   });
// });
