import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
import CornerSquare from "./CornerSquare.js";
import Util from "../utils/Util.js";
import FontWeight from "../../../ava/constants/FontWeight.js";
import Paths from "../consts/Paths.js";
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
                let ext = ImageElement.extension;
                let url = "/plakater/" + Util.getImageSize( this.width ) + "/" + this.data.h + "-plakat." + ext;
                this.image.source = url;
                this.titleTextElement.text = this.data.t;
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
        this.releaseTextElement.width = w;
        this.releaseTextElement.y = h + 30;
        this.cornerSquare.x = w - 30;
    }
    dataChanged()
    {
        if( this.data )
        {
            this.image.alt = this.data.t;
            this.image.title = this.data.t;
            this.aTag.href = Paths.MOVIES + "/" + this.data.h;
            this.aTag.name = this.data.t;
            this.aTag.title = this.data.t;
            this.ariaLabel = this.data.t;
        }
    }
    initialize()
    {
        super.initialize();
        this.isVisible = false;
        this.z = 8;
        this.backgroundColor = Theme.SECONDARY_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
        this.addElement( this.titleTextElement );
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
    get releaseTextElement()
    {
        if( !this._releaseTextElement )
        {
            this._releaseTextElement = new TextElement();
            this._releaseTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._releaseTextElement.opacity = .6;
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