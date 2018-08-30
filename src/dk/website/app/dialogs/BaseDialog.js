import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
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
    isShownChanged()
    {
        // override
    }
    dataChanged()
    {
        // override
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.resizeAndPosition = this.resizeAndPosition.bind( this );
        this._isShown = false;
        this.resizeAndPosition();
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
            this.y = this.isShown ? 0 : window.innerHeight;
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