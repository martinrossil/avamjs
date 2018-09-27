import BaseScreen from "../../../../ava/screens/base/BaseScreen.js";
import AnchorLayout from "../../../../ava/layouts/AnchorLayout.js";
import DisplayElement from "../../../../ava/components/display/DisplayElement.js";
import Theme from "../../../../ava/styles/Theme.js";
import AnchorLayoutData from "../../../../ava/layouts/data/AnchorLayoutData.js";
import Paths from "../../consts/Paths.js";
import IconNames from "../../../../ava/constants/IconNames.js";
import Strings from "../../consts/Strings.js";
import ListElement from "../../../../ava/components/lists/ListElement.js";
import UIDS from "../../consts/UIDS.js";
import ScrollPolicy from "../../../../ava/constants/ScrollPolicy.js";
import VerticalLayout from "../../../../ava/layouts/VerticalLayout.js";
import ArrayCollection from "../../../../ava/data/ArrayCollection.js";
import ScreensNavigator from "../../../../ava/screens/ScreensNavigator.js";
import MoviesGenresScreen from "./MoviesGenresScreen.js";
import MoviesCountriesScreen from "./MoviesCountriesScreen.js";
import IconButton from "../../../../ava/components/buttons/IconButton.js";
import FilterMenuItemRenderer from "../../itemrenderers/FilterMenuItemRenderer.js";
export default class MoviesFilterScreen extends BaseScreen
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.screensNavigator );
        this.addElement( this.topBlock );
        this.addElement( this.closeIconButton );
        this.addElement( this.filterList );
    }
    get topBlock()
    {
        if( !this._topBlock )
        {
            this._topBlock = new DisplayElement();
            this._topBlock.backgroundColor = Theme.PRIMARY_COLOR_DARK;
            this._topBlock.z = 2;
            this._topBlock.height = 152;
            this._topBlock.layoutData = new AnchorLayoutData( 0, NaN, 0 );
        }
        return this._topBlock;
    }
    get closeIconButton()
    {
        if( !this._closeIconButton )
        {
            this._closeIconButton = new IconButton();
            this._closeIconButton.uid = UIDS.CLOSE_FILTER_MENU;
            this._closeIconButton.iconName = IconNames.ARROW_FORWARD;
            this._closeIconButton.ariaLabel = Strings.CLOSE_FILTER_MENU;
            this._closeIconButton.layoutData = new AnchorLayoutData( NaN, 4, 4 ); 
        }
        return this._closeIconButton;
    }
    get filterList()
    {
        if( !this._filterList )
        {
            this._filterList = new ListElement();
            this._filterList.height = 96;
            this._filterList.uid = UIDS.MOVIES_FILTER_LIST;
            this._filterList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._filterList.layout = new VerticalLayout();
            this._filterList.layoutData = new AnchorLayoutData( 8, 52, 8 );
            this._filterList.itemRenderType = FilterMenuItemRenderer;
            this._filterList.dataProvider = this.filterListDataProvider;
        }
        return this._filterList;
    }
    get filterListDataProvider()
    {
        if( !this._filterListDataProvider )
        {
            let filters = [ { icon : IconNames.MOVIE_FILTER, l : Strings.GENRES, h : Paths.MOVIES_GENRES },
                            { icon : IconNames.PUBLIC, l : Strings.COUNTRIES, h : Paths.MOVIES_COUNTRIES }
                          ];    
            this._filterListDataProvider = new ArrayCollection( filters );
        }
        return this._filterListDataProvider;
    }
    get screensNavigator()
    {
        if( !this._screensNavigator )
        {
            this._screensNavigator = new ScreensNavigator();
            this._screensNavigator.uid = UIDS.MOVIES_FILTERS_SCREEN_NAVIGATOR;
            this._screensNavigator.layoutData = new AnchorLayoutData( 8, 152, 8, 0 );
            this._screensNavigator.addScreen( new MoviesGenresScreen() );
            this._screensNavigator.addScreen( new MoviesCountriesScreen() );
        }
        return this._screensNavigator;
    }
}
customElements.define( "movies-filter-screen", MoviesFilterScreen );