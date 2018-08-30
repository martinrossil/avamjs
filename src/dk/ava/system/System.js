export default class System
{
    static set TOUCH_ENABLED( value )
    {
        if( this._TOUCH_ENABLED !== value )
        {
            this._TOUCH_ENABLED = value
        }
    }
    static get TOUCH_ENABLED()
    {
        return this._TOUCH_ENABLED;
    }
    static set START_TIME( value )
    {
        if( this._START_TIME !== value )
        {
            this._START_TIME = value;
        }
    }
    static get START_TIME()
    {
        return this._START_TIME;
    }
}