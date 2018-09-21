import AppBar from "../../../ava/components/bars/AppBar.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import UIDS from "../consts/UIDS.js";
import LinkIconButton from "../../../ava/components/buttons/LinkIconButton.js";
import Paths from "../consts/Paths.js";
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
        this.addElement( this.openSortMenuIconButton );
        this.addElement( this.openFilterButton );
        /*this.addElement( this.openTrailersFilterButton );
        this.addElement( this.openMoviesFilterButton );
        this.addElement( this.openActorsFilterButton );*/
    }
    get openFilterButton()
    {
        if( !this._openFilterButton )
        {
            this._openFilterButton = new LinkIconButton();
            //this._openFilterButton.href = Paths.TRAILERS_GENRER;
            this._openFilterButton.ariaLabel = Strings.OPEN_FILTER_MENU;
            this._openFilterButton.uid = UIDS.OPEN_FILTER_DRAWER_LINK_ICON_BUTTON;
            this._openFilterButton.iconName = IconNames.FILTER_LIST;
            this._openFilterButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openFilterButton;
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
    get openTrailersFilterButton()
    {
        if( !this._openTrailersFilterButton )
        {
            this._openTrailersFilterButton = new LinkIconButton();
            this._openTrailersFilterButton.href = Paths.TRAILERS_GENRER;
            this._openTrailersFilterButton.ariaLabel = Strings.OPEN_FILTER_MENU;
            this._openTrailersFilterButton.uid = UIDS.OPEN_TRAILERS_FILTER_BUTTON;
            this._openTrailersFilterButton.iconName = IconNames.FILTER_LIST;
            this._openTrailersFilterButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openTrailersFilterButton;
    }
    get openMoviesFilterButton()
    {
        if( !this._openMoviesFilterButton )
        {
            this._openMoviesFilterButton = new LinkIconButton();
            this._openMoviesFilterButton.isVisible = false;
            this._openMoviesFilterButton.href = Paths.MOVIES_GENRER;
            this._openMoviesFilterButton.ariaLabel = Strings.OPEN_FILTER_MENU;
            this._openMoviesFilterButton.uid = UIDS.OPEN_MOVIES_FILTER_BUTTON;
            this._openMoviesFilterButton.iconName = IconNames.FILTER_LIST;
            this._openMoviesFilterButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openMoviesFilterButton;
    }
    get openActorsFilterButton()
    {
        if( !this._openActorsFilterButton )
        {
            this._openActorsFilterButton = new LinkIconButton();
            this._openActorsFilterButton.isVisible = false;
            this._openActorsFilterButton.href = Paths.ACTORS_COUNTRIES;
            this._openActorsFilterButton.ariaLabel = Strings.OPEN_FILTER_MENU;
            this._openActorsFilterButton.uid = UIDS.OPEN_ACTORS_FILTER_BUTTON;
            this._openActorsFilterButton.iconName = IconNames.FILTER_LIST;
            this._openActorsFilterButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openActorsFilterButton;
    }
    get openSortMenuIconButton()
    {
        if( !this._openSortMenuIconButton )
        {
            this._openSortMenuIconButton = new IconButton();
            this._openSortMenuIconButton.ariaLabel = Strings.OPEN_SORT_MENU;
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