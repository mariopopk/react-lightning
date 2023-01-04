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
        sourcemap: "inline",
      },
      {
        file: "dist/esm/index.js", //should be same as packageJson.module
        format: "esm",
        sourcemap: "inline",
      },
    ],
    plugins: [
      resolve(),
      commonjs(),

      postcss({
        sourceMap: true,
        minimize: true,
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
      }),

      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
