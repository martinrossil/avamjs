import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import Config from "../Config.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import FontWeight from "../../../ava/constants/FontWeight.js";
import CornerSquare from "./CornerSquare.js";
import TextAlign from "../../../ava/constants/TextAlign.js";
export default class VideoItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    isInViewPortChanged()
    {
        if( this.isInViewPort )
        {
            if( !this.hasBackdropBeenLoaded )
            {
                this.hasBackdropBeenLoaded = true;
                let ext = ImageElement.extension;
                let url = "/baggrunde/" + this.getBackdropSize + "/" + this.data.u + "-baggrund." + ext;
                this.image.source = url;
                this.image.alt = this.data.t;
                this.image.title = this.data.t;
                this.aTag.href = "/trailers/" + this.data.u;
                this.titleTextElement.text = this.data.t;
                this.typeTextElement.text = this.data.d;
                //this.releaseTextElement.text = this.data.p;
                if( this.data.r )
                {
                    this.cornerSquare.rating = this.data.r;
                }
                else
                {
                    this.removeElement( this.cornerSquare );
                }
            }
        }
    }
    get getBackdropSize()
    {
        let w = this.width;
        if( w < 240 )
        {
            return 240;
        }
        else if( w < 320 )
        {
            return 320;
        }
        else if( w < 400 )
        {
            return 400;
        }
        else if( w < 480 )
        {
            return 480;
        }
        return 560;
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
        this.titleTextElement.width = w;
        this.titleTextElement.y = h + 8;
        this.typeTextElement.width = w;
        this.typeTextElement.y = h + 30;
        //this.releaseTextElement.width = w;
        //this.releaseTextElement.y = h + 30;
        this.cornerSquare.x = w - 30;
    }
    initialize()
    {
        super.initialize();
        this.z = 4;
        this.backgroundColor = Config.SECONDARY_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
        this.addElement( this.titleTextElement );
        this.addElement( this.typeTextElement );
        //this.addElement( this.releaseTextElement );
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
        }
        return this._image;
    }
    get titleTextElement()
    {
        if( !this._titleTextElement )
        {
            this._titleTextElement = new TextElement();
            this._titleTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._titleTextElement.fontWeight = FontWeight.BOLD;
            this._titleTextElement.wordWrap = false;
        }
        return this._titleTextElement;
    }
    get typeTextElement()
    {
        if( !this._typeTextElement )
        {
            this._typeTextElement = new TextElement();
            this._typeTextElement.textColor = "#8e9bab";
            this._typeTextElement.wordWrap = false;
        }
        return this._typeTextElement;
    }
    get releaseTextElement()
    {
        if( !this._releaseTextElement )
        {
            this._releaseTextElement = new TextElement();
            this._releaseTextElement.textColor = "#8e9bab";
            this._releaseTextElement.wordWrap = false;
            this._releaseTextElement.textAlign = TextAlign.RIGHT;
        }
        return this._releaseTextElement;
    }
    get cornerSquare()
    {
        if( !this._cornerSquare )
        {
            this._cornerSquare = new CornerSquare();
            this._cornerSquare.y = -14;
            this._cornerSquare.z = 2;
        }
        return this._cornerSquare;
    }
}
customElements.define("video-item-renderer", VideoItemRenderer ); 