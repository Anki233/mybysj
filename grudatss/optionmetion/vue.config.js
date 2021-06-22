module.exports = {
    lintOnSave: false,
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        open: true,
        proxy: {
            '/admin': {
                target: 'http://localhost:5086',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': ''
                }
            }
        }
    }
}
