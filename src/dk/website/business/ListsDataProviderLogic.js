import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import Properties from "../app/consts/Properties.js";
import UIDS from "../app/consts/UIDS.js";
import Paths from "../app/consts/Paths.js";
import SortOrder from "../app/consts/SortOrder.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import Events from "../app/consts/Events.js";
import Filters from "../app/consts/Filters.js";
export default class ListsDataProviderLogic extends Logic
{
    constructor()
    {
        super();
        this.setInitialFilterAndSortValues();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    setInitialFilterAndSortValues()
    {
        this.trailersFilter         = Filters.GENRES;
        this.trailersSubFilter      = Filters.ALL;
        this.moviesFilter           = Filters.GENRES;
        this.moviesSubFilter        = Filters.ALL;
        this.actorsFilter           = Filters.COUNTRIES;
        this.actorsSubFilter        = Filters.ALL;
        this.currentSortOrder       = SortOrder.NEWEST;
    }
    clicked( e )
    {
        let bottomNavigationBarItemRenderer = ClickTargetUtil.getBottomNavigationBarItemRendererFromTarget( e.target );
        if( bottomNavigationBarItemRenderer )
        {
            let path = bottomNavigationBarItemRenderer.data.href;
            this.loadDataFromBottomNavigationPath( path );
        }
        else
        {
            let linkItemRenderer = ClickTargetUtil.getLinkItemRendererFromTarget( e.target );
            if( linkItemRenderer )
            {
                this.loadDataFromSubFilterPath( linkItemRenderer.data.h );
            }
        }
    }
    loadDataFromSubFilterPath( path )
    { 
        let pathArray = path.split( "/" );
            pathArray.shift();
        let top = pathArray[ 0 ];
        if( top === "trailers" )
        {
            this.trailersFilter = pathArray[ 1 ];
            this.trailersSubFilter = pathArray[ 2 ];
            this.loadListData( path  + "/" + this.currentSortOrder );
        }    
    }
    loadDataFromBottomNavigationPath( path )
    {
        let loadPath;
        if( path === Paths.TRAILERS )
        {
            loadPath = path + "/" + this.trailersFilter + "/" + this.trailersSubFilter + "/" + this.currentSortOrder;
        }
        else if( path === Paths.MOVIES )
        {
            loadPath = path + "/" + this.moviesFilter + "/" + this.moviesSubFilter + "/" + this.currentSortOrder;
        }
        else if( path === Paths.ACTORS )
        {
            loadPath = path + "/" + this.actorsFilter + "/" + this.actorsSubFilter + "/" + this.currentSortOrder;
        }
        if( loadPath )
        {
            this.loadListData( loadPath );
        }
    }
    loadListData( path )
    {
        if( !this.listsData[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.listsDataLoader.load( url );
        }
        else
        {
            let listChunk = this.listsData[ path ];
            this.setProperty( listChunk.view, Properties.DATA_PROVIDER, listChunk.collection );
        }
    }
    listsDataComplete( data )
    {
        if( data )
        {
            let listChunk;
            if( !this.listsData[ data.path ] )
            {
                listChunk = {};
                listChunk.view = data.view;
                listChunk.index = data.index;
                listChunk.total = data.total;
                listChunk.collection = new ArrayCollection( data.items );
                this.listsData[ data.path ] = listChunk;
            }
            else
            {
                listChunk = this.listsData[ data.path ];
                listChunk.index++;
                listChunk.collection.addItems( data.items );
            }
            if( data.path.indexOf( Paths.TRAILERS ) != -1 )
            {
                this.setProperty( UIDS.TRAILERS_LIST, Properties.DATA_PROVIDER, listChunk.collection );
            }
            else if( data.path.indexOf( Paths.MOVIES ) != -1 )
            {
                this.setProperty( UIDS.MOVIES_LIST, Properties.DATA_PROVIDER, listChunk.collection );
            }
            else if( data.path.indexOf( Paths.ACTORS )!= -1 )
            {
                this.setProperty( UIDS.ACTORS_LIST, Properties.DATA_PROVIDER, listChunk.collection );
            }
        }
    }
    get listsData()
    {
        if( !this._listsData )
        {
            this._listsData = {};
        }
        return this._listsData;
    }
    get listsDataLoader()
    {
        if( !this._listsDataLoader )
        {
            this._listsDataLoader = new JSONLoader();
            this._listsDataLoader.listen( EventTypes.LOAD_COMPLETE, this.listsDataComplete.bind( this ) );
        }
        return this._listsDataLoader;
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
        if( path === Paths.ROOT || path === Paths.TRAILERS )
        {
            let loadPath = "/" + Paths.TRAILERS + "/" + this.trailersFilter + "/" + this.trailersSubFilter + "/" + this.currentSortOrder;
            this.loadListData( loadPath );
        }
    }
}