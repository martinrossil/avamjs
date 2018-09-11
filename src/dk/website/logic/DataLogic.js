import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import UIDS from "../app/UIDS.js";
export default class DataLogic extends Logic
{
    constructor()
    {
        super();
        this.currentFilter = "genrer";
        this.currentChildFilter = "alle";
        this.currentSort = "nyeste";
        document.addEventListener( "click", this.clicked.bind( this ) );
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
    }
    applicationLoadComplete()
    {
        this.pathChanged( window.location.pathname );  
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            this.pathChanged( path );
        }
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        let len = pathArray.length;
        if( len === 1 )
        {
            this.loadTopLevel( pathArray );
        }
        else if( len === 2 )
        {
            this.loadFilter( pathArray );
        }
        else if( len === 3 )
        {
            this.loadChildFilter( pathArray );
        }
        else if( len === 4 )
        {
            this.loadSelectedChildFilter( pathArray );
        }
    }
    loadSelectedChildFilter( pathArray )
    {
        let top = pathArray[ 0 ];
        let path = "/" + top  + "/filter/" + pathArray[ 2 ] + "/" + pathArray[ 3 ] + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.jsonLoader.load( url );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            this.setViewData( chunksObject );
        }
    }
    loadFilter( pathArray )
    {
        let top = pathArray[ 0 ];
        let path = "/" + top + "/filter/" + this.currentFilter;
        if( !this.loadedPaths[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.jsonLoader.load( url );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            this.setViewData( chunksObject );
        }
    }
    loadChildFilter( pathArray )
    {
        let top = pathArray[ 0 ];
        let path = "/" + top + "/filter/" + pathArray[ 2 ];
        if( !this.loadedPaths[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.jsonLoader.load( url, window.location.path );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            this.setViewData( chunksObject );
        }
    }
    loadTopLevel( pathArray )
    {
        let top = pathArray[ 0 ];
        if( !top )
        {
            top = "trailers";
        }
        if( top === "skuespillere" )
        {
            this.currentFilter = "lande";
        }
        else
        {
            this.currentFilter = "genrer";
        }
        let path = "/" + top + "/filter/" + this.currentFilter + "/" + this.currentChildFilter + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "data" + path + "/0.json" );
        }
    }
    loadComplete( data )
    {
        if( data )
        {
            let chunksObject;
            if( !this.loadedPaths[ data.path ] )
            {
                chunksObject = {};
                chunksObject.view = data.view;
                chunksObject.filterView = data.filterView;
                chunksObject.filterIndex = data.filterIndex;
                chunksObject.index = data.index;
                chunksObject.total = data.total;
                chunksObject.collection = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = chunksObject;
            }
            else
            {
                chunksObject = this.loadedPaths[ data.path ];
                chunksObject.index++;
                chunksObject.collection.addItems( data.items );
            }
            this.setViewData( chunksObject );
        }
    }
    setViewData( chunksObject )
    {
        if( chunksObject.view )
        {
            this.setProperty( chunksObject.view, "dataProvider", chunksObject.collection )
        }
        if( chunksObject.filterView && chunksObject.filterIndex !== undefined )
        {
            this.setProperty( chunksObject.filterView, "selectedIndex", chunksObject.filterIndex );
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