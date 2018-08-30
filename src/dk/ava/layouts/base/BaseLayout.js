export default class BaseLayout
{
    constructor()
    {
        this.padding = 0;
        this.gap = 0;
    }
    elementAdded( displayElement )
    {
        // override 
    }
    elementsAdded( elements )
    {
        // override
    }
    layoutElements( w, h )
    {
        // override
    }
    layoutElementsHorizontal( w, h )
    {
        // override
    }
    layoutElementsVertical( w, h )
    {
        // override
    }
    updateLayoutHorizontal( w, h )
    {
        if( this.host.hasElements )
        {
            this.layoutElementsHorizontal( w, h );
        }
    }
    updateLayoutVertical( w, h )
    {
        if( this.host.hasElements )
        {
            this.layoutElementsVertical( w, h );
        }
    }
    updateLayout( w, h )
    {
        if( this.host.hasElements )
        {
            this.layoutElements( w, h );
        }
    }
    set host( value )
    {
        if( this._host != value )
        {
            this._host = value;
        }
    }
    get host() 
    {
        return this._host;
    }
    set padding( value )
    {
        if( this._padding != value )
        {
            this._padding = value;
            this._paddingLeft = value;
            this._paddingTop = value;
            this._paddingRight = value;
            this._paddingBottom = value;
        }
    }
    get padding()
    {
        return this._padding;
    }
    set paddingLeft(value) 
    {
        if (this._paddingLeft != value) 
        {
            this._paddingLeft = value;
        }
    }
    get paddingLeft() 
    {
        return this._paddingLeft;
    }
    set paddingTop(value) 
    {
        if (this._paddingTop != value) 
        {
            this._paddingTop = value;
        }
    }
    get paddingTop() 
    {
        return this._paddingTop;
    }
    set paddingRight(value) 
    {
        if (this._paddingRight != value) 
        {
            this._paddingRight = value;
        }
    }
    get paddingRight() 
    {
        return this._paddingRight;
    }
    set paddingBottom(value) 
    {
        if (this._paddingBottom != value) 
        {
            this._paddingBottom = value;
        }
    }
    get paddingBottom() 
    {
        return this._paddingBottom;
    }
    set gap( value )
    {
        if( this._gap !== value )
        {
            this._gap = value;
            this.horizontalGap = value;
            this.verticalGap = value;
        }
    }
    get gap()
    {
        return this._gap;
    }
    set horizontalGap( value )
    {
        if( this._horizontalGap !== value )
        {
            this._horizontalGap = value;
        }
    }
    get horizontalGap()
    {
        return this._horizontalGap;
    }
    set verticalGap( value )
    {
        if( this._verticalGap !== value )
        {
            this._verticalGap = value;
        }
    }
    get verticalGap()
    {
        return this._verticalGap;
    }
    set maxTotalWidth( value )
    {
        if( this._maxTotalWidth != value )
        {
            this._maxTotalWidth = value;
        }
    }
    get maxTotalWidth()
    {
        return this._maxTotalWidth;
    }
    set minElementWidth( value )
    {
        if( this._minElementWidth != value )
        {
            this._minElementWidth = value;
        }
    }
    get minElementWidth()
    {
        return this._minElementWidth;
    }
    set maxElementWidth( value )
    {
        if( this._maxElementWidth != value )
        {
            this._maxElementWidth = value;
        }
    }
    get maxElementWidth()
    {
        return this._maxElementWidth;
    }
}