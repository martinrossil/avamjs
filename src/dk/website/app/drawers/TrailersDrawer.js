import BaseDrawer from "./BaseDrawer.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import IconNames from "../../../ava/constants/IconNames.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import Theme from "../../../ava/styles/Theme.js";
import LinkItemRenderer from "../itemrenderers/base/LinkItemRenderer.js";
import UIDS from "../consts/UIDS.js";
import FilterItemRenderer from "../itemrenderers/FilterItemRenderer.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
export default class TrailersDrawer extends BaseDrawer
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        this.topBlock.width = w;
    }
    initialize()
    {
        super.initialize();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.countriesList );
        this.addElement( this.genresList );
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
        }
        return this._topBlock;
    }
    get closeIconButton()
    {
        if( !this._closeIconButton )
        {
            this._closeIconButton = new IconButton();
            this._closeIconButton.uid = UIDS.DRAWER_CLOSE_BUTTON;
            this._closeIconButton.iconName = IconNames.ARROW_FORWARD;
            this._closeIconButton.ariaLabel = "Luk Filter Menu";
            this._closeIconButton.layoutData = new AnchorLayoutData( NaN, 4, 4 ); 
        }
        return this._closeIconButton;
    }
    get filterList()
    {
        if( !this._filterList )
        {
            this._filterList = new ListElement();
            this._filterList.uid = UIDS.TRAILERS_FILTER_LIST;
            this._filterList.height = 96;
            this._filterList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._filterList.layout = new VerticalLayout();
            this._filterList.layoutData = new AnchorLayoutData( 8, 52, 8 );
            this._filterList.itemRenderType = FilterItemRenderer;
            this._filterList.dataProvider = this.filterListDataProvider;
            this._filterList.selectedIndex = 0;
        }
        return this._filterList;
    }
    get filterListDataProvider()
    {
        if( !this._filterListDataProvider ) 
        {
            let filters = [ { icon : IconNames.MOVIE_FILTER, l : "Genrer", h : "/trailers/genrer" }, 
                            { icon : IconNames.PUBLIC, l : "Lande", h : "/trailers/lande" } 
                          ];    
            this._filterListDataProvider = new ArrayCollection( filters );
        }
        return this._filterListDataProvider;
    }
    get genresList()
    {
        if( !this._genresList )
        {
            this._genresList = new ListElement();
            this._genresList.uid = UIDS.TRAILERS_GENRES_LIST;
            this._genresList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._genresList.layout = this.genresListLayout;
            this._genresList.layoutData = new AnchorLayoutData( 8, 152, 8, 0 );
            this._genresList.itemRenderType = LinkItemRenderer;
            this._genresList.selectedIndex = 0;
        }
        return this._genresList;
    }
    get genresListLayout()
    {
        if( !this._genresListLayout )
        {
            this._genresListLayout =  new VerticalLayout();
            this._genresListLayout.paddingTop = 4;
        }
        return this._genresListLayout;
    }
    get countriesList()
    {
        if( !this._countriesList )
        {
            this._countriesList = new ListElement();
            this._countriesList.isVisible = false;
            this._countriesList.uid = UIDS.TRAILERS_COUNTRIES_LIST;
            this._countriesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._countriesList.layout = this.countriesListLayout;
            this._countriesList.layoutData = new AnchorLayoutData( 8, 152, 8, 0 );
            this._countriesList.itemRenderType = LinkItemRenderer;
        }
        return this._countriesList;
    }
    get countriesListLayout()
    {
        if( !this._countriesListLayout )
        {
            this._countriesListLayout =  new VerticalLayout();
            this._countriesListLayout.paddingTop = 4;
        }
        return this._countriesListLayout;
    }
}
customElements.define("trailers-drawer", TrailersDrawer ); 