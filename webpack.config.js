const path = require('path');

module.exports = 
{
    entry: './src/dk/website/app/AvaApp.js',
    output: 
    {
        filename: 'es6.bundle.js',
        path: path.resolve(__dirname, './src')
    }
}