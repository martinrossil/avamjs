import LayoutContainer from "../display/LayoutContainer.js";
import Theme from "../../styles/Theme.js";
import Direction from "../../constants/Direction.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
import AnchorLayout from "../../layouts/AnchorLayout.js";
export default class AppBar extends LayoutContainer
{
    constructor()
    {
        super();
    }
    initialize() 
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.backgroundColor = Theme.PRIMARY_COLOR;
        this.shadowDirection = Direction.SOUTH;
        this.isShown = false;
        this.animatedProperties = [ new AnimatedProperty( "y", 225, "ease-in" ) ];
        this.z = 4;
        this.resize();
        window.addEventListener( "resize", this.resize.bind( this ) );
    }
    resize()
    {
        this.setSize( window.innerWidth, 56 );
        this.y = this.isShown ? 0 : -56;
    }
    set isShown( value )
    {
        if( this._isShown !== value )
        {
            this._isShown = value;
            this.y = value ? 0 : -56;
        }
    }
    get isShown()
    {
        return this._isShown;
    }
}
customElements.define("app-bar", AppBar);