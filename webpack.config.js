const path = require('path')

module.exports = 
{
    entry: './src/dk/website/app/AvaApp.js',
    output: 
    {
        filename: 'es5-bundle.js',
        path: path.resolve(__dirname, 'src')
    },
    module: 
    {
        rules: 
        [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 
                {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}