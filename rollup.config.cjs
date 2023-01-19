const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const terser = require("@rollup/plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const { default: dts } = require("rollup-plugin-dts");

// export default
module.exports = [
  {
    input: "src/index.ts",
    external: ["react", "react-dom"],
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
      peerDepsExternal(),

      resolve(),
      commonjs(),

      postcss({
        minimize: true,
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
      }),

      typescript({ tsconfig: "./tsconfig.json" }),
      terser({}),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
