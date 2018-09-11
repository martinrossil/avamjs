import BaseDrawer from "./BaseDrawer.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import Theme from "../../../ava/styles/Theme.js";
import LinkItemRenderer from "../itemrenderers/base/LinkItemRenderer.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
export default class MoviesDrawer extends BaseDrawer
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
        this.addElement( this.moviesDrawerList );
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
            this._closeIconButton.uid = "moviesDrawerCloseButton";
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
            this._filterList.uid = "moviesFilterList";
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
            let filters = [ { icon : IconNames.MOVIE_FILTER, l : "Genrer", h : "/film/genrer" }, 
                            { icon : IconNames.PUBLIC, l : "Lande", h : "/film/lande" } 
                          ];    
            this._filterListDataProvider = new ArrayCollection( filters );
        }
        return this._filterListDataProvider;
    }
    get moviesDrawerList()
    {
        if( !this._moviesDrawerList )
        {
            this._moviesDrawerList = new ListElement();
            this._moviesDrawerList.uid = "movieDrawerList";
            this._moviesDrawerList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._moviesDrawerList.layout = new VerticalLayout();
            this._moviesDrawerList.layoutData = new AnchorLayoutData( 8, 148, 8, 16 );
            this._moviesDrawerList.itemRenderType = LinkItemRenderer;
            this._moviesDrawerList.selectedIndex = 0;
        }
        return this._moviesDrawerList;
    }
}
customElements.define("movies-drawer", MoviesDrawer ); 