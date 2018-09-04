import Colors from "./Colors.js";
export default class Theme
{
    static set APP_BACKGROUND_COLOR( value ) 
    {
        if( this._APP_BACKGROUND_COLOR != value )
        {
            this._APP_BACKGROUND_COLOR = value;
        }
    }
    static get APP_BACKGROUND_COLOR()
    {
        if( !this._APP_BACKGROUND_COLOR )
        {
            this._APP_BACKGROUND_COLOR = Colors.GREY_200;
        }
        return this._APP_BACKGROUND_COLOR;
    }
    static set PRIMARY_COLOR( value )
    {
        if( this._PRIMARY_COLOR != value )
        {
            this._PRIMARY_COLOR = value;
        }
    }
    static get PRIMARY_COLOR()
    {
        if( !this._PRIMARY_COLOR )
        {
            this._PRIMARY_COLOR = Colors.BLUE_500;
        }
        return this._PRIMARY_COLOR;
    }
    static set PRIMARY_COLOR_DARK( value )
    {
        if( this._PRIMARY_COLOR_DARK != value )
        {
            this._PRIMARY_COLOR_DARK = value;
        }
    }
    static get PRIMARY_COLOR_DARK()
    {
        if( !this._PRIMARY_COLOR_DARK )
        {
            this._PRIMARY_COLOR_DARK = Colors.BLUE_900;
        }
        return this._PRIMARY_COLOR_DARK;
    }
    static set ACCENT_COLOR( value )
    {
        if( this._ACCENT_COLOR != value )
        {
            this._ACCENT_COLOR = value;
        }
    }
    static get ACCENT_COLOR()
    {
        if( !this._ACCENT_COLOR )
        {
            this._ACCENT_COLOR = Colors.PINK_500;
        }
        return this._ACCENT_COLOR;
    }
    static set RIPPLE_COLOR( value )
    {
        if( this._RIPPLE_COLOR != value )
        {
            this._RIPPLE_COLOR = value;
        }
    }
    static get RIPPLE_COLOR()
    {
        if( !this._RIPPLE_COLOR )
        {
            this._RIPPLE_COLOR = Colors.WHITE;
        }
        return this._RIPPLE_COLOR;
    }
    static set ICON_COLOR( value )
    {
        if( this._ICON_COLOR != value )
        {
            this._ICON_COLOR = value;
        }
    }
    static get ICON_COLOR()
    {
        if( !this._ICON_COLOR )
        {
            this._ICON_COLOR = Colors.WHITE;
        }
        return this._ICON_COLOR;
    }
    static set PRIMARY_TEXT_COLOR( value )
    {
        if( this._PRIMARY_TEXT_COLOR != value )
        {
            this._PRIMARY_TEXT_COLOR = value;
        }
    }
    static get PRIMARY_TEXT_COLOR()
    {
        if( !this._PRIMARY_TEXT_COLOR )
        {
            this._PRIMARY_TEXT_COLOR = Colors.BLACK;
        }
        return this._PRIMARY_TEXT_COLOR;
    }
    static set FONT_FAMILY( value )
    {
        if( this._FONT_FAMILY != value )
        {
            this._FONT_FAMILY = value;
        }
    }
    static get FONT_FAMILY()
    {
        if( !this._FONT_FAMILY )
        {
            this._FONT_FAMILY = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        }
        return this._FONT_FAMILY;
    }
}