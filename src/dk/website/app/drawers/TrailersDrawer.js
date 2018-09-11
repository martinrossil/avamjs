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
import IconButton from "../../../ava/components/buttons/IconButton.js";
import UIDS from "../consts/UIDS.js";
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
        this.addElement( this.trailersCountriesList );
        this.addElement( this.trailersGenresList );
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
            this._topBlock.height = 148;
        }
        return this._topBlock;
    }
    get closeIconButton()
    {
        if( !this._closeIconButton )
        {
            this._closeIconButton = new IconButton();
            this._closeIconButton.uid = UIDS.TRAILERS_DRAWER_CLOSE_BUTTON;
            this._closeIconButton.iconName = IconNames.ARROW_FORWARD;
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
            this._filterList.uid = UIDS.TRAILERS_FILTER_LIST;
            this._filterList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._filterList.layout = new VerticalLayout();
            this._filterList.layoutData = new AnchorLayoutData( 8, 52, 8 );
            this._filterList.itemRenderType = LinkItemRenderer;
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
    get trailersGenresList()
    {
        if( !this._trailersGenresList )
        {
            this._trailersGenresList = new ListElement();
            this._trailersGenresList.uid = UIDS.TRAILERS_GENRES_LIST;
            this._trailersGenresList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersGenresList.layout = new VerticalLayout();
            this._trailersGenresList.layoutData = new AnchorLayoutData( 8, 148, 8, 16 );
            this._trailersGenresList.itemRenderType = LinkItemRenderer;
            this._trailersGenresList.selectedIndex = 0;
        }
        return this._trailersGenresList;
    }
    get trailersCountriesList()
    {
        if( !this._trailersCountriesList )
        {
            this._trailersCountriesList = new ListElement();
            this._trailersCountriesList.isVisible = false;
            this._trailersCountriesList.uid = UIDS.TRAILERS_COUNTRIES_LIST;
            this._trailersCountriesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersCountriesList.layout = new VerticalLayout();
            this._trailersCountriesList.layoutData = new AnchorLayoutData( 8, 148, 8, 16 );
            this._trailersCountriesList.itemRenderType = LinkItemRenderer;
            this._trailersCountriesList.selectedIndex = 0;
        }
        return this._trailersCountriesList;
    }
}
customElements.define("trailers-drawer", TrailersDrawer ); 