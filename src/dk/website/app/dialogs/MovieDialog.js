import BaseDialog from "./BaseDialog.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import ScrollContainer from "../../../ava/components/display/ScrollContainer.js";
import Direction from "../../../ava/constants/Direction.js";
import PosterBlock from "./sub/PosterBlock.js";
import DialogTopBar from "./DialogTopBar.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
import CastItemRenderer from "../itemrenderers/CastItemRenderer.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import DescriptionBlock from "./sub/DescriptionBlock.js";
import RatingBlock from "./sub/RatingBlock.js";
import System from "../../../ava/system/System.js";
export default class MovieDialog extends BaseDialog
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        this.layoutChildren( w, h );
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.layoutChildren( w, this.height );
    }
    heightChanged( h )
    {
        super.heightChanged( h );
        this.layoutChildren( this.width, h );
    }
    layoutChildren( w, h )
    {
        if( Math.min( window.outerWidth, window.outerHeight ) < 768 )
        {
            if( w >= h )
            {
                this.layoutPhoneHorizontal( w, h );
            }
            else
            {
                this.layoutPhoneVertical( w, h );
            }
            this.setPhoneBaseValues( w, h );
        }
        else
        {
            if( w >= h )
            {
                this.layoutTabletHorizontal( w, h );
            }
            else
            {
                this.layoutTabletVertical( w, h );
            }
            this.setTabletBaseValues( w, h );
        }
        this.setAllBaseValues( w, h);
    }
    setAllBaseValues( w, h )
    {
        this.ratingBlock.x = w - this.ratingBlock.width - 16;
        this.darkBlock.width = w;
        this.castList.width = w;
        this.darkBlock.height = this.castList.y + this.castList.height;
    }
    setPhoneBaseValues( w, h )
    {
        this.descriptionBlock.fontSize = 16;
        this.posterBlock.setSize( 160, 240 );
        this.darkBlock.y = 24 + 240 * .75;
        this.ratingBlock.setSize( 42, 42 );
    }
    setTabletBaseValues( w, h )
    {
        this.posterBlock.setSize( 240, 360 );
        this.descriptionBlock.fontSize = 20;
        this.descriptionBlock.width = w - ( 240 + 48 );
        this.descriptionBlock.y = ( 24 + 270 ) - this.descriptionBlock.height - 16;
        this.descriptionBlock.x = 240 + 32;
        this.darkBlock.y = 24 + 360 * .75;
        this.castList.y = 24 + 360 + 16;
        this.ratingBlock.setSize( 84, 84 );
    }
    layoutPhoneVertical( w, h )
    {
        console.log( "layoutPhoneVertical", w, h );
        
        this.descriptionBlock.y = 24 + 240 + 16;
        this.descriptionBlock.width = w - 32;
        this.descriptionBlock.x = 16;
        this.castList.y = this.descriptionBlock.y + this.descriptionBlock.height + 16;
    }
    layoutPhoneHorizontal( w, h )
    {
        console.log( "layoutPhoneHorizontal", w, h );
        this.descriptionBlock.width = w - ( 160 + 48 );
        this.descriptionBlock.y = ( 24 + 180 ) - this.descriptionBlock.height - 16;
        this.descriptionBlock.x = 160 + 32;
        this.castList.y = 240 + 32;
    }
    layoutTabletVertical( w, h )
    {
        console.log( "layoutTabletVertical", w, h );
    }
    layoutTabletHorizontal( w, h )
    {
        console.log( "layoutTabletHorizontal", w, h );
    }
    pathChanged()
    {
        if( this.path )
        {
            this.posterBlock.path = this.path;
            if( !this.infoData[ this.path ] )
            {
                let url = window.location.origin + "/info/film/" + this.path + ".json";
                this.infoLoader.load( url );
            }
            else
            {
                let data = this.infoData[ this.path ];
                this.infoComplete( data );
            }
        }
    }
    infoComplete( data )
    {
        if( data )
        {
            this.dialogTopBar.title = data.title;
            this.posterBlock.data = data;
            this.castCollection.arrayData = data.cast;
            
            let sizes = "wow [" + window.outerWidth + " / " + window.outerHeight + "]\n";
                sizes += "screen width [" + screen.width + " / " + screen.height + "]\n";
                sizes += "screen avail width [" + screen.availWidth + " / " + screen.availHeight + "]\n";
            this.descriptionBlock.description = sizes; // data.description;
            if( data.rating )
            {
                this.ratingBlock.isVisible = true;
                this.ratingBlock.rating = data.rating;
            }
            else
            {
                this.ratingBlock.isVisible = false;
            }
            this.layoutChildren( this.width, this.height );
        }
    }
    isShownChanged()
    {
        super.isShownChanged();
        if( !this.isShown )
        {
            this.path = null;
        }
    }
    initialize()
    {
        super.initialize();
        this.backgroundColor = Theme.APP_BACKGROUND_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.scrollContainer );
        this.addElement( this.dialogTopBar );
    }
    get scrollContainer()
    {
        if( !this._scrollContainer )
        {
            this._scrollContainer = new ScrollContainer();
            this._scrollContainer.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._scrollContainer.autoSizeVertical = true;
            this._scrollContainer.layoutData = new AnchorLayoutData( 0, 56, 0, 0 );
            this._scrollContainer.addElement( this.darkBlock );
            this._scrollContainer.addElement( this.posterBlock );
            this._scrollContainer.addElement( this.ratingBlock );
            this._scrollContainer.addElement( this.castList );
            this._scrollContainer.addElement( this.descriptionBlock );
        }
        return this._scrollContainer;
    }
    get ratingBlock()
    {
        if( !this._ratingBlock )
        {
            this._ratingBlock = new RatingBlock();
            this._ratingBlock.y = 16;
            this._ratingBlock.isVisible = false;
            this._ratingBlock.backgroundColor = Theme.PRIMARY_COLOR_DARK;
            this._ratingBlock.z = 2;
        }
        return this._ratingBlock;
    }
    get descriptionBlock()
    {
        if( !this._descriptionBlock )
        {
            this._descriptionBlock = new DescriptionBlock();
        }
        return this._descriptionBlock;
    }
    get castList()
    {
        if( !this._castList )
        {
            this._castList = new ListElement();
            this._castList.autoSizeVertical = true;
            this._castList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._castList.layout = this.tiledRowsLayout;
            //this._castList.backgroundColor = Theme.ACCENT_COLOR;
            this._castList.itemRenderType = CastItemRenderer;
            this._castList.dataProvider = this.castCollection;
        }
        return this._castList;
    }
    get castCollection()
    {
        if( !this._castCollection )
        {
            this._castCollection = new ArrayCollection();
        }
        return this._castCollection;
    }
    get tiledRowsLayout()
    {
        if( !this._tiledRowsLayout )
        {
            this._tiledRowsLayout = new TiledRowsLayout();
            this._tiledRowsLayout.padding = 16;
            this._tiledRowsLayout.gap = 16;
            this._tiledRowsLayout.verticalGap = 80;
            this._tiledRowsLayout.paddingBottom = 96;
            //this._tiledRowsLayout.maxColumns = 4;
            this._tiledRowsLayout.elementAspectRatio = 1 / 1.5;
            this._tiledRowsLayout.elementMinWidth = 100;
        }
        return this._tiledRowsLayout;
    }
    get dialogTopBar()
    {
        if( !this._dialogTopBar )
        {
            this._dialogTopBar = new DialogTopBar();
            this._dialogTopBar.layoutData = new AnchorLayoutData( 0, 0, 0 );
            this._dialogTopBar.backgroundColor = Theme.PRIMARY_COLOR;
        }
        return this._dialogTopBar;
    }
    get posterBlock()
    {
        if( !this._posterBlock )
        {
            this._posterBlock = new PosterBlock();
            this._posterBlock.x = 16;
            this._posterBlock.y = 16;
        }
        return this._posterBlock;
    }
    get darkBlock()
    {
        if( !this._darkBlock )
        {
            this._darkBlock = new DisplayElement();
            this._darkBlock.layoutData = new AnchorLayoutData( 0, NaN, 0, 0 );
            this._darkBlock.z = 4;
            this._darkBlock.shadowDirection = Direction.NORTH;
            this._darkBlock.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        }
        return this._darkBlock;
    }
}
customElements.define("movie-dialog", MovieDialog);