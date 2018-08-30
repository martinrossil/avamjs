export default class AnchorLayoutData
{
    constructor( left = NaN, top = NaN, right = NaN, bottom = NaN, horizontalCenter = NaN, verticalCenter = NaN )
    {
        this._left              = left;
        this._top               = top;
        this._right             = right;
        this._bottom            = bottom;
        this._horizontalCenter  = horizontalCenter;
        this._verticalCenter    = verticalCenter;
    }
    set left(value) 
    {
        if (this._left != value) 
        {
            this._left = value;
        }
    }
    get left() 
    {
        return this._left;
    }
    set top(value) 
    {
        if (this._top != value) 
        {
            this._top = value;
        }
    }
    get top() 
    {
        return this._top;
    }
    set right(value) 
    {
        if (this._right != value) 
        {
            this._right = value;
        }
    }
    get right() 
    {
        return this._right;
    }
    set bottom(value) 
    {
        if (this._bottom != value) 
        {
            this._bottom = value;
        }
    }
    get bottom() 
    {
        return this._bottom;
    }
    set horizontalCenter(value) 
    {
        if (this._horizontalCenter != value) 
        {
            this._horizontalCenter = value;
        }
    }
    get horizontalCenter() 
    {
        return this._horizontalCenter;
    }
    set verticalCenter(value) 
    {
        if (this._verticalCenter != value) 
        {
            this._verticalCenter = value;
        }
    }
    get verticalCenter() 
    {
        return this._verticalCenter;
    }
}