import Logic from "../../ava/logic/Logic.js";
import Events from "../app/consts/Events.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import Properties from "../app/consts/Properties.js";
import Paths from "../app/consts/Paths.js";
import UIDS from "../app/consts/UIDS.js";
export default class DrawerDataProviderLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
    }
    clicked( e )
    {
        let linkIconButton = ClickTargetUtil.getLinkIconButtonFromTarget( e.target );
        let path;
        if( linkIconButton )
        {
            path = linkIconButton.href;
            this.loadDrawerData( path );
        }
        else
        {
            let filterItemRenderer = ClickTargetUtil.getFilterItemRendererFromTarget( e.target );
            if( filterItemRenderer )
            {
                path = filterItemRenderer.data.h;
                this.setSelectedFilterTypeFromPath( path );
                this.loadDrawerData( path );
            }
            else
            {
                let linkItemRenderer = ClickTargetUtil.getLinkItemRendererFromTarget( e.target );
                if( linkItemRenderer )
                {
                    this.setSelectedSubFilterFromData( linkItemRenderer.data );
                }
            }
        }
    }
    setSelectedSubFilterFromData( data )
    {
        let path = data.h;    
        let pathArray = path.split( "/" );
            pathArray.shift();
        let arrayCollectionPath = "/" + pathArray[ 0 ] + "/" + pathArray[ 1 ];
        if( this.drawersData[ arrayCollectionPath ] )
        {
            let arrayCollection = this.drawersData[ arrayCollectionPath ];
            let selectedIndex = arrayCollection.getItemIndex( data );
            if( path.indexOf( Paths.TRAILERS_GENRER ) != -1 )
            {
                this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.SELECTED_INDEX, selectedIndex );
                this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.SELECTED_INDEX, -1 );
            }
            else if( path.indexOf( Paths.TRAILERS_COUNTRIES ) != -1 )
            {
                this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.SELECTED_INDEX, -1 );
                this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.SELECTED_INDEX, selectedIndex );
            }
        }
    }
    setSelectedFilterTypeFromPath( path )
    {
        let filterListUid;
        let filterIndex;
        if( path.indexOf( Paths.TRAILERS ) != -1 )
        {
            filterListUid = UIDS.TRAILERS_FILTER_LIST;
            filterIndex = path === Paths.TRAILERS_GENRER ? 0 : 1;
        }
        else if( path.indexOf( Paths.MOVIES ) != -1 )
        {
            filterListUid = UIDS.MOVIES_DRAWER_LIST;
        }
        else if( path.indexOf( Paths.ACTORS ) != -1 )
        {
            filterListUid = UIDS.ACTORS_DRAWER_LIST;
        }
        if( filterListUid && filterIndex !== undefined )
        {
            this.setProperty( filterListUid, Properties.SELECTED_INDEX, filterIndex );
        }
    }
    loadDrawerData( path )
    {
        if( !this.drawersData[ path ] )
        {
            let url = window.location.origin + "/data" + path + "/0.json";
            this.drawersDataLoader.load( url );
        }
        else
        {
            let arrayCollection = this.drawersData[ path ];
            this.setDataProviderFromPath( arrayCollection, path );
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
            this.setDataProviderFromPath( this.drawersData[ path ], path );
        }
    }
    setDataProviderFromPath( arrayCollection, path )
    {
        let drawerlistUid;
        if( path.indexOf( Paths.TRAILERS_GENRER ) != -1 )
        {
            drawerlistUid = UIDS.TRAILERS_GENRES_LIST;
            this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.IS_VISIBLE, false );
            this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.IS_VISIBLE, true );
        }
        else if( path.indexOf( Paths.TRAILERS_COUNTRIES ) != -1 )
        {
            drawerlistUid = UIDS.TRAILERS_COUNTRIES_LIST;
            this.setProperty( UIDS.TRAILERS_COUNTRIES_LIST, Properties.IS_VISIBLE, true );
            this.setProperty( UIDS.TRAILERS_GENRES_LIST, Properties.IS_VISIBLE, false );
        }
        else if( path.indexOf( Paths.MOVIES ) != -1 )
        {
            drawerlistUid = UIDS.MOVIES_DRAWER_LIST;
        }
        else if( path.indexOf( Paths.ACTORS ) != -1 )
        {
            drawerlistUid = UIDS.ACTORS_DRAWER_LIST;
        }
        if( drawerlistUid )
        {
            this.setProperty( drawerlistUid, Properties.DATA_PROVIDER, arrayCollection );
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