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
export default class AvaApp extends ApplicationElement
{
    constructor()
    {
        super();
        this.uid = UIDS.APP;
    }
    initialize()
    {
        Theme.APP_BACKGROUND_COLOR  = "#0d364c";// Config.APP_BACKGROUND_COLOR;
        Theme.PRIMARY_COLOR         = "#427392";// "#00bcd4";//Config.PRIMARY_COLOR
        Theme.PRIMARY_COLOR_DARK    = "#204764";// "#cd1a57";// "#00a5bb";//Config.PRIMARY_COLOR_DARK;
        Theme.ACCENT_COLOR          = Config.ACCENT_COLOR
        Theme.ACCENT_COLOR_DARK     = Config.ACCENT_COLOR_DARK;
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
        this.addElement( this.trailerDialog );
        this.addElement( this.movieDialog );
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