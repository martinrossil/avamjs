import AnchorLayoutData from "../../layouts/data/AnchorLayoutData.js";
import EventTypes from "../../constants/EventTypes.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
import LayoutContainer from "../display/LayoutContainer.js";
import AnchorLayout from "../../layouts/AnchorLayout.js";
import RippleSurface from "../display/RippleSurface.js";
export default class ScrimElement extends LayoutContainer
{
    constructor()
    {
        super();
    }
    propertyAnimationEnded( property )
    {
        if( property === "opacity" )
        {
            if( this.opacity === 0 )
            {
                this.isVisible = false;
                this.isInteractive = false;
                this.rippleSurface.isVisible = false;
                this.rippleSurface.isInteractive = false;
                this.rippleSurface.unListen( EventTypes.TRIGGERED, this.rippleTriggered );
            }
            else
            {
                this.rippleSurface.listen( EventTypes.TRIGGERED, this.rippleTriggered );
            }
        }
    }
    isShownChanged()
    {
        if( this.isShown )
        {
            this.isVisible = true;
            this.isInteractive = true;
            this.rippleSurface.isVisible = true;
            this.rippleSurface.isInteractive = true;
            this.opacity = .5;
        }
        else
        {
            this.opacity = 0;
        }
    }
    rippleTriggered( data )
    {
        console.log( "rippleTriggered", data );
    }
    initialize()
    {
        super.initialize();
        this.rippleTriggered = this.rippleTriggered.bind( this );
        this._isShown = false;
        this.backgroundColor = "#232F34";
        this.opacity = .32;
        this.isVisible = false;
        this.isInteractive = false;
        this.layout = new AnchorLayout();
        this.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
        this.notifyPropertyAnimationEnd = true;
        this.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.propertyAnimationEnded.bind( this ) );
        this.animatedProperties = [ new AnimatedProperty( "opacity" ) ];
        this.addElement( this.rippleSurface );
    }
    get rippleSurface()
    {
        if( !this._rippleSurface )
        {
            this._rippleSurface = new RippleSurface();
            this._rippleSurface.isInteractive = false;
            this._rippleSurface.isVisible = false;
            this._rippleSurface.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
        }
        return this._rippleSurface;
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
}
customElements.define("scrim-element", ScrimElement ); 