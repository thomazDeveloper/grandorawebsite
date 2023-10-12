const webpack = require('webpack');

module.exports = {
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
            url: require.resolve("url")
        },
    },

};

// const webpack = require('webpack');
// module.exports = function override(config, env) {
//     config.resolve.fallback = {
//         url: require.resolve('url'),
//         fs: require.resolve('fs'),
//         assert: require.resolve('assert'),
//         crypto: require.resolve('crypto-browserify'),
//         http: require.resolve('stream-http'),
//         https: require.resolve('https-browserify'),
//         os: require.resolve('os-browserify/browser'),
//         buffer: require.resolve('buffer'),
//         stream: require.resolve('stream-browserify'),
//     };
//     config.plugins.push(
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     );
//     return config;
// }