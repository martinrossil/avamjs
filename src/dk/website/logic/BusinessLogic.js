import UIDS from "../app/consts/UIDS.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Events from "../app/consts/Events.js";
import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import Util from "../app/utils/Util.js";
import Properties from "../app/consts/Properties.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import Paths from "../app/consts/Paths.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
export default class BusinessLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        this.addIconButtonsListeners();
        this.setDrawersListsSelectedIndexes();
        window.addEventListener( Events.POP_STATE, this.popped.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    pathChanged( path )
    {
        this.setTitle( path );
        this.setBottomBarAndScreenIndex( path );
        this.showHideDrawers( path );
        this.setSelectedIndexInDrawers( path );
        this.loadDrawerDataIfNeeded( path );
    }
    applicationLoadComplete()
    {
        this.pathChanged( window.location.pathname );
    }
    popped()
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
            if( path !== window.location.pathname )
            {
                this.pathChanged( path );
                history.pushState( null, null, path );
            }
        }
    }
    setTitle( path )
    {
        let title = Util.getTitleFromPath( path );
        document.title = title;
        this.setProperty( UIDS.APP_BAR, Properties.TITLE, title );
    }
    setBottomBarAndScreenIndex( path )
    {
        let index = Util.getTopNavigationIndexFromPath( path );
        this.setProperty( UIDS.BOTTOM_NAVIGATION_BAR, Properties.SELECTED_INDEX, index );
        this.setProperty( UIDS.SCREENS_NAVIGATOR, Properties.SELECTED_INDEX, index );
        this.setIconButtonsVisibility( index );
    }
    showHideDrawers( path )
    {
        if( path === Paths.TRAILERS_FILTER )
        {
            this.showDrawer( UIDS.TRAILERS_DRAWER );
        }
    }
    setSelectedIndexInDrawers( path )
    {
        let trailersFilterIndex = Util.getTrailersFilterListIndexFromPath( path );
        this.setProperty( UIDS.TRAILERS_FILTER_LIST, Properties.SELECTED_INDEX, trailersFilterIndex );
        let moviesFilterIndex = Util.getMoviesFilterListIndexFromPath( path );
        this.setProperty( UIDS.MOVIES_FILTER_LIST, Properties.SELECTED_INDEX, moviesFilterIndex );
        this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.IS_VISIBLE, trailersFilterIndex === 0 );
        this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.IS_VISIBLE, trailersFilterIndex === 1 );
    }
    setIconButtonsVisibility( index )
    {
        this.setProperty( UIDS.TRAILERS_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 0 );
        this.setProperty( UIDS.TRAILERS_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 0 );
        this.setProperty( UIDS.MOVIES_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 1 );
        this.setProperty( UIDS.MOVIES_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 1 );
        this.setProperty( UIDS.ACTORS_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 2 );
        this.setProperty( UIDS.ACTORS_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 2 );
    }
    addIconButtonsListeners()
    {
        this.drawerClosed = this.drawerClosed.bind( this );
        //this.listen( UIDS.TRAILERS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.TRAILERS_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.MOVIES_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.moviesDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.MOVIES_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.ACTORS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.actorsDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.ACTORS_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.OVERLAY, EventTypes.TRIGGERED, this.drawerClosed );
    }
    trailersDrawerIconButtonTriggered() 
    {
        this.showDrawer(  UIDS.TRAILERS_DRAWER );
        this.loadDrawerData( Paths.TRAILERS + this.selectedTrailersFilter );
    }
    moviesDrawerIconButtonTriggered() 
    {
        this.showDrawer(  UIDS.MOVIES_DRAWER );
        this.loadDrawerData( Paths.MOVIES + this.selectedMoviesFilter );
    }
    actorsDrawerIconButtonTriggered()
    {
        this.showDrawer(  UIDS.ACTORS_DRAWER );
        this.loadDrawerData( Paths.ACTORS + this.selectedActorsFilter );
    }
    showDrawer( uid )
    {
        this.setProperty( UIDS.OVERLAY, Properties.IS_SHOWN, true );
        this.setProperty( uid, Properties.IS_SHOWN, true );
    }
    drawerClosed()
    {
        history.back();
        this.setProperty( UIDS.OVERLAY, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.TRAILERS_DRAWER, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.MOVIES_DRAWER, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.ACTORS_DRAWER, Properties.IS_SHOWN, false );
    }
    loadDrawerDataIfNeeded( path )
    {
        if( path === Paths.TRAILERS_GENRER )
        {
            this.loadDrawerData( path );
        }
        else if( path === Paths.TRAILERS_COUNTRIES )
        {
            this.loadDrawerData( path );
        }
        else if( path === Paths.MOVIES_GENRER )
        {
            this.loadDrawerData( path );
        }
        else if( path === Paths.MOVIES_COUNTRIES )
        {
            this.loadDrawerData( path );
        }
    }
    loadDrawerData( path )
    {
        if( !this.drawersData[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.drawersDataLoader.load( url );
        }
    }
    drawersDataComplete( data )
    {
        if( data )
        {
            let path = data.path;
            if( !this.drawersData[ path ] )
            {
                this.drawersData[ path ] = new ArrayCollection( data.items );
            }
            this.setDrawerListDataProvider( path, this.drawersData[ path ] );
        }
    }
    setDrawerListDataProvider( path, arrayCollection )
    {
        if( path === Paths.TRAILERS_GENRER )
        {
            this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.DATA_PROVIDER, arrayCollection );
        }
        else if( path === Paths.TRAILERS_COUNTRIES )
        {
            this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.DATA_PROVIDER, arrayCollection );
        }
        else if( path === Paths.MOVIES_GENRER )
        {
            this.setProperty( UIDS.MOVIES_GENRES_LIST, Properties.DATA_PROVIDER, arrayCollection );
        }
        else if( path === Paths.MOVIES_COUNTRIES )
        {
            this.setProperty( UIDS.MOVIES_COUNTRIES_LIST, Properties.DATA_PROVIDER, arrayCollection );
        }
        else if( path === Paths.ACTORS_COUNTRIES )
        {
            this.setProperty( UIDS.ACTORS_COUNTRIES_LIST, Properties.DATA_PROVIDER, arrayCollection );
        }
    }
    get drawersData()
    {
        if( !this._drawersData )
        {
            this._drawersData = {};
        }
        return this._drawersData;
    }
    get drawersDataLoader()
    {
        if( !this._drawersDataLoader )
        {
            this._drawersDataLoader = new JSONLoader();
            this._drawersDataLoader.listen( EventTypes.LOAD_COMPLETE, this.drawersDataComplete.bind( this ) );
        }
        return this._drawersDataLoader;
    }
    setDrawersListsSelectedIndexes()
    {
        this.selectedTrailersFilter = Paths.GENRER;
        this.selectedMoviesFilter = Paths.GENRER;
        this.selectedActorsFilter = Paths.COUNTRIES;
    }
}