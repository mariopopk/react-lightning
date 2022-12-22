import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
// import postcssModulesValues from "postcss-modules-values";

export default [
  {
    input: "src/index.ts",
    external: ["react"],
    output: [
      {
        file: "dist/cjs/index.js", //should be same as packageJson.main
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js", //should be same as packageJson.module
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),

      postcss({
        // plugins: [postcssModulesValues],
        sourceMap: true,
        minimize: true,
        modules: true,
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
