const path = require('path');

module.exports = 
{
    entry: './src/dk/website/app/AvaApp.js',
    output: 
    {
        filename: 'bundle.0.5.4.js',
        path: path.resolve(__dirname, './src')
    }
}