const path = require("path");

module.exports = {
  publicPath: "/frontend-challenge/",
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
        "@js": path.resolve(__dirname, "src/js"),
        "@components": path.resolve(__dirname, "src/components"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@views": path.resolve(__dirname, "src/views")
      }
    }
  }
};
