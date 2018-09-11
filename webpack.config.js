const path = require('path')

module.exports = 
{
    entry : './src/dk/website/app/AvaApp.js',
    output : 
    {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'src')
        //path: path.resolve(__dirname, 'dist')
    }
}