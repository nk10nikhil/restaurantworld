const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
// module.exports = defineConfig({
//   transpileDependencies: true
// });

module.exports = {
  outputDir: path.resolve(__dirname, 'dist'),
  devServer: {
    host: 'localhost',
    port: 8080,
    allowedHosts: 'all',
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('CopyToBackend', (compilation) => {
            fsExtra.copySync(
              path.resolve(__dirname, 'dist'),
              path.resolve(__dirname, '../backend/restaurant_management'),
              { overwrite: true }
            );
            console.log('Copied build files to backend/restaurant_management');
          });
        }
      }
    ]
  }
}
