import BaseDialog from "./BaseDialog.js";
import DialogTopBar from "./DialogTopBar.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import ScrollContainer from "../../../ava/components/display/ScrollContainer.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import DisplayElement from "../../../ava/components/display/DisplayElement.js";
import Direction from "../../../ava/constants/Direction.js";
import ProfileBlock from "./sub/ProfileBlock.js";
import DescriptionBlock from "./sub/DescriptionBlock.js";
import AgeBlock from "./sub/AgeBlock.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import MovieItemRenderer from "../itemrenderers/MovieItemRenderer.js";
import ActorInfoTrailerItemRenderer from "../itemrenderers/ActorInfoTrailerItemRenderer.js";
export default class ActorDialog extends BaseDialog
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
        this.ageBlock.x = w - this.ageBlock.width - 24;
        this.darkBlock.width = w;
        this.moviesList.width = w;
        this.trailersList.width = w;
        this.trailersList.y = this.moviesList.y + this.moviesList.height + 24;
        this.darkBlock.height = this.trailersList.y + this.trailersList.height - this.darkBlock.y;
    }
    layoutNarrow( w, h )
    {
        this.profileBlock.setSize( 160, 240 );
        this.ageBlock.setSize( 42, 42 );
        this.darkBlock.y = 204;
        this.descriptionBlock.x = 24;
        this.descriptionBlock.width = w - 48;
        this.descriptionBlock.y = 24 + this.profileBlock.height + 24;
        this.moviesList.y = this.descriptionBlock.y + this.descriptionBlock.height + 48;
    }
    layoutWide( w, h )
    {
        this.profileBlock.setSize( 240, 360 );
        this.ageBlock.setSize( 84, 84 );
        this.darkBlock.y = 294;
        this.descriptionBlock.x = 24 + this.profileBlock.width + 24;
        this.descriptionBlock.width = w - ( 24 + 240 + 48 );
        this.descriptionBlock.y = this.darkBlock.y - this.descriptionBlock.height - 24;
        this.moviesList.y = this.profileBlock.y + this.profileBlock.height + 48;
    }
    pathChanged()
    {
        if( this.path )
        {
            this.profileBlock.path = this.path;
            if( !this.infoData[ this.path ] )
            {
                let url = window.location.origin + "/info/skuespillere/" + this.path + ".json";
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
            this.dialogTopBar.title = data.name;
            this.moviesCollection.arrayData = data.movies;
            this.trailersCollection.arrayData = data.trailers;
            this.profileBlock.data = data;
            this.descriptionBlock.description = data.biography;
            this.ageBlock.age = data.age;
            this.layoutChildren( this.width, this.height );
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
            this._scrollContainer.addElement( this.profileBlock );
            this._scrollContainer.addElement( this.ageBlock );
            this._scrollContainer.addElement( this.descriptionBlock );
            this._scrollContainer.addElement( this.moviesList );
            this._scrollContainer.addElement( this.trailersList );
        }
        return this._scrollContainer;
    }
    get moviesList()
    {
        if( !this._moviesList )
        {
            this._moviesList = new ListElement();
            this._moviesList.autoSizeVertical = true;
            this._moviesList.horizontalScrollPolicy  = ScrollPolicy.OFF;
            this._moviesList.layout = this.moviesListLayout;
            this._moviesList.dataProvider = this.moviesCollection;
            this._moviesList.itemRenderType = MovieItemRenderer;
        }
        return this._moviesList;
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
            this._trailersList.itemRenderType = ActorInfoTrailerItemRenderer;
        }
        return this._trailersList;
    }
    get moviesListLayout()
    {
        if( !this._moviesListLayout )
        {
            this._moviesListLayout = new TiledRowsLayout();
            this._moviesListLayout.padding = 24;
            this._moviesListLayout.gap = 24;
            this._moviesListLayout.verticalGap = 80;
            this._moviesListLayout.paddingBottom = 64;
            this._moviesListLayout.maxColumns = 4;
            this._moviesListLayout.elementAspectRatio = 1 / 1.5;
            this._moviesListLayout.elementMinWidth = 136;
            this._moviesListLayout.maxTotalWidth = 1024;
        }
        return this._moviesListLayout;
    }
    get trailersListLayout()
    {
        if( !this._trailersListLayout )
        {
            this._trailersListLayout = new TiledRowsLayout();
            this._trailersListLayout.padding = 24
            this._trailersListLayout.gap = 24;
            this._trailersListLayout.verticalGap = 80;
            this._trailersListLayout.paddingBottom = 96;
            this._trailersListLayout.maxColumns = 3;
            this._trailersListLayout.elementAspectRatio = 2;
            this._trailersListLayout.elementMinWidth = 240;
            this._trailersListLayout.maxTotalWidth = 1024;
        }
        return this._trailersListLayout;
    }
    get moviesCollection()
    {
        if( !this._moviesCollection )
        {
            this._moviesCollection = new ArrayCollection();
        }
        return this._moviesCollection;
    }
    get trailersCollection()
    {
        if( !this._trailersCollection )
        {
            this._trailersCollection = new ArrayCollection();
        }
        return this._trailersCollection;
    }
    get ageBlock()
    {
        if( !this._ageBlock )
        {
            this._ageBlock = new AgeBlock();
            this._ageBlock.y = 24;
            this._ageBlock.z = 2;
        }
        return this._ageBlock;
    }
    get descriptionBlock()
    {
        if( !this._descriptionBlock )
        {
            this._descriptionBlock = new DescriptionBlock();
        }
        return this._descriptionBlock;
    }
    get profileBlock()
    {
        if( !this._profileBlock )
        {
            this._profileBlock = new ProfileBlock();
            this._profileBlock.x = 24;
            this._profileBlock.y = 24;
        }
        return this._profileBlock;
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
}
customElements.define("actor-dialog", ActorDialog);