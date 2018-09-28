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
import MovieInfoTrailerItemRenderer from "../itemrenderers/MovieInfoTrailerItemRenderer.js";
export default class MovieDialog extends BaseDialog
{
    constructor()
    {
        super();
    }
    layoutChildren( w, h )
    {
        if( w < 640 )
        {
            this.layoutNarrow( w, h );
        }
        else
        {
            this.layoutWide( w, h );
        }
        this.ratingBlock.x = w - this.ratingBlock.width - 16;
        this.darkBlock.width = w;
        this.trailersList.width = w;
        this.castList.width = w;
        this.castList.y = this.trailersList.y + this.trailersList.height + 16;
        this.darkBlock.height = this.castList.y + this.castList.height - this.darkBlock.y;
    }
    layoutNarrow( w, h )
    {
        this.posterBlock.setSize( 160, 240 );
        this.ratingBlock.setSize( 42, 42 );
        this.darkBlock.y = 204;
        this.descriptionBlock.x = 16;
        this.descriptionBlock.width = w - 32;
        this.descriptionBlock.y = this.posterBlock.y + this.posterBlock.height + 16;
        this.descriptionBlock.fontSize = 16;
        this.trailersList.y = this.descriptionBlock.y + this.descriptionBlock.height;
    }
    layoutWide( w, h )
    {
        this.posterBlock.setSize( 240, 360 );
        this.ratingBlock.setSize( 84, 84 );
        this.darkBlock.y = 294;
        this.descriptionBlock.fontSize = 20;
        this.descriptionBlock.x = this.posterBlock.x + this.posterBlock.width + 16;
        this.descriptionBlock.width = w - ( 16 + 240 + 32 );
        this.descriptionBlock.y = this.darkBlock.y - this.descriptionBlock.height - 16;
        this.trailersList.y = this.posterBlock.y + this.posterBlock.height + 16;
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
            this.trailersCollection.arrayData = data.trailers;
            this.castCollection.arrayData = data.cast;
            this.descriptionBlock.description = data.description;
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
            this._scrollContainer.addElement( this.descriptionBlock );
            this._scrollContainer.addElement( this.trailersList );
            this._scrollContainer.addElement( this.castList );
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
    get trailersList()
    {
        if( !this._trailersList )
        {
            this._trailersList = new ListElement();
            this._trailersList.autoSizeVertical = true;
            this._trailersList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersList.layout = this.trailersListLayout;
            this._trailersList.dataProvider = this.trailersCollection;
            this._trailersList.itemRenderType = MovieInfoTrailerItemRenderer;
        }
        return this._trailersList;
    }
    get trailersListLayout()
    {
        if( !this._trailersListLayout )
        {
            this._trailersListLayout = new TiledRowsLayout();
            this._trailersListLayout.padding = 16;
            this._trailersListLayout.gap = 16;
            this._trailersListLayout.verticalGap = 48;
            this._trailersListLayout.paddingBottom = 32;
            this._trailersListLayout.maxColumns = 3;
            this._trailersListLayout.elementAspectRatio = 2;
            this._trailersListLayout.elementMinWidth = 240;
            this._trailersListLayout.maxTotalWidth = 1024;
        }
        return this._trailersListLayout;
    }
    get trailersCollection()
    {
        if( !this._trailersCollection )
        {
            this._trailersCollection = new ArrayCollection();
        }
        return this._trailersCollection;
    }
    get castList()
    {
        if( !this._castList )
        {
            this._castList = new ListElement();
            this._castList.autoSizeVertical = true;
            this._castList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._castList.layout = this.castListLayout;
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
    get castListLayout()
    {
        if( !this._castListLayout )
        {
            this._castListLayout = new TiledRowsLayout();
            this._castListLayout.padding = 16;
            this._castListLayout.gap = 16;
            this._castListLayout.verticalGap = 80;
            this._castListLayout.paddingBottom = 96;
            this._castListLayout.maxColumns = 5;
            this._castListLayout.elementAspectRatio = 1 / 1.5;
            this._castListLayout.elementMinWidth = 136;
            this._castListLayout.maxTotalWidth = 1024;
        }
        return this._castListLayout;
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
            this._darkBlock.z = 4;
            this._darkBlock.shadowDirection = Direction.NORTH;
            this._darkBlock.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        }
        return this._darkBlock;
    }
}
customElements.define("movie-dialog", MovieDialog);