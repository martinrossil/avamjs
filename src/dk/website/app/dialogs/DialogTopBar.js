import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import Direction from "../../../ava/constants/Direction.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import Theme from "../../../ava/styles/Theme.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import Strings from "../consts/Strings.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import AnimatedProperty from "../../../ava/animation/AnimatedProperty.js";
export default class DialogTopBar extends LayoutContainer
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        this.layoutChildren( w );
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.layoutChildren( w );
    }
    layoutChildren( w )
    {
        if( w > 1024 )
        {
            let padding = ( w - 1024 ) * .5;
            if( padding < 24 )
            {
                this.titleTextElement.x = 24;
                this.closeIconButton.x = w - 56;
            }
            else
            {
                this.titleTextElement.x = padding;
                this.closeIconButton.x = w - padding - 32;
            }
            
        }
        else
        {
            this.titleTextElement.x = 24;
            this.closeIconButton.x = w - 56;
        }
    }
    propertyAnimationEnded( property )
    {
        if( property === "opacity" )
        {
            if( this.opacity === 0 )
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
            this.opacity = 1;
        }
        else
        {
            this.opacity = 0;
        }
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.height = 56;
        this.shadowDirection = Direction.SOUTH;
        this.z = 4;
        this.addElement( this.titleTextElement );
        this.addElement( this.closeIconButton );
        this.notifyPropertyAnimationEnd = true;
        this.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.propertyAnimationEnded.bind( this ) );
        this.animatedProperties = [ new AnimatedProperty( "opacity", 225, "ease-in" ) ];
    }
    get titleTextElement()
    {
        if( !this._titleTextElement )
        {
            this._titleTextElement = new TextElement();
            this._titleTextElement.setPosition( 24, 13 );
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
            this._closeIconButton.y = 4;
            this._closeIconButton.iconName = IconNames.ARROW_DOWNWARD;
            this._closeIconButton.listen( EventTypes.TRIGGERED, this.closeTriggered.bind( this ) );
            this._closeIconButton.ariaLabel = Strings.CLOSE;
        }
        return this._closeIconButton;
    }
    closeTriggered()
    {
        history.back();
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
customElements.define("dialog-top-bar", DialogTopBar);