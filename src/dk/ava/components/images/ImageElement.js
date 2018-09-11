import DisplayElement from "../display/DisplayElement.js";
import EventTypes from "../../constants/EventTypes.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
export default class ImageElement extends DisplayElement
{
    static set extension( value )
    {
        if( this._extension != value ) 
        {
            this._extension = value;
        }
    }
    static get extension()
    {
        if( !this._extension )
        {
            this._extension = "jpg";
        }
        return this._extension;
    }
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        this.resizeImage( w, h );
    }
    widthChanged( w )
    {
        this.resizeImage( w, this.height );
    }
    heightChanged( h )
    {
        this.resizeImage( this.width, h );
    }
    resizeImage( w, h )
    {
        this.image.style.width = w + "px";
        this.image.style.height = h + "px";
    }
    sourceChanged()
    {
        this.image.src = this.source;
    }
    loadComplete()
    {
        this.opacity = 1;
        this.dispatch( EventTypes.LOAD_COMPLETE );
    }
    loadError()
    {
        this.dispatch( EventTypes.LOAD_ERROR );
    }
    animationEnded( e )
    {
        e.stopImmediatePropagation();
    }
    initialize()
    {
        super.initialize();
        this.notifyPropertyAnimationEnd = false;
        this.opacity = 0;
        this.animatedProperties = [ new AnimatedProperty( "opacity", 375 ) ];
        this.appendChild( this.image );
    }
    get image()
    {
        if( !this._image )
        {
            this._image = document.createElement("img");
            this._image.style.border = "0px";
            this._image.style.objectFit = "cover";
            this._image.addEventListener( "load", this.loadComplete.bind( this ) );
            this._image.addEventListener( "error", this.loadError.bind( this ), { passive : false } );
        }
        return this._image;
    }
    set source(value)
    {
        if( this._source != value )
        {
            this._source = value;
            this.sourceChanged();
        }
    }
    get source()
    {
        return this._source;
    }
    set alt( value )
    {
        if( this._alt != value )
        {
            this._alt = value;
            this.image.alt = value;
        }
    }
    get alt()
    {
        return this._alt;
    }
    set title( value )
    {
        if( this._title != value )
        {
            this._title = value;
            this.image.title = value;
        }
    }
    get title()
    {
        return this._title;
    }
}
customElements.define("image-element", ImageElement);