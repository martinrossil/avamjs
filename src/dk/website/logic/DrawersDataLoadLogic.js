import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import UIDS from "../app/UIDS.js";
export default class DrawersDataLoadLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.TRAILERS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( "moviesDrawerIconButton", EventTypes.TRIGGERED, this.moviesDrawerIconButtonTriggered.bind( this ) );
        this.listen( "actorsDrawerIconButton", EventTypes.TRIGGERED, this.actorsDrawerIconButtonTriggered.bind( this ) );
        window.addEventListener( "popstate", this.popped.bind( this ) );
        document.addEventListener( "click", this.clicked.bind( this ) );
    }
    trailersDrawerIconButtonTriggered()
    {
        let path = "/trailers/genrer";
        this.loadPath( path );
    }
    moviesDrawerIconButtonTriggered()
    {
        let path = "/film/genrer";
        this.loadPath( path );
    }
    actorsDrawerIconButtonTriggered()
    {
        let path = "/skuespillere/lande";
        this.loadPath( path );
    }
    popped()
    {
        let path = window.location.pathname;
        this.loadPath( path );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            if( path === "/trailers/genrer" || path === "/trailers/lande" )
            {
                this.loadPath( path );
            }
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
            let data = this.loadedPaths[ path ];
            this.setViewData( path, data );
        }
    }
    setViewData( path, data )
    {
        let listUid;
        if( path === "/trailers/genrer" || path === "/trailers/lande" )
        {
            listUid = "trailersDrawerList";
        }
        else if( path === "/film/genrer" || path === "/film/lande" )
        {
            listUid = "movieDrawerList";
        }
        else if( path === "/skuespillere/lande" )
        {
            listUid = "actorsDrawerList";
        }
        if( listUid )
        {
            this.setProperty( listUid, "dataProvider", data );
        }
    }
    loadComplete( data )
    {
        if( data )
        {
            let path = data.path;
            if( !this.loadedPaths[ path ] )
            {
                this.loadedPaths[ path ] = new ArrayCollection( data.items );
            }
            this.setViewData( path, this.loadedPaths[ path ] );
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