import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import UIDS from "../app/consts/UIDS.js";
import Events from "../app/consts/Events.js";
import Paths from "../app/consts/Paths.js";
export default class DrawersDataLoadLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.TRAILERS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.MOVIES_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.moviesDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.ACTORS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.actorsDrawerIconButtonTriggered.bind( this ) );
        window.addEventListener( Events.POP_STATE, this.popped.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    trailersDrawerIconButtonTriggered()
    {
        let path = Paths.TRAILERS_GENRER;
        this.loadPath( path );
    }
    moviesDrawerIconButtonTriggered()
    {
        let path = Paths.MOVIES_GENRER;
        this.loadPath( path );
    }
    actorsDrawerIconButtonTriggered()
    {
        let path = Paths.ACTORS_COUNTRIES;
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
                let index = path === "/trailers/genrer" ? 0 : 1;
                this.setProperty( "trailersFilterList", "selectedIndex", index );
            }
            
            this.setProperty( "trailersGenresList", "isVisible", path === "/trailers/genrer" );
            this.setProperty( "trailersCountriesList", "isVisible", path === "/trailers/lande" );
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
        if( path === "/trailers/genrer" )
        {
            listUid = "trailersGenresList";
        }
        else if( path === "/trailers/lande" )
        {
            listUid = "trailersCountriesList";
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