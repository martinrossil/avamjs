import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
export default class BaseDialog extends LayoutContainer
{
    constructor()
    {
        super();
    }
    pathChanged()
    {
        // override
    }
    infoComplete( data )
    {
        // override
    }
    propertyAnimationEnded( property )
    {
        if( property === "y" )
        {
            if( this.y === window.innerHeight )
            {
                this.isVisible = false;
            }
        }
    }
    isShownChanged()
    {
        if( this.isShown )
        {
            this.isVisible = true;
        }
        this.y = this.isShown ? 0 : window.innerHeight;
    }
    initialize()
    {
        super.initialize();
        let wiw = window.innerWidth
        let wih = window.innerHeight;
        this.setSize( wiw, wih );
        //this.dialogTopBar.width = wiw;
        this.y = wih;
        this.isVisible = false;
        this.layout = new AnchorLayout();
        this.resizeAndPosition = this.resizeAndPosition.bind( this );
        this._isShown = false;
        this.notifyPropertyAnimationEnd = true;
        this.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.propertyAnimationEnded.bind( this ) );
        window.addEventListener( "resize", this.resizeAndPosition );
        this.animatedProperties = [ new AnimatedProperty( "y", 225, "ease-in" ) ];
    }
    resizeAndPosition()
    {
        let wiw = window.innerWidth
        let wih = window.innerHeight;
        this.setSize( wiw, wih );
        //this.dialogTopBar.width = wiw;
        this.y = this.isShown ? 0 : wih;
    }
    set isShown( value )
    {
        if( this._isShown !== value )
        {
            this._isShown = value;
            this.isShownChanged();
        }
    }
    get isShown()
    {
        return this._isShown;
    }
    set path( value )
    {
        if( this._path !== value )
        {
            this._path = value;
            this.pathChanged();
        }
    }
    get path()
    {
        return this._path;
    }
    get infoData()
    {
        if( !this._infoData )
        {
            this._infoData = {};
        }
        return this._infoData;
    }
    get infoLoader()
    {
        if( !this._infoLoader )
        {
            this._infoLoader = new JSONLoader();
            this._infoLoader.listen( EventTypes.LOAD_COMPLETE, this.infoComplete.bind( this ) );
        }
        return this._infoLoader;
    }
}
customElements.define("base-dialog", BaseDialog);