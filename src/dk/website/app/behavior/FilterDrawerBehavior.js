import BaseBehavior from "./base/BaseBehavior.js";
import UIDS from "../consts/UIDS.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import Properties from "../consts/Properties.js";
import Filters from "../consts/Filters.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
import ArrayCollection from "../../../ava/data/ArrayCollection.js";
import Paths from "../consts/Paths.js";
import PathUtil from "../utils/PathUtil.js";
export default class FilterDrawerBehavior extends BaseBehavior
{
    constructor()
    {
        super();
        this.currentTopIndex = -1;
        this.listen( UIDS.OPEN_FILTER_BUTTON, EventTypes.TRIGGERED, this.openFilterButtonTriggered.bind( this ) );
        this.listen( UIDS.OVERLAY, EventTypes.TRIGGERED, this.overlayTriggered.bind( this ) );
        this.listen( UIDS.CLOSE_FILTER_MENU, EventTypes.TRIGGERED, this.closeFilterMenuTriggered.bind( this ) );
        this.listen( UIDS.TRAILERS_FILTER_LIST, EventTypes.SELECTED_ITEM_CHANGED, this.selectedTrailerFilterChanged.bind( this ) );
        this.listen( UIDS.MOVIES_FILTER_LIST, EventTypes.SELECTED_ITEM_CHANGED, this.selectedMovieFilterChanged.bind( this ) );
        this.listen( UIDS.ACTORS_FILTER_LIST, EventTypes.SELECTED_ITEM_CHANGED, this.selectedActorFilterChanged.bind( this ) );
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        const len = pathArray.length;
        if( len === 3 )
        {
            this.setSelectedIndexAndClose( pathArray );
        }
        this.setFilterScreenIndex( path );
    }
    setFilterScreenIndex( path )
    {
        this.currentTopIndex = PathUtil.getTopNavigationIndex( path );
        this.setProperty( UIDS.FILTER_SCREENS_NAVIGATOR, Properties.SELECTED_INDEX, this.currentTopIndex );
    }
    setSelectedIndexAndClose( pathArray )
    {
        let p = "/" + pathArray[ 0 ] + "/" + pathArray[ 1 ];
        let itemIndex = this.getItemIndexFromPath( p, pathArray[ 2 ] );
        if( itemIndex !== -1 )
        {
            let uid = PathUtil.getFilterListUid( p );
            if( uid )
            {
                this.setProperty( uid, Properties.SELECTED_INDEX, itemIndex );
                this.unSelectOtherFilterList( uid );
                this.isFilterDrawerShown( false );
            }
        }
    }
    unSelectOtherFilterList( uid )
    {
        let other;
        if( uid === UIDS.TRAILERS_GENRES_LIST )
        {
            other = UIDS.TRAILERS_COUNTRIES_LIST;
        }
        else if( uid === UIDS.TRAILERS_COUNTRIES_LIST )
        {
            other = UIDS.TRAILERS_GENRES_LIST;
        }
        else if( uid === UIDS.MOVIES_GENRES_LIST )
        {
            other = UIDS.MOVIES_COUNTRIES_LIST;
        }
        else if( uid === UIDS.MOVIES_COUNTRIES_LIST )
        {
            other = UIDS.MOVIES_GENRES_LIST;
        }
        if( other )
        {
            this.setProperty( other, Properties.SELECTED_INDEX, -1 );
        }
    }
    getItemIndexFromPath( path, sub )
    {
        if( this.drawersData[ path ] )
        {
            let arrayCollection = this.drawersData[ path ];
            if( arrayCollection )
            {
                path += "/" + sub;
                return this.getItemIndexFromArrayCollection( path, arrayCollection );
            }
        }
        return -1;
    }
    getItemIndexFromArrayCollection( path, arrayCollection )
    {
        let i = 0;
        const arrayData = arrayCollection.arrayData;
        const len = arrayData.length;
        let item;
        for( ; i < len; i++ )
        {
            item = arrayData[ i ];
            if( item.h === path )
            {
                return i;
            }
        }
        return -1;
    }
    selectedTrailerFilterChanged( data )
    {
        if( data )
        {
            let path = data.h;
            this.loadFilterData( path );
            let screenIndex = path === Paths.TRAILERS_GENRES ? 0 : 1;
            this.setProperty( UIDS.TRAILERS_FILTERS_SCREEN_NAVIGATOR, Properties.SELECTED_INDEX, screenIndex );
        }
    }
    selectedMovieFilterChanged( data )
    {
        if( data )
        {
            let path = data.h;
            this.loadFilterData( path );
            let screenIndex = path === Paths.MOVIES_GENRES ? 0 : 1;
            this.setProperty( UIDS.MOVIES_FILTERS_SCREEN_NAVIGATOR, Properties.SELECTED_INDEX, screenIndex );
        }
    }
    selectedActorFilterChanged( data )
    {
        if( data )
        {
            let path = data.h;
            this.loadFilterData( path );
            let screenIndex = path === Paths.ACTORS_COUNTRIES ? 0 : 1;
            this.setProperty( UIDS.ACTORS_FILTERS_SCREEN_NAVIGATOR, Properties.SELECTED_INDEX, screenIndex );
        }
    }
    loadFilterData( path )
    {
        if( !this.drawersData[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.drawersDataLoader.load( url );
        }
    }
    openFilterButtonTriggered()
    {
        this.isFilterDrawerShown( true );
        if( this.currentTopIndex === 0 )
        {
            let path = Paths.TRAILERS + Filters.GENRES;
            if( !this.drawersData[ path ] )
            {
                this.setProperty( UIDS.TRAILERS_FILTER_LIST, Properties.SELECTED_INDEX, 0 );
                this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.SELECTED_INDEX, 0 );
            }
        }
        else if( this.currentTopIndex === 1 )
        {
            let path = Paths.MOVIES + Filters.GENRES;
            if( !this.drawersData[ path ] )
            {
                this.setProperty( UIDS.MOVIES_FILTER_LIST, Properties.SELECTED_INDEX, 0 );
                this.setProperty( UIDS.MOVIES_GENRES_LIST, Properties.SELECTED_INDEX, 0 );
            }
        }
        else if( this.currentTopIndex === 2 )
        {
            let path = Paths.ACTORS + Filters.COUNTRIES;
            if( !this.drawersData[ path ] )
            {
                this.setProperty( UIDS.ACTORS_FILTER_LIST, Properties.SELECTED_INDEX, 0 );
                this.setProperty( UIDS.ACTORS_COUNTRIES_LIST, Properties.SELECTED_INDEX, 0 );
            }
        }
    }
    overlayTriggered()
    {
        this.isFilterDrawerShown( false );
    }
    closeFilterMenuTriggered()
    {
        this.isFilterDrawerShown( false );
    }
    isFilterDrawerShown( isShown )
    {
        this.setProperty( UIDS.OVERLAY, Properties.IS_SHOWN, isShown );
        this.setProperty( UIDS.FILTERS_DRAWER, Properties.IS_SHOWN, isShown );
    }
    drawersDataComplete( data )
    {
        if( data )
        {
            let path = data.path;
            if( !this.drawersData[ path ] )
            {
                let arrayCollection = new ArrayCollection( data.items );
                this.drawersData[ path ] = arrayCollection;
                this.setDataProvider( path, arrayCollection );
            }
        }
    }
    setDataProvider( path, arrayCollection )
    {
        let uid;
        if( path === Paths.TRAILERS_GENRES )
        {
            uid = UIDS.TRAILERS_GENRES_LIST;
        }
        else if( path === Paths.TRAILERS_COUNTRIES )
        {
            uid = UIDS.TRAILERS_COUNTRIES_LIST;
        }
        else if( path === Paths.MOVIES_GENRES )
        {
            uid = UIDS.MOVIES_GENRES_LIST;
        }
        else if( path === Paths.MOVIES_COUNTRIES )
        {
            uid = UIDS.MOVIES_COUNTRIES_LIST;
        }
        else if( path === Paths.ACTORS_COUNTRIES )
        {
            uid = UIDS.ACTORS_COUNTRIES_LIST;
        }
        if( uid )
        {
            this.setProperty( uid, Properties.DATA_PROVIDER, arrayCollection );
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
}