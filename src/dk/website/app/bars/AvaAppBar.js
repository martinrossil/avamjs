import AppBar from "../../../ava/components/bars/AppBar.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import UIDS from "../consts/UIDS.js";
import Strings from "../consts/Strings.js";
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
        //this.addElement( this.openSortButton );
        this.addElement( this.openFilterButton );
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
    get openSortButton()
    {
        if( !this._openSortButton )
        {
            this._openSortButton = new IconButton();
            this._openSortButton.ariaLabel = Strings.OPEN_SORT_MENU;
            this._openSortButton.uid = UIDS.OPEN_SORT_BUTTON;
            this._openSortButton.iconName = IconNames.SORT;
            this._openSortButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._openSortButton;
    }
    get openFilterButton()
    {
        if( !this._openFilterButton )
        {
            this._openFilterButton = new IconButton();
            this._openFilterButton.ariaLabel = Strings.OPEN_FILTER_MENU;
            this._openFilterButton.uid = UIDS.OPEN_FILTER_BUTTON;
            this._openFilterButton.iconName = IconNames.FILTER_LIST;
            this._openFilterButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openFilterButton;
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