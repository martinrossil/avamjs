import BaseLayout from "./base/BaseLayout.js";
import AnchorLayoutData from "./data/AnchorLayoutData.js";
export default class AnchorLayout extends BaseLayout
{
    constructor()
    {
        super();
    }
    elementAdded( displayElement )
    {
        this.layoutElements( this.host.width, this.host.height );
    }
    elementsAdded( elements )
    {
        this.layoutElements( this.host.width, this.host.height );
    }
    layoutElementsHorizontal( w, h )
    {
        super.layoutElementsHorizontal( w, h );
        this.layoutElements( w, h );
    }
    layoutElementsVertical( w, h )
    {
        super.layoutElementsVertical( w, h );
        this.layoutElements( w, h );
    }
    layoutElements( w, h )
    {
        super.layoutElements( w, h );
        let elements = this.host.childElements;
        let element;
        for( element of elements )
        {
            if( element.layoutData instanceof AnchorLayoutData )
            {
                this.setElementSize( element, w, h );
                this.setElementPosition( element, w, h );
            }
        }
    }
    setElementSize( element, w, h )
    {
        let layoutData = element.layoutData;
        let width;
        let height;
        if( !isNaN( layoutData.left ) && !isNaN(layoutData.right) ) 
        {
            width = w - layoutData.left - layoutData.right;
        }
        if( !isNaN( layoutData.top ) && !isNaN( layoutData.bottom) ) 
        {
            height = h - layoutData.top - layoutData.bottom;
        }
        if( width && height )
        {
            element.setSize( width, height );
        }
        else if( width )
        {
            element.width = width;
        }
        else if( height )
        {
            element.height = height;
        }
        // TODO check element min max width height
    }
    setElementPosition( element, w, h )
    {
        let layoutData = element.layoutData;
        let x;
        let y;
        if( !isNaN( layoutData.left ) ) 
        {
            x = layoutData.left;
        }
        if( !isNaN( layoutData.right ) )
        {
            x = w - element.width - layoutData.right;
        }
        if( !isNaN( layoutData.top ) )
        {
            y = layoutData.top;
        }
        else if( !isNaN( layoutData.bottom ) )
        {
            y = h - element.height - layoutData.bottom;
        }
        if( !isNaN( layoutData.horizontalCenter ) )
        {
            x = w * .5 - element.width * .5 + layoutData.horizontalCenter;
        }
        if( !isNaN( layoutData.verticalCenter ) )
        {
            y = h * .5 - element.height * .5 + layoutData.verticalCenter;
        }
        if( !isNaN( x ) && !isNaN( y ) )
        {
            element.setPosition( x, y );
        }
        else if( x )
        {
            element.x = x;
        }
        else if( y )
        {
            element.y = y;
        }
    }
}