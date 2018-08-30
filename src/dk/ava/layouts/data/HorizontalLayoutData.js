export default class HorizontalLayoutData
{
    constructor( percentWidth = NaN, percentHeight = NaN )
    {
        this._percentWidth = percentWidth;
        this._percentHeight = percentHeight;
    }
    set percentWidth( value )
    {
        if( this._percentWidth !== value )
        {
            this._percentWidth = value;
        }
    }
    get percentWidth()
    {
        return this._percentWidth;
    }
    set percentHeight( value )
    {
        if( this._percentHeight !== value )
        {
            this._percentHeight = value;
        }
    }
    get percentHeight()
    {
        return this._percentHeight;
    }
}