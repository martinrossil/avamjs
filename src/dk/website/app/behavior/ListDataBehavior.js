import BaseBehavior from "./base/BaseBehavior.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import Filters from "../consts/Filters.js";
import SortOrder from "../consts/SortOrder.js";
import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
export default class ListDataBehavior extends BaseBehavior
{
    constructor()
    {
        super();
        this.setInitialFilters();
        this.listen( UIDS.MOVIES_LIST, EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.moviesListIsOnLastScreenChanged.bind( this ) );
        this.listen( UIDS.TRAILERS_LIST, EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.trailersListIsOnLastScreenChanged.bind( this ) );
        this.listen( UIDS.ACTORS_LIST, EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.actorsListIsOnLastScreenChanged.bind( this ) );
    }
    trailersListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = Paths.TRAILERS + this.trailersFilter + this.trailersSubFilter + SortOrder.NEWEST;
            this.loadNextChunk( path );
        }
    }
    moviesListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = Paths.MOVIES + this.moviesFilter + this.moviesSubFilter + SortOrder.NEWEST;
            this.loadNextChunk( path );
        }
    }
    actorsListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = Paths.ACTORS + this.actorsFilter + this.actorsSubFilter + SortOrder.NEWEST;
            this.loadNextChunk( path );
        }
    }
    loadNextChunk( path )
    {
        if( this.listsData[ path ] )
        {
            let listChunk = this.listsData[ path ];
            if( listChunk.index < listChunk.total - 1 )
            {
                let url = window.location.origin + "/data" + path + "/" + ( listChunk.index + 1 ) + ".json";
                this.listsDataLoader.load( url );
            }
        }
    }
    trailersGenresItemSelected( data )
    {
        if( data )
        {
            let path = data.h + SortOrder.NEWEST;
            this.loadListData( path );
            this.hideFilterDrawer();
        }
    }
    pathChanged( path )
    {
        this.loadTopLevelData( path );
        let pathArray = path.split( "/" );
            pathArray.shift();
        if( pathArray.length === 3 )
        {
            this.setFilterValues( path, pathArray[ 1 ], pathArray[ 2 ] );
            this.loadListData( path + SortOrder.NEWEST );
        }
    }
    loadTopLevelData( path )
    {
        if( path === Paths.ROOT || path === Paths.TRAILERS )
        {
            this.loadListData( Paths.TRAILERS + this.trailersFilter + this.trailersSubFilter + SortOrder.NEWEST );
        }
        else if( path === Paths.MOVIES )
        {
            this.loadListData( Paths.MOVIES + this.moviesFilter + this.moviesSubFilter + SortOrder.NEWEST );
        }
        else if( path === Paths.ACTORS )
        {
            this.loadListData( Paths.ACTORS + this.actorsFilter + this.actorsSubFilter + SortOrder.NEWEST );
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
            let arrayCollection = listChunk.collection;
            this.setDataProvider( path, arrayCollection );
        }
    }
    hideFilterDrawer()
    {
        this.setProperty( UIDS.OVERLAY, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.FILTERS_DRAWER, Properties.IS_SHOWN, false );
    }
    listsDataComplete( data )
    {
        if( data )
        {
            let listChunk;
            let path = data.path;
            if( !this.listsData[ path ] )
            {
                listChunk = {};
                listChunk.index = data.index;
                listChunk.total = data.total;
                listChunk.collection = new ArrayCollection( data.items );
                this.listsData[ path ] = listChunk;
            }
            else
            {
                listChunk = this.listsData[ path ];
                listChunk.index++;
                listChunk.collection.addItems( data.items );
            }
            this.setDataProvider( path, listChunk.collection );
        }
    }
    setDataProvider( path, arrayCollection )
    {
        let uid;
        if( path.indexOf( Paths.TRAILERS ) === 0 )
        {
            uid = UIDS.TRAILERS_LIST;
        }
        else if( path.indexOf( Paths.MOVIES ) === 0 )
        {
            uid = UIDS.MOVIES_LIST;
        }
        else if( path.indexOf( Paths.ACTORS ) === 0 )
        {
            uid = UIDS.ACTORS_LIST;
        }
        if( uid )
        {
            this.setProperty( uid, Properties.DATA_PROVIDER, arrayCollection );
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
    setFilterValues( path, filter, sub )
    {
        if( path.indexOf( Paths.TRAILERS ) === 0 )
        {
            this.trailersFilter = "/" + filter;
            this.trailersSubFilter = "/" + sub;
        }
        else if( path.indexOf( Paths.MOVIES ) === 0 )
        {
            this.moviesFilter = "/" + filter;
            this.moviesSubFilter = "/" + sub;
        }
        else if( path.indexOf( Paths.ACTORS ) === 0 )
        {
            this.actorsFilter = "/" + filter;
            this.actorsSubFilter = "/" + sub;
        }
    }
    setInitialFilters()
    {
        this.trailersFilter     = Filters.GENRES;
        this.trailersSubFilter  = Filters.ALL;
        this.moviesFilter       = Filters.GENRES;
        this.moviesSubFilter    = Filters.ALL;
        this.actorsFilter       = Filters.COUNTRIES;
        this.actorsSubFilter    = Filters.ALL;
    }
}