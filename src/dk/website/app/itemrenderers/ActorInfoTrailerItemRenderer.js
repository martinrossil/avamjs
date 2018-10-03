import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import Theme from "../../../ava/styles/Theme.js";
import ImageElement from "../../../ava/components/images/ImageElement.js";
import Paths from "../consts/Paths.js";
import Util from "../utils/Util.js";
export default class ActorInfoTrailerItemRenderer extends BaseItemRenderer
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
                let url = "/baggrunde/" + Util.getImageSize( this.width ) + "/" + this.data.h + "-baggrund." + ext;
                this.image.source = url;
            }
        }
    }
    dataChanged()
    {
        if( this.data )
        {
            this.image.alt = this.data.t; 
            this.image.title = this.data.t;
            this.aTag.href = Paths.TRAILERS + "/" + this.data.h;
            this.aTag.name = this.data.t;
            this.aTag.title = this.data.t;
            this.ariaLabel = this.data.t;
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
}
customElements.define( "actor-info-trailer-item-renderer", ActorInfoTrailerItemRenderer ); 