import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import VerticalLayoutData from "../../../ava/layouts/data/VerticalLayoutData.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import RippleSurface from "../../../ava/components/display/RippleSurface.js";
import TextAlign from "../../../ava/constants/TextAlign.js";
export default class GenreItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
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
            this._aTag.appendChild( this.rippleSurface );
        }
        return this._aTag;
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