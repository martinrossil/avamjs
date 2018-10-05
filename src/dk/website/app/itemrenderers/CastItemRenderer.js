import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import Theme from "../../../ava/styles/Theme.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import FontWeight from "../../../ava/constants/FontWeight.js";
import Util from "../utils/Util.js";
export default class CastItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    isInViewPortChanged()
    {
        if( this.isInViewPort )
        {
            if( !this.hasProfileBeenLoaded )
            {
                this.hasProfileBeenLoaded = true;
                let ext = ImageElement.extension;
                let url = "/profile/" + Util.getImageSize( this.width ) + "/" + this.data.href + "-profil." + ext;
                this.image.source = url;
                this.aTag.title = this.data.name;
                this.aTag.setAttribute( "aria-label", this.data.name );
                this.aTag.href = "/skuespillere/" + this.data.href;
                this.nameTextElement.text = this.data.name;
                this.characterTextElement.text = this.data.character;
            }
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
        this.image.setSize( w, h );
        this.nameTextElement.width = w;
        this.nameTextElement.y = h + 8;
        this.characterTextElement.width = w;
        this.characterTextElement.y = h + 30;
    }
    dataChanged()
    {  
        if( this.data )
        {
        }
    }
    initialize()
    {
        super.initialize();
        this.z = 8;
        this.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        this.createChildren();
    }
    createChildren()
    {   
        this.addElement( this.aTag );
        this.addElement( this.nameTextElement );
        this.addElement( this.characterTextElement );
    }
    get aTag()
    {
        if( !this._aTag )
        {
            this._aTag = document.createElement( "a" );
            this._aTag.appendChild( this.image );
        }
        return this._aTag;
    }
    get image()
    {
        if( !this._image )
        {
            this._image = new ImageElement();
        }
        return this._image;
    }
    get nameTextElement()
    {
        if( !this._nameTextElement )
        {
            this._nameTextElement = new TextElement();
            this._nameTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._nameTextElement.fontWeight = FontWeight.BOLD;
            this._nameTextElement.wordWrap = false;
        }
        return this._nameTextElement;
    }
    get characterTextElement()
    {
        if( !this._characterTextElement )
        {
            this._characterTextElement = new TextElement();
            this._characterTextElement.opacity = .6;
            this._characterTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._characterTextElement.wordWrap = false;
        }
        return this._characterTextElement;
    }
}
customElements.define("cast-item-renderer", CastItemRenderer ); 