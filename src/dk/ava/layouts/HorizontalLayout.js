import BaseLayout from "./base/BaseLayout.js";
import HorizontalLayoutData from "./data/HorizontalLayoutData.js";
export default class HorizontalLayout extends BaseLayout
{
    constructor()
    {
        super();
    }
    elementsAdded( elements )
    {
        super.elementsAdded( elements );
        this.layoutElements( this.host.width, this.host.height );
    }
    layoutElementsHorizontal( w, h )
    {
        super.layoutElementsHorizontal( w, h );
        this.layoutElements( w, h );
    }
    layoutElements( w, h )
    {
        super.layoutElements( w, h );
        this.setAvailableWidth( w );
        this.setElementsWidth();
        let elements = this.host.childElements;
        let element;
        let x = this.paddingLeft + this.maxTotalPaddingLeft;
        let layoutData;
        for( element of elements )
        {
            element.x = x;
            if( element.layoutData instanceof HorizontalLayoutData )
            {
                // TODO check for percentHeight
                layoutData = element.layoutData;
                if( !isNaN( layoutData.percentHeight ) )
                {
                    element.height = this.host.height * ( 100 / layoutData.percentHeight );
                }
            }
            element.width = this.elementWidth;
            x += this.elementWidth;
        }
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
    setElementsWidth()
    {
        let len = this.host.numElements;
        let gaps = ( len - 1 ) * this.horizontalGap;
        this.elementWidth = ( this.availableWidth - gaps ) / len;
        if( this.elementWidth > this.maxElementWidth )
        {
            this.elementWidth = this.maxElementWidth;
        }
        else if( this.elementWidth < this.minElementWidth )
        {
            this.elementWidth = this.minElementWidth;
        }
    }
}