// @ts-check
import ApplicationElement from "../../ava/components/application/ApplicationElement.js";
import Theme from "../../ava/styles/Theme.js";
import Colors from "../../ava/styles/Colors.js";
import AnchorLayoutData from "../../ava/layouts/data/AnchorLayoutData.js";
import AnchorLayout from "../../ava/layouts/AnchorLayout.js";
import BottomNavigationBar from "../../ava/components/bars/BottomNavigationBar.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import BottomNavigationBarItemRenderer from "../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
import IconNames from "../../ava/constants/IconNames.js";
import ScreensNavigator from "../../ava/screens/ScreensNavigator.js";
import TrailersScreen from "./screens/TrailersScreen.js";
import MoviesScreen from "./screens/MoviesScreen.js";
import ActorsScreen from "./screens/ActorsScreen.js";
import TrailerDialog from "./dialogs/TrailerDialog.js";
import AvaAppBar from "./bars/AvaAppBar.js";
import ScrimElement from "../../ava/components/dialogs/ScrimElement.js";
import UIDS from "./consts/UIDS.js";
import Config from "./consts/Config.js";
import FiltersDrawer from "./drawers/FiltersDrawer.js";
import MovieDialog from "./dialogs/MovieDialog.js";
import AppBehavior from "./behavior/AppBehavior.js";
import ActorDialog from "./dialogs/ActorDialog.js";
import EventTypes from "../../ava/constants/EventTypes.js";
export default class AvaApp extends ApplicationElement
{
    constructor()
    {
        super();
        performance.mark( "AppStart" );

        this.uid = UIDS.APP;
    }
    appLoadComplete( e )
    {
        this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
        return;
        if( "serviceWorker" in navigator )
        {
            this.registerServiceWorker();
        }
        else
        {
            console.log( "Service worker NOT supported" );
            this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
        }
    }
    registerServiceWorker()
    {
        navigator.serviceWorker.register('ServiceWorker.0.5.3.js')
            .then( ( registration ) =>
            {
                if( !registration.active && registration.installing )
                {
                    console.log( "First time visit, no Service Worker detected." );
                    console.log( "Installing new Service Worker now." );
                    this.addStateChangeListener( registration.installing );
                }
                else if( registration.active && registration.installing )
                {
                    console.log( "Found existing Service Worker" );
                    console.log( "New service worker is replacing old one." );
                    this.addStateChangeListener( registration.installing );
                }
                else if( registration.active && !registration.installing )
                {
                    console.log( "Found existing Service Worker" );
                    console.log( "Nothing new, continue using existing Service Worker" );
                    this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
                }
                else
                {
                    console.log( "No active or installing Service Worker found?" );
                    this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
                }
            } )
            .catch( ( error ) =>
            {
                console.log( "Service worker registration Error", error );
                this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
            } );
    }
    addStateChangeListener( serviceWorker )
    {
        serviceWorker.addEventListener( "statechange", () =>
        {
            console.log( "serviceWorker state", serviceWorker.state );
            if( serviceWorker.state === "activated" )
            {
                this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
            }
        } );
    }
    initialize()
    {
        Theme.APP_BACKGROUND_COLOR  = "#0d364c";
        Theme.PRIMARY_COLOR         = "#427392";
        Theme.PRIMARY_COLOR_DARK    = "#204764";
        Theme.ACCENT_COLOR          = Config.SECONDARY_COLOR
        Theme.ACCENT_COLOR_DARK     = Config.SECONDARY_COLOR;
        Theme.ICON_COLOR            = Colors.WHITE;
        Theme.PRIMARY_TEXT_COLOR    = Colors.WHITE;
        Theme.RIPPLE_COLOR          = Colors.WHITE;
        super.initialize();
        this.layout = new AnchorLayout();
        new AppBehavior();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.screensNavigator );
        this.addElement( this.bottomNavigationBar );
        this.addElement( this.appBar );
        this.addElement( this.overlay );
        this.addElement( this.filtersDrawer );
        this.addElement( this.movieDialog );
        this.addElement( this.trailerDialog );
        this.addElement( this.actorDialog );
    }
    get overlay()
    {
        if( !this._overlay )
        {
            this._overlay = new ScrimElement();
            this._overlay.uid = UIDS.OVERLAY; 
        }
        return this._overlay;
    }
    get filtersDrawer()
    {
        if( !this._filtersDrawer )
        {
            this._filtersDrawer = new FiltersDrawer();
            this._filtersDrawer.uid = UIDS.FILTERS_DRAWER;
        }
        return this._filtersDrawer;
    }
    get trailerDialog()
    {
        if( !this._trailerDialog )
        {
            this._trailerDialog = new TrailerDialog();
            this._trailerDialog.uid = UIDS.TRAILER_DIALOG;
        }
        return this._trailerDialog;
    }
    get movieDialog()
    {
        if( !this._movieDialog )
        {
            this._movieDialog = new MovieDialog();
            this._movieDialog.uid = UIDS.MOVIE_DIALOG;
        }
        return this._movieDialog;
    }
    get actorDialog()
    {
        if( !this._actorDialog )
        {
            this._actorDialog = new ActorDialog();
            this._actorDialog.uid = UIDS.ACTOR_DIALOG;
        }
        return this._actorDialog;
    }
    get appBar()
    {
        if( !this._appBar )
        {
            this._appBar = new AvaAppBar();
            this._appBar.uid = UIDS.APP_BAR;
            this._appBar.isShown = true;
        }
        return this._appBar;
    }
    get screensNavigator()
    {
        if( !this._screensNavigator )
        {
            this._screensNavigator = new ScreensNavigator();
            this._screensNavigator.uid = UIDS.SCREENS_NAVIGATOR;
            this._screensNavigator.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._screensNavigator.addScreen( new TrailersScreen() );
            this._screensNavigator.addScreen( new MoviesScreen() );
            this._screensNavigator.addScreen( new ActorsScreen() );
        }
        return this._screensNavigator;
    }
    get bottomNavigationBar()
    {
        if( !this._bottomNavigationBar )
        {
            this._bottomNavigationBar = new BottomNavigationBar();
            this._bottomNavigationBar.uid = UIDS.BOTTOM_NAVIGATION_BAR
            this._bottomNavigationBar.isShown = true;
            this._bottomNavigationBar.itemRenderType = BottomNavigationBarItemRenderer;
            this._bottomNavigationBar.dataProvider = new ArrayCollection( [ { icon : IconNames.VIDEO_LIBRARY, label : "Trailers", href : "/trailers" },
                                                                            { icon : IconNames.MOVIE, label : "Film", href : "/film" }, 
                                                                            { icon : IconNames.PEOPLE, label : "Skuespillere", href : "/skuespillere" }
                                                                            ] );                                                                                                                
        }
        return this._bottomNavigationBar;
    }
}
customElements.define("ava-app", AvaApp);