import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import Direction from "../../../ava/constants/Direction.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import Theme from "../../../ava/styles/Theme.js";
export default class BaseDrawer extends LayoutContainer
{
    constructor()
    {
        super();
    }
    isShownChanged()
    {
        this.x = this.isShown ? window.innerWidth - this.width : window.innerWidth;
        if( !this.hasBeenShown )
        {
            this.hasBeenShown = true;
            this.firstShow();
        }
    }
    firstShow()
    {
        // override
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.resizeAndPosition = this.resizeAndPosition.bind( this );
        this.width = 4 * 56;
        this.height = window.innerHeight;
        this.z = 8;
        this.shadowDirection = Direction.WEST;
        this.animatedProperties = [ new AnimatedProperty( "x", 225, "ease-in" ) ];
        this.resizeAndPosition();
        window.addEventListener( "resize", this.resizeAndPosition );
        this.addElement( this.titleTextElement );
        this.addElement( this.closeIconButton ); 
    }
    get titleTextElement()
    {
        if( !this._titleTextElement )
        {
            this._titleTextElement = new TextElement();
            this._titleTextElement.layoutData = new AnchorLayoutData( 16, NaN, 56 );
            this._titleTextElement.setPosition( 16, 13 );
            this._titleTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._titleTextElement.fontSize = 20;
            this._titleTextElement.wordWrap = false;
        }
        return this._titleTextElement;
    }
    get closeIconButton()
    {
        if( !this._closeIconButton )
        {
            this._closeIconButton = new IconButton();
            this._closeIconButton.iconName = IconNames.ARROW_FORWARD;
            this._closeIconButton.layoutData = new AnchorLayoutData( NaN, 4, 4 );
        }
        return this._closeIconButton;
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
    set title( value )
    {
        if( this._title !== value )
        {
            this._title = value;
            this._titleTextElement.text = value;
        }
    }
    get title()
    {
        return this._title;
    }
    set closeHref( value )
    {
        if( this._closeHref !== value )
        {
            this._closeHref = value;
            this.closeIconButton.href = value;
        }
    }
    get closeHref()
    {
        return this._closeHref;
    }
}
customElements.define("base-drawer", BaseDrawer ); 