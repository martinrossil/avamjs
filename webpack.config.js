const path = require('path');

module.exports = 
{
    entry: './src/dk/website/app/AvaApp.js',
    output: 
    {
        filename: 'bundle.v5.js',
        path: path.resolve(__dirname, './src')
    }
}