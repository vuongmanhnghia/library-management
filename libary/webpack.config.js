module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: [/node_modules\/@antv\/util/],
            },
        ],
        rules: [
            {
                test: /\.pdf$/,
                use: 'file-loader',
            },
        ],
    },
};
