import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import Direction from "../../../ava/constants/Direction.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import Theme from "../../../ava/styles/Theme.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
export default class BaseDrawer extends LayoutContainer
{
    constructor()
    {
        super();
    }
    propertyAnimationEnded( property )
    {
        if( property === "x" )
        {
            if( this.x === window.innerWidth )
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
        this.x = this.isShown ? window.innerWidth - this.width : window.innerWidth;
    }
    initialize()
    {
        super.initialize();
        this.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        this.layout = new AnchorLayout();
        this.resizeAndPosition = this.resizeAndPosition.bind( this );
        this.setSize( 4 * 56, window.innerHeight );
        this.z = 8;
        this.x = window.innerWidth;
        this.isVisible = false;
        this.shadowDirection = Direction.WEST;
        this.notifyPropertyAnimationEnd = true;
        this.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.propertyAnimationEnded.bind( this ) );
        this.animatedProperties = [ new AnimatedProperty( "x", 225, "ease-in" ) ];
        window.addEventListener( "resize", this.resizeAndPosition );
    }
    resizeAndPosition()
    {
        this.height = window.innerHeight;
        this.x = this.isShown ? window.innerWidth - this.width : window.innerWidth;
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
customElements.define("base-drawer", BaseDrawer ); 