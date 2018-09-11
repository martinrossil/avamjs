import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import UIDS from "../app/UIDS.js";
export default class ListsDataLoadLogic extends Logic
{
    constructor()
    {
        super();

        this.trailersFilter         = "genrer";
        this.trailersSelectedFilter = "alle";
        this.moviesFilter           = "genrer";
        this.moviesSelectedFilter   = "alle";
        this.actorsFilter           = "lande";
        this.actorsSelectedFilter   = "alle";
        this.currentSort            = "nyeste";
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.alc.bind( this ) );
        document.addEventListener( "click", this.clicked.bind( this ) );
    }
    alc()
    {
        if(  window.location.pathname === "/" )
        {
            this.pathChanged( "/trailers" );
        }
        else
        {
            this.pathChanged( window.location.pathname );
        }
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            this.pathChanged( aTag.pathname );
        }
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
        pathArray.shift();
        this.loadFromPathArray( pathArray );
    }
    loadFromPathArray( pathArray )
    {
        let len = pathArray.length;
        if( len === 1 )
        {
            this.loadTopLevel( "/" + pathArray[ 0 ] );
        }
        else if( len === 2 )
        {
            this.loadFilterLevel( pathArray[ 0 ], pathArray[ 1 ] );
        }
        else if( len === 3 )
        {
            this.loadSelectedFilterLevel( pathArray[ 0 ], pathArray[ 1 ], pathArray[ 2 ] );
        }
        console.log( pathArray, len );
    }
    loadFilterLevel( top, filter )
    {
        console.log( top, filter );
        if( top === "trailers" )
        {
            this.trailersFilter = filter;
        }
        else if( top === "film" )
        {
            this.moviesFilter = filter;
        }
        else if( top === "skuespillere" )
        {
            this.actorsFilter = filter;
        }
    }
    loadSelectedFilterLevel( top, filter, selected )
    {
        console.log( top, filter, selected );
        if( top === "trailers" )
        {
            this.trailersFilter = filter;
            this.trailersSelectedFilter = selected;
        }
        else if( top === "film" )
        {
            this.moviesFilter = filter;
            this.moviesSelectedFilter = selected;
        }
        else if( top === "skuespillere" )
        {
            this.actorsFilter = filter;
            this.actorsSelectedFilter = selected;
        }
        this.loadPath( "/" + top + "/" + filter + "/" + selected + "/" + this.currentSort );
    }
    loadTopLevel( top )
    {
        if( top === "/trailers" )
        {
            top += "/" + this.trailersFilter + "/" + this.trailersSelectedFilter;
        }
        else if( top === "/film" )
        {
            top += "/" + this.moviesFilter + "/" + this.moviesSelectedFilter;
        }
        else if( top === "/skuespillere" )
        {
            top += "/" + this.actorsFilter + "/" + this.actorsSelectedFilter;
        }
        this.loadPath( top + "/" + this.currentSort );
    }
    setViewData( path, data )
    {
        let listUid;
        if( path.indexOf( "/trailers" ) != -1 )
        {
            listUid = "trailersList";
        }
        else if( path.indexOf( "/film" ) != -1 )
        {
            listUid = "moviesList";
        }
        else if( path.indexOf( "/skuespillere" ) != -1 )
        {
            listUid = "actorsList";
        }
        if( listUid )
        {
            this.setProperty( listUid, "dataProvider", data );
        }
    }
    loadPath( path )
    {
        if( !this.loadedPaths[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.jsonLoader.load( url );
        }
        else
        {
            let listData = this.loadedPaths[ path ];
            this.setViewData( path, listData.items );
        }
    }
    loadComplete( data )
    {
        if( data )
        {
            let path = data.path;
            let listData;
            if( !this.loadedPaths[ path ] )
            {
                listData = {};
                listData.index = data.index;
                listData.total = data.total;
                listData.items = new ArrayCollection( data.items );
                this.loadedPaths[ path ] = listData;
            }
            else
            {
                listData = this.loadedPaths[ path ];
                listData.index++;
                listData.items.addItems( data.items );
            }
            this.setViewData( path, listData.items );
        }
    }
    get jsonLoader()
    {
        if( !this._jsonLoader )
        {
            this._jsonLoader = new JSONLoader();
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.loadComplete.bind( this ) );
        }
        return this._jsonLoader;
    }
    get loadedPaths()
    {
        if( !this._loadedPaths )
        {
            this._loadedPaths = {};
        }
        return this._loadedPaths;
    }
} 