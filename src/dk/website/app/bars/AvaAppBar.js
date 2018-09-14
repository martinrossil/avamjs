import AppBar from "../../../ava/components/bars/AppBar.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import UIDS from "../consts/UIDS.js";
import LinkIconButton from "../../../ava/components/buttons/LinkIconButton.js";
import Paths from "../consts/Paths.js";
export default class AvaAppBar extends AppBar
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.titleTextElement );
        this.addElement( this.openSortMenuIconButton );
        this.addElement( this.openFilterDrawerLinkIconButton );
    }
    get titleTextElement()
    {
        if( !this._titleTextElement )
        {
            this._titleTextElement = new TextElement();
            this._titleTextElement.layoutData = new AnchorLayoutData( 16, NaN, 100 );
            this._titleTextElement.setPosition( 16, 13 );
            this._titleTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._titleTextElement.fontSize = 20;
            this._titleTextElement.wordWrap = false;
        }
        return this._titleTextElement;
    }
    get openFilterDrawerLinkIconButton()
    {
        if( !this._openFilterDrawerLinkIconButton )
        {
            this._openFilterDrawerLinkIconButton = new LinkIconButton();
            this._openFilterDrawerLinkIconButton.ariaLabel = "Åbn Filter Menu";
            this._openFilterDrawerLinkIconButton.uid = UIDS.OPEN_FILTER_DRAWER_LINK_ICON_BUTTON;
            this._openFilterDrawerLinkIconButton.iconName = IconNames.FILTER_LIST;
            this._openFilterDrawerLinkIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openFilterDrawerLinkIconButton;
    }
    get openSortMenuIconButton()
    {
        if( !this._openSortMenuIconButton )
        {
            this._openSortMenuIconButton = new IconButton();
            this._openSortMenuIconButton.ariaLabel = "Åbn Sorterings Menu";
            this._openSortMenuIconButton.uid = UIDS.OPEN_SORT_MENU_ICON_BUTTON;
            this._openSortMenuIconButton.iconName = IconNames.SORT;
            this._openSortMenuIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._openSortMenuIconButton;
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
}
customElements.define("ava-app-bar", AvaAppBar);