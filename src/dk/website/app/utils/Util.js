export default class Util
{
    constructor()
    {
    }
    static getImageSize( w )
    {
        if( w < 240 )
        {
            return 240;
        }
        else if( w < 320 )
        {
            return 320;
        }
        else if( w < 400 )
        {
            return 400;
        }
        else if( w < 480 )
        {
            return 480;
        }
        return 560;
    }
}