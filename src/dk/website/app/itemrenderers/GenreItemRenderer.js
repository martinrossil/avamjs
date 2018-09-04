import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import VerticalLayoutData from "../../../ava/layouts/data/VerticalLayoutData.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import RippleSurface from "../../../ava/components/display/RippleSurface.js";
import TextAlign from "../../../ava/constants/TextAlign.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
export default class GenreItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    isSelectedChanged()
    {
        super.isSelectedChanged();
        console.log( "GenreItemRenderer", "isSelectedChanged", this.data.g, this.isSelected );
        this.selectionLayer.opacity = this.isSelected ? .12 : 0;
    }
    dataChanged()
    {
        if( this.data )
        {
            this.labelTextElement.text = this.data.g;
            this.countTextElement.text = this.data.c;
            this.aTag.href = this.data.h;
        }
    }
    sizeChanged( w, h )
    {
        this.layoutChildren( w, h );
    }
    widthChanged( w )
    {
        this.layoutChildren( w, this.height );
    }
    heightChanged( h )
    {
        this.layoutChildren( this.width, h );
    }
    layoutChildren( w, h )
    {
        this.rippleSurface.setSize( w, h );
        this.countTextElement.width = w - 8;
        this.selectionLayer.setSize( w, h - 8 );
    }
    initialize()
    {
        super.initialize();
        this.height = 48;
        this.layoutData = new VerticalLayoutData( 100 );
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
    }
    get aTag()
    {
        if( !this._aTag )
        {
            this._aTag = document.createElement( "a" );
            this._aTag.appendChild( this.labelTextElement );
            this._aTag.appendChild( this.countTextElement );
            this._aTag.appendChild( this.selectionLayer );
            this._aTag.appendChild( this.rippleSurface );
        }
        return this._aTag;
    }
    get selectionLayer()
    {
        if( !this._selectionLayer )
        {
            this._selectionLayer = new DisplayElement();
            this._selectionLayer.y = 4;
            this._selectionLayer.backgroundColor = Theme.PRIMARY_TEXT_COLOR;
            this._selectionLayer.opacity = 0;
            this._selectionLayer.animatedProperties = [ new AnimatedProperty( "opacity" ) ];
            this._selectionLayer.cornerRadius = 4;
        }
        return this._selectionLayer;
    }
    get rippleSurface()
    {
        if( !this._rippleSurface )
        {
            this._rippleSurface = new RippleSurface();
            this._rippleSurface.rippleColor = Theme.RIPPLE_COLOR;
        }
        return this._rippleSurface;
    }
    get labelTextElement()
    {
        if( !this._labelTextElement )
        {
            this._labelTextElement = new TextElement();
            this._labelTextElement.x = 8;
            this._labelTextElement.y = 12;
            this._labelTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
        }
        return this._labelTextElement;
    }
    get countTextElement()
    {
        if( !this._countTextElement )
        {
            this._countTextElement = new TextElement();
            this._countTextElement.y = 12;
            this._countTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._countTextElement.textAlign = TextAlign.RIGHT;
        }
        return this._countTextElement;
    }
}
customElements.define("genre-item-renderer", GenreItemRenderer ); 