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
        this.addElement( this.topBlock );
        this.addElement( this.closeIconButton ); 
        this.addElement( this.trailersFilterList );
        this.addElement( this.trailersDrawerList );
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
    get closeIconButton()
    {
        if( !this._closeIconButton )
        {
            this._closeIconButton = new IconButton();
            this._closeIconButton.uid = "trailersDrawerCloseButton";
            this._closeIconButton.iconName = IconNames.ARROW_FORWARD;
            this._closeIconButton.layoutData = new AnchorLayoutData( NaN, 4, 4 ); 
        }
        return this._closeIconButton;
    }
    get trailersFilterList()
    {
        if( !this._trailersFilterList )
        {
            this._trailersFilterList = new ListElement();
            this._trailersFilterList.height = 96;
            this._trailersFilterList.uid = "trailersFilterList";
            this._trailersFilterList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersFilterList.layout = new VerticalLayout();
            this._trailersFilterList.layoutData = new AnchorLayoutData( 8, 52, 8 );
            this._trailersFilterList.itemRenderType = LinkItemRenderer;
            this._trailersFilterList.dataProvider = this.trailersFilterListDataProvider;
            this._trailersFilterList.selectedIndex = 0;
        }
        return this._trailersFilterList;
    }
    get trailersFilterListDataProvider()
    {
        if( !this._trailersFilterListDataProvider )
        {
            let filters = [ { icon : IconNames.MOVIE_FILTER, l : "Genrer", h : "/trailers/filter/genrer" }, 
                            { icon : IconNames.PUBLIC, l : "Lande", h : "/trailers/filter/lande" } 
                          ];    
            this._trailersFilterListDataProvider = new ArrayCollection( filters );
        }
        return this._trailersFilterListDataProvider;
    }
    get trailersDrawerList()
    {
        if( !this._trailersDrawerList )
        {
            this._trailersDrawerList = new ListElement();
            this._trailersDrawerList.uid = "trailersDrawerList";
            this._trailersDrawerList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersDrawerList.layout = new VerticalLayout();
            this._trailersDrawerList.layoutData = new AnchorLayoutData( 8, 60 + 96, 8, 16 );
            this._trailersDrawerList.itemRenderType = LinkItemRenderer;
        }
        return this._trailersDrawerList;
    }
}
customElements.define("trailers-drawer", TrailersDrawer ); 