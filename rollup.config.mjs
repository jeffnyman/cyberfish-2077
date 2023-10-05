import fs from "fs";
import copy from "rollup-plugin-copy";
import browsersync from "rollup-plugin-browsersync";

export default {
  input: "./src/scripts/script.js",

  output: {
    file: "./app/app.js",
    format: "iife",
  },

  plugins: [
    copy({
      targets: [{ src: "./src/*.{html,css,ico}", dest: "./app" }],
    }),
    watcher({ src: "./src/index.html", dest: "index.html" }),
    watcher({ src: "./src/style.css", dest: "style.css" }),
    browsersync({
      server: "./app",
      watch: true,
      port: 8080,
    }),
  ],
};

function watcher({ src, dest }) {
  return {
    name: "watcher",

    async buildStart() {
      this.addWatchFile(src);
    },

    async generateBuild() {
      this.emitFile({
        type: "asset",
        fileName: dest,
        source: fs.readFileSync(src),
      });
    },
  };
}
