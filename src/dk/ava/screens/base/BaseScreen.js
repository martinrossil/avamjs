import LayoutContainer from "../../components/display/LayoutContainer.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
import EventTypes from "../../constants/EventTypes.js";
export default class BaseScreen extends LayoutContainer
{
    constructor()
    {
        super();
    }
    connectedCallback()
	{
        if( !this.hasBeenShownBefore )
        {
            this.hasBeenShownBefore = true;
            this.firstShow();
        }
    }
    firstShow()
    {
    }
    propertyAnimationEnded()
    {
        if( this.opacity === 0 )
        {
            this.dispatch( EventTypes.HIDE_COMPLETE, this );
        }
    }
    initialize()
    {
        super.initialize();
        this.propertyAnimationEnded = this.propertyAnimationEnded.bind( this );
        this.hasBeenShownBefore = false;
        this.opacity = 0;
        this.notifyPropertyAnimationEnd = true;
        this.animatedProperties = [ new AnimatedProperty( "opacity", 225, "linear" ) ];
        this.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.propertyAnimationEnded );
    }
}
customElements.define("base-screen", BaseScreen);