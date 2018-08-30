import EventDispatcher from "../../events/EventDispatcher.js";
import ImageElement from "./ImageElement.js";
import EventTypes from "../../constants/EventTypes.js";
export default class ImageFormatUtil extends EventDispatcher
{
    constructor()
    {
        super();
    }
    detectAvailableFormats()
    {
        this.image.src = "data:image/webp;base64," + "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
    }
    get image()
    {
        if( !this._image )
        {
            this._image = document.createElement("img");
            this._image.addEventListener( "load", this.loadComplete.bind( this ) );
            this._image.addEventListener( "error", this.loadError.bind( this ) );
        }
        return this._image;
    }
    loadComplete()
    {
        if( this.image.width > 0 && this.image.height > 0 )
        {
            ImageElement.extension = "webp";
        }
        else
        {
            ImageElement.extension = "jpg";
        }
        this.dispatch( EventTypes.LOAD_COMPLETE );
    }
    loadError()
    {
        ImageElement.extension = "jpg";
        this.dispatch( EventTypes.LOAD_COMPLETE );
    }
}