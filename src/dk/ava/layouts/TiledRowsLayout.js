import BaseLayout from "./base/BaseLayout.js";
export default class TiledRowsLayout extends BaseLayout
{
    constructor()
    {
        super();
        this._elementMinWidth = 10;
        this._elementAspectRatio = 1;
        this._maxColumns = 4;
        this._maxTotalWidth = 1366;
    }
    elementAdded( displayElement )
    {
        super.elementAdded( displayElement );
        if( !this.lastElement )
        {
            this.layoutElements( this.host.width, this.host.height );
        }
        else
        {
            if( !this.host.autoSizeHorizontal )
            {
                let len = this.host.childElements.length;
                if( this.columns < len && len < ( this.maxColumns + 1 ) )
                {
                    this.setInitialValues( this.host.width );
                    this.iterateElements( this.host.childElements );
                }
                else
                {
                    this.iterateElements( [ displayElement ] );
                }
                this.setHostHeight();
            }
            else
            {
                // TODO
            }
        }
    }
    elementsAdded( elements )
    {
        super.elementsAdded( elements );
        this.host.height = 0;
        this.layoutElements( this.host.width, this.host.height );
        /*if( !this.lastElement )
        {
            this.layoutElements( this.host.width, this.host.height )
        }
        else
        {
            this.iterateElements( elements );
            this.setHostHeight();
        }*/
    }
    layoutElementsHorizontal( w, h )
    {
        super.layoutElementsHorizontal( w, h );
        this.layoutElements( w, h );
    }
    reset()
    {
        this.lastLayoutWidth = 0;
        this.lastLayoutHeight = 0;
        this.lastElement = null;
    }
    layoutElements( w, h )
    {
        super.layoutElements( w, h );
        if( this.lastLayoutWidth !== w || this.lastLayoutHeight !== h )
        {
            this.lastLayoutWidth = w;
            this.lastLayoutHeight = h;
            if( !this.host.autoSizeHorizontal )
            {
                this.setInitialValues( w );
                this.iterateElements( this.host.childElements );
                this.setHostHeight();
            }
            else
            {
                // TODO layout with maxColumns and elementMinWidth
            }
        }
    }
    iterateElements( elements )
    {
        let element;
        for( element of elements ) 
        {
            element.setSize( this.elementWidth, this.elementHeight );
            element.setPosition( this.currentElementX, this.currentElementY );
            this.setNextElementPosition();
        }
        this.lastElement = element;
    }
    setNextElementPosition()
    {
        if( this.currentColumn % this.columns == 0 )
        {
            this.currentColumn = 1;
            this.currentElementX = this.paddingLeft + this.maxTotalPaddingLeft;
            this.currentElementY += ( this.verticalGap + this.elementHeight );
        }
        else
        {
            this.currentColumn++;
            this.currentElementX += ( this.horizontalGap + this.elementWidth );
        }
    }
    setHostHeight()
    {
        if( this.host.autoSizeVertical )
        {
            this.lastLayoutHeight = this.lastElement.y + this.elementHeight + this.paddingBottom;
            this.host.height = this.lastLayoutHeight;
        }
    }
    setInitialValues( w )
    {
        this.setAvailableWidth( w );
        this.setColumns();
        this.setElementsDimensions();
        this.currentColumn = 1;
        this.currentElementX = this.paddingLeft + this.maxTotalPaddingLeft;
        this.currentElementY = this.paddingTop;
    }
    setAvailableWidth( w )
    {
        this.availableWidth = w - this.paddingLeft - this.paddingRight;
        if( this.availableWidth > this.maxTotalWidth )
        {
            this.availableWidth = this.maxTotalWidth;
            this.maxTotalPaddingLeft = ( w - this.availableWidth ) * .5 - this.paddingLeft;
        }
        else
        {
            this.maxTotalPaddingLeft = 0;
        }
    }
    setColumns()
    {
        let elements = this.host.childElements;
        let c = Math.floor( this.availableWidth / this.elementMinWidth );
        if( c === 0 )
        {
            c = 1;
        }
        if( c > elements.length )
        {
            c = elements.length;
        }
        if( c > this.maxColumns )
        {
            c = this.maxColumns;  
        }
        this.columns = c;
    }
    setElementsDimensions()
    {
        let gaps = ( this.columns - 1 ) * this.horizontalGap;
        this.elementWidth = ( this.availableWidth - gaps ) / this.columns;
        this.elementHeight = this.elementWidth / this.elementAspectRatio;
    }
    set elementAspectRatio( value )
    {
        if( this._elementAspectRatio != value )
        {
            this._elementAspectRatio = value;
        }
    }
    get elementAspectRatio()
    {
        return this._elementAspectRatio;
    }
    set maxColumns( value )
    {
        if( this._maxColumns != value )
        {
            this._maxColumns = value;
        }
    }
    get maxColumns()
    {
        return this._maxColumns;
    }
}