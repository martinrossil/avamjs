import BaseElement from "../../../ava/components/base/BaseElement.js";
export default class TestDisplayElement extends BaseElement
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        // override
    }
    widthChanged( w )
    {
        // override
    }
    heightChanged( h )
    {
        // override
    }
    initialize()
    {
        super.initialize();
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this.style.position = "absolute";
    }
    setPosition( x, y )
    {
        if( this._x !== x && this._y !== y )
        {
            this._x = x;
            this._y = y;
            this.style.left = x + "px";
            this.style.top = y + "px";
        }
        else
        {
            this.x = x;
            this.y = y;
        }
    }
    set x( value )
    {
        if( this._x !== value )
        {
            this._x = value;
            this.style.left = value + "px";
        }
    }
    get x()
    {
        return this._x;
    }
    set y( value )
    {
        if( this._y !== value )
        {
            this._y = value;
            this.style.top = value + "px";
        }
    }
    get y()
    {
        return this._y;
    }
    set width( value ) 
    {
        if( this._width !== value )
        {
            this._width = value;
            this.style.width = value + "px";
            this.widthChanged( value );
        }
    }
    get width()
    {
        return this._width;
    }
    set height( value )
    {
        if( this._height != value ) 
        {
            this._height = value;
            this.style.height = value + "px";
            this.heightChanged( value );
        }
    }
    get height()
    {
        return this._height;
    }
    set backgroundColor(value) 
    {
        if( this.backgroundColor != value ) 
        {
            this._backgroundColor = value;
            this.style.backgroundColor = value;
        }
    }
    get backgroundColor() 
    {
        return this._backgroundColor;
    }
    set layoutData( value )
    {
        if( this._layoutData != value )
        {
            this._layoutData = value;
        }
    }
    get layoutData()
    {
        return this._layoutData;
    }
}
customElements.define( "test-display-element", TestDisplayElement );