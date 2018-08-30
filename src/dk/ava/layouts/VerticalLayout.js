import BaseLayout from "./base/BaseLayout.js";
import VerticalLayoutData from "./data/VerticalLayoutData.js";
export default class VerticalLayout extends BaseLayout
{
    constructor()
    {
        super();
    }
    elementsAdded()
    {
       super.elementsAdded();
       this.layoutElements( this.width, this.height );
    }
    layoutElementsVertical( w, h )
    {
        super.layoutElementsVertical( w, h );
        this.layoutElements( w, h );
    }
    layoutElementsHorizontal( w, h )
    {
        super.layoutElementsHorizontal( w, h );
        this.layoutElements( w, h );
    }
    layoutElements( w, h )
    {
        super.layoutElements( w, h );
        let scrollbarWidth = this.host.div.offsetWidth - this.host.div.parentNode.parentNode.clientWidth;
        let elements = this.host.childElements;
        let element;
        let y = this.paddingTop;
        let x = this.paddingLeft;
        let vg = this.verticalGap;

        if( this.host.autoSizeHorizontal )
        {
            for( element of elements )
            {
                element.setPosition( x, y );
                y += vg;
                y += element.height;
            }
            this.host.width = element.width; // widest element vertialLayoutData!!
        }
        else
        {
            let availableWidth = w - this.paddingLeft - this.paddingRight - scrollbarWidth;
            let layoutData;
            for( element of elements )
            {
                if( element.layoutData instanceof VerticalLayoutData )
                {
                    layoutData = element.layoutData;
                    if( !isNaN( layoutData.percentWidth ) )
                    {
                        element.width = availableWidth * ( layoutData.percentWidth / 100 );
                    }
                }
                element.setPosition( x, y );
                y += vg;
                y += element.height;
            }
        }
        if( this.host.autoSizeVertical )
        {
            this.host.height = y + this.paddingBottom - vg;
        }
        let scrollbarWidthAfter = this.host.div.offsetWidth - this.host.div.parentNode.parentNode.clientWidth;
        if( scrollbarWidthAfter != scrollbarWidth )
        {
            this.layoutElements( w, h );
        }
    }
}