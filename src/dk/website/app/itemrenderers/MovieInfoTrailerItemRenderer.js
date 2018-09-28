import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import Theme from "../../../ava/styles/Theme.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import Paths from "../consts/Paths.js";
import Util from "../utils/Util.js";
export default class MovieInfoTrailerItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    dataChanged()
    {
        if( this.data )
        {
            let titleType = this.data.t + " - " + this.data.d;
            this.aTag.href = Paths.TRAILERS + "/" + this.data.h;
            this.aTag.name = titleType;
            this.aTag.title = titleType;
            this.image.alt = titleType;
            this.image.title = titleType;
            this.titleTextElement.text = this.data.d;
            let ext = ImageElement.extension;
            let url = "/baggrunde/" + Util.getImageSize( this.width ) + "/" + this.data.h + "-baggrund." + ext;
            this.image.source = url;
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
    }
    initialize()
    {
        super.initialize();
        this.z = 8;
        this.backgroundColor = Theme.SECONDARY_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
        this.addElement( this.titleTextElement );
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
            this._titleTextElement.opacity = .6;
            this._titleTextElement.wordWrap = false;
        }
        return this._titleTextElement;
    }
}
customElements.define("moovie-info-trailer-item-renderer", MovieInfoTrailerItemRenderer ); 