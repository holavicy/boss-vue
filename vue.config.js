module.exports = {
    devServer: {
        proxy: {
            '/emro_boss': {
                target: 'http://127.0.0.1:8080'
            }
        }
    },
}