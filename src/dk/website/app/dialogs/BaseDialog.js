import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
export default class BaseDialog extends LayoutContainer
{
    constructor()
    {
        super();
    }
    hrefChanged()
    {
        // override
    }
    propertyAnimationEnded( property )
    {
        console.log( "BaseDialog", property );
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
    dataChanged()
    {
        // override
    }
    initialize()
    {
        super.initialize();
        let wiw = window.innerWidth
        let wih = window.innerHeight;
        this.setSize( wiw, wih );
        this.dialogTopBar.width = wiw;
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
        this.dialogTopBar.width = wiw;
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
    set href( value )
    {
        if( this._href !== value )
        {
            this._href = value;
            this.hrefChanged();
        }
    }
    get href()
    {
        return this._href;
    }
    set data( value )
    {
        if( this._data !== value )
        {
            this._data = value;
            this.dataChanged();
        }
    }
    get data()
    {
        return this._data;
    }
}
customElements.define("base-dialog", BaseDialog);