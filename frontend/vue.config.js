const { defineConfig } = require('@vue/cli-service')
const path = require('path');
// module.exports = defineConfig({
//   transpileDependencies: true
// });

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/restaurant_management'),
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
  }
}
