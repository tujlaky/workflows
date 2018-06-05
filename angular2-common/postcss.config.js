// 'use strict';

module.exports = {
    plugins: [
        require('postcss-preset-env')({
            sourceMap: true
        }),
        require('postcss-apply')({
            sourceMap: true
        }),
        require('postcss-responsive-type')({
            sourceMap: true
        })
    ]
};