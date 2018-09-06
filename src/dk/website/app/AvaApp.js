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
import Config from "./Config.js";
import BusinessLogic from "../logic/BusinessLogic.js";
import TrailerDialog from "./dialogs/TrailerDialog.js";
import AvaAppBar from "./bars/AvaAppBar.js";
import ActorsDrawer from "./drawers/ActorsDrawer.js";
import TrailersDrawer from "./drawers/TrailersDrawer.js";
import MoviesDrawer from "./drawers/MoviesDrawer.js";
import ScrimElement from "../../ava/components/dialogs/ScrimElement.js";
export default class AvaApp extends ApplicationElement
{
    constructor()
    {
        super();
        this.uid = "AvaApp";
    }
    initialize()
    {
        Theme.APP_BACKGROUND_COLOR = Config.APP_BACKGROUND_COLOR;
        Theme.PRIMARY_COLOR = Config.PRIMARY_COLOR;
        Theme.PRIMARY_COLOR_DARK = Config.PRIMARY_COLOR_DARK;
        Theme.ICON_COLOR = Colors.WHITE;
        Theme.PRIMARY_TEXT_COLOR = Colors.WHITE;
        Theme.RIPPLE_COLOR = Colors.WHITE;
        Theme.ACCENT_COLOR = Colors.WHITE;
        super.initialize();
        this.layout = new AnchorLayout();
        new BusinessLogic();
        this.addElement( this.screensNavigator );
        this.addElement( this.bottomNavigationBar );
        this.addElement( this.appBar );
        this.addElement( this.overlay );
        this.addElement( this.trailersDrawer );
        this.addElement( this.moviesDrawer );
        this.addElement( this.actorsDrawer );
        this.addElement( this.trailerDialog );
    }
    get overlay()
    {
        if( !this._overlay )
        {
            this._overlay = new ScrimElement();
            this._overlay.uid = "overlay";
        }
        return this._overlay;
    }
    get trailersDrawer()
    {
        if( !this._trailersDrawer )
        {
            this._trailersDrawer = new TrailersDrawer();
            this._trailersDrawer.uid = "trailersDrawer";
            this._trailersDrawer.closeHref = "/trailers";
        }
        return this._trailersDrawer;
    }
    get moviesDrawer()
    {
        if( !this._moviesDrawer )
        {
            this._moviesDrawer = new MoviesDrawer();
            this._moviesDrawer.uid = "filmDrawer";
            this._moviesDrawer.closeHref = "/film";
        }
        return this._moviesDrawer;
    }
    get actorsDrawer()
    {
        if( !this._actorsDrawer )
        {
            this._actorsDrawer = new ActorsDrawer();
            this._actorsDrawer.uid = "skuespillereDrawer";
            this._actorsDrawer.closeHref = "/skuespillere";
        }
        return this._actorsDrawer;
    }
    get trailerDialog()
    {
        if( !this._trailerDialog )
        {
            this._trailerDialog = new TrailerDialog();
            this._trailerDialog.uid = "trailerDialog";
        }
        return this._trailerDialog;
    }
    get appBar()
    {
        if( !this._appBar )
        {
            this._appBar = new AvaAppBar();
            this._appBar.uid = "appBar";
            this._appBar.isShown = true;
        }
        return this._appBar;
    }
    get screensNavigator()
    {
        if( !this._screensNavigator )
        {
            this._screensNavigator = new ScreensNavigator();
            this._screensNavigator.uid = "screensNavigator";
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
            this._bottomNavigationBar.uid = "bottomNavigationBar";
            this._bottomNavigationBar.isShown = true;
            //this._bottomNavigationBar.selectedIndex = 0;
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