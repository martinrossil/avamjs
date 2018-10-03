import DisplayContainer from "../../../../ava/components/display/DisplayContainer.js";
import Theme from "../../../../ava/styles/Theme.js";
import ImageElement from "../../../../ava/components/images/ImageElement.js";
import Util from "../../utils/Util.js";
export default class PosterBlock extends DisplayContainer
{
    constructor()
    {
        super();
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
    pathChanged()
    {
        if( this.path )
        {
            console.log( "PosterBlock", "pathChanged", this.path );
            let ext = ImageElement.extension;
            let url = "/plakater/" + Util.getImageSize( this.width ) + "/" + this.path + "-plakat." + ext;
            this.image.source = url;
        }
    }
    dataChanged()
    {
        if( this.data )
        {
            let title = this.data.title + " Plakat";
            this.ariaLabel = title;
            this.image.alt = title;
            this.image.title = title;
        }
    }
    initialize()
    {
        super.initialize();
        this.z = 8;
        this.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        this.addElement( this.image );
    }
    get image()
    {
        if( !this._image )
        {
            this._image = new ImageElement();
        }
        return this._image;
    }
    set data( value )
    {
        if( this._data != value )
        {
            this._data = value;
            this.dataChanged();
        }
    }
    get data()
    {
        return this._data;
    }
    set path( value )
    {
        if( this._path != value )
        {
            this._path = value;
            this.pathChanged();
        }
    }
    get path()
    {
        return this._path;
    }
}
customElements.define("poster-block", PosterBlock);