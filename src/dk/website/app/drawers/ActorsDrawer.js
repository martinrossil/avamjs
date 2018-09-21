import BaseDrawer from "./BaseDrawer.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import Theme from "../../../ava/styles/Theme.js";
import IconNames from "../../../ava/constants/IconNames.js";
import LinkItemRenderer from "../itemrenderers/base/LinkItemRenderer.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import UIDS from "../consts/UIDS.js";
import FilterItemRenderer from "../itemrenderers/FilterItemRenderer.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
export default class ActorsDrawer extends BaseDrawer
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
        //this.addElement( this.actorsCountriesList );
        this.addElement( this.drawerList );
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
            this._topBlock.height = 104;
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
            this._filterList.height = 48;
            this._filterList.uid = UIDS.ACTORS_FILTER_LIST;
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
            let filters = [ { icon : IconNames.PUBLIC, l : "Lande", h : "/skuespillere/lande" } ];    
            this._filterListDataProvider = new ArrayCollection( filters );
        }
        return this._filterListDataProvider;
    }
    get drawerList()
    {
        if( !this._drawerList )
        {
            this._drawerList = new ListElement();
            this._drawerList.uid = UIDS.ACTORS_DRAWER_LIST;
            this._drawerList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._drawerList.layout = this.drawerListLayout;
            this._drawerList.layoutData = new AnchorLayoutData( 8, 104, 8, 0 );
            this._drawerList.itemRenderType = LinkItemRenderer;
            //this._trailersGenresList.selectedIndex = 0;
        }
        return this._drawerList;
    }
    get drawerListLayout()
    {
        if( !this._drawerListLayout )
        {
            this._drawerListLayout =  new VerticalLayout();
            this._drawerListLayout.paddingTop = 4;
        }
        return this._drawerListLayout;
    }
    get actorsCountriesList()
    {
        if( !this._actorsCountriesList )
        {
            this._actorsCountriesList = new ListElement();
            this._actorsCountriesList.uid = UIDS.ACTORS_COUNTRIES_LIST;
            this._actorsCountriesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._actorsCountriesList.layout = this.actorsCountriesListLayout;
            this._actorsCountriesList.layoutData = new AnchorLayoutData( 8, 104, 8, 0 );
            this._actorsCountriesList.itemRenderType = LinkItemRenderer;
            this._actorsCountriesList.selectedIndex = 0;
        }
        return this._actorsCountriesList;
    }
    get actorsCountriesListLayout()
    {
        if( !this._actorsCountriesListLayout )
        {
            this._actorsCountriesListLayout = new VerticalLayout();
            this._actorsCountriesListLayout.paddingTop = 4;
        }
        return this._actorsCountriesListLayout;
    }
}
customElements.define("actors-drawer", ActorsDrawer ); 