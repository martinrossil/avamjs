import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import Config from "../Config.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import CornerSquare from "./CornerSquare.js";
export default class MovieItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    isInViewPortChanged()
    {
        this.isVisible = this.isInViewPort;
        if( this.isInViewPort )
        {
            if( !this.hasPosterBeenLoaded )
            {
                this.hasPosterBeenLoaded = true;
                let i = this.data.i;
                let ext = ImageElement.extension;
                let url = "/plakater/" + this.getPosterSize + "/" + this.data.u + "-plakat." + ext;
                this.image.source = url;

                this.aTag.href = "/film/info/" + this.data.u;
                this.image.alt = this.data.t;
                this.image.title = this.data.t;
                this.releaseTextElement.text = this.data.p;
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
    get getPosterSize()
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
        this.releaseTextElement.width = w;
        this.releaseTextElement.y = h + 8;
        this.cornerSquare.x = w - 30;
    }
    initialize()
    {
        super.initialize();
        this.isVisible = false;
        this.z = 4;
        this.backgroundColor = Config.SECONDARY_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
        this.addElement( this.releaseTextElement );
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
    get releaseTextElement()
    {
        if( !this._releaseTextElement )
        {
            this._releaseTextElement = new TextElement();
            this._releaseTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._releaseTextElement.wordWrap = false;
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
customElements.define("movie-item-renderer", MovieItemRenderer ); 