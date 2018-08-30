import LayoutContainer from "../../../ava/components/display/LayoutContainer.js";
import Direction from "../../../ava/constants/Direction.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import Theme from "../../../ava/styles/Theme.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
export default class DialogTopBar extends LayoutContainer
{
    constructor()
    {
        super();
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
            this._closeIconButton.iconName = IconNames.CLOSE;
            this._closeIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._closeIconButton;
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
        if( this._closeHref != value )
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
customElements.define("dialog-top-bar", DialogTopBar);