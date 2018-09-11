import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import FontWeight from "../../../ava/constants/FontWeight.js";
import CornerSquare from "./CornerSquare.js";
import Util from "../utils/Util.js";
export default class ActorItemRenderer extends BaseItemRenderer
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
                let url = "/profile/" + Util.getImageSize( this.width ) + "/" + this.data.u + "-profil." + ext;
                this.image.source = url;
                this.nameTextElement.text = this.data.n;
                this.birthCountryTextElement.text = this.data.b;
                this.cornerSquare.age = this.data.a;
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
        this.birthCountryTextElement.width = w;
        this.birthCountryTextElement.y = h + 28;
        this.cornerSquare.x = w - 30;
    }
    dataChanged()
    {  
        if( this.data )
        {
            this.image.alt = this.data.n; 
            this.image.title = this.data.n;
            this.aTag.href = "/skuespillere/" + this.data.u;
        }
    }
    initialize()
    {
        super.initialize();
        this.z = 4;
        this.backgroundColor = Theme.SECONDARY_COLOR;
        this.createChildren();
    }
    createChildren()
    {   
        this.addElement( this.aTag );
        this.addElement( this.nameTextElement );
        this.addElement( this.birthCountryTextElement );
        this.addElement( this.cornerSquare );
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
            //this._image.listen( EventTypes.LOAD_COMPLETE, this.loadComplete.bind( this ) );
            //this._image.listen( EventTypes.LOAD_ERROR, this.loadError.bind( this ) );
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
    get birthCountryTextElement()
    {
        if( !this._birthCountryTextElement )
        {
            this._birthCountryTextElement = new TextElement();
            this._birthCountryTextElement.textColor = "#8e9bab";
            this._birthCountryTextElement.wordWrap = false;
        }
        return this._birthCountryTextElement;
    }
    get cornerSquare()
    {
        if( !this._cornerSquare )
        {
            this._cornerSquare = new CornerSquare();
            this._cornerSquare.backgroundColor = Theme.SECONDARY_COLOR;
            this._cornerSquare.y = -14;
            this._cornerSquare.z = 2;
        }
        return this._cornerSquare;
    }
}
customElements.define("actor-item-renderer", ActorItemRenderer ); 