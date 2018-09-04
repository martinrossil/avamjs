import BaseDrawer from "./BaseDrawer.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import GenreItemRenderer from "../itemrenderers/GenreItemRenderer.js";
import FilterTypeItemRenderer from "../itemrenderers/FilterTypeItemRenderer.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import IconNames from "../../../ava/constants/IconNames.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import Theme from "../../../ava/styles/Theme.js";
import Config from "../Config.js";
import CountryItemRenderer from "../itemrenderers/CountryItemRenderer.js";
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
        this.addElement( this.topBlock );
        super.initialize();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.filterTypesList );
        this.addElement( this.genresList );
        this.addElement( this.countriesList );
    }
    get topBlock()
    {
        if( !this._topBlock )
        {
            this._topBlock = new DisplayElement();
            this._topBlock.backgroundColor = Theme.PRIMARY_COLOR_DARK;
            this._topBlock.z = 2;
            this._topBlock.height = 52 + 96;
        }
        return this._topBlock;
    }
    get filterTypesList()
    {
        if( !this._filterTypesList )
        {
            this._filterTypesList = new ListElement();
            this._filterTypesList.height = 96;
            this._filterTypesList.uid = "trailersFilterTypesList";
            this._filterTypesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._filterTypesList.layout = new VerticalLayout();
            this._filterTypesList.layoutData = new AnchorLayoutData( 8, 52, 8 );
            this._filterTypesList.itemRenderType = FilterTypeItemRenderer;
            this._filterTypesList.dataProvider = this.filterTypesListDataProvider;
            this._filterTypesList.selectedIndex = 0;
        }
        return this._filterTypesList;
    }
    get filterTypesListDataProvider()
    {
        if( !this._filterTypesListDataProvider )
        {
            let filters = [ { icon : IconNames.MOVIE_FILTER, label : "Genrer", href : "/trailers/genrer" }, 
                            { icon : IconNames.PUBLIC, label : "Lande", href : "/trailers/lande" } 
                          ];    
            this._filterTypesListDataProvider = new ArrayCollection( filters );
        }
        return this._filterTypesListDataProvider;
    }
    get genresList()
    {
        if( !this._genresList )
        {
            this._genresList = new ListElement();
            this._genresList.uid = "trailersGenresList";
            this._genresList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._genresList.layout = new VerticalLayout();
            this._genresList.layoutData = new AnchorLayoutData( 8, 60 + 96, 8, 16 );
            this._genresList.itemRenderType = GenreItemRenderer;
            this._genresList.selectedIndex = 0;
        }
        return this._genresList;
    }
    get countriesList()
    {
        if( !this._countriesList )
        {
            this._countriesList = new ListElement();
            this._countriesList.isVisible = false;
            this._countriesList.isInteractive = false;
            this._countriesList.uid = "trailersCountriesList";
            this._countriesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._countriesList.layout = new VerticalLayout();
            this._countriesList.layoutData = new AnchorLayoutData( 8, 60 + 96, 8, 16 );
            this._countriesList.itemRenderType = CountryItemRenderer;
            this._countriesList.selectedIndex = 0;
        }
        return this._countriesList;
    }
}
customElements.define("trailers-drawer", TrailersDrawer ); 