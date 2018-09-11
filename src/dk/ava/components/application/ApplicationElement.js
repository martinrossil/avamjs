import Theme from "../../styles/Theme.js";
import LayoutContainer from "../display/LayoutContainer.js";
import System from "../../system/System.js";
import ImageFormatUtil from "../images/ImageFormatUtil.js";
import DisplayElement from "../display/DisplayElement.js";
import EventTypes from "../../constants/EventTypes.js";
export default class ApplicationElement extends LayoutContainer
{
    static set app( value )
    {
        if( this._app != value ) 
        {
            this._app = value;
        }
    }
    static get app()
    {
        return this._app;
    }
    constructor()
    {
        super();
        this.windowTouchStart = this.windowTouchStart.bind( this );
        this.windowMouseDown = this.windowMouseDown.bind( this );
        window.addEventListener( "touchstart", this.windowTouchStart, { capture : true, passive : true } );
        window.addEventListener( "mousedown", this.windowMouseDown, { capture : true } );
    }
    windowTouchStart( e )
    {
        window.removeEventListener( "touchstart", this.windowTouchStart, { capture : true, passive : true } );
        window.removeEventListener( "mousedown", this.windowMouseDown, { capture : true } );
        System.TOUCH_ENABLED = true;
    }
    windowMouseDown( e )
    {
        window.removeEventListener( "touchstart", this.windowTouchStart, { capture : true, passive : true } );
        window.removeEventListener( "mousedown", this.windowMouseDown, { capture : true } );
        System.TOUCH_ENABLED = false;
    }
    initialize()
    {
        super.initialize();
        this.appLoadComplete = this.appLoadComplete.bind( this );
        ApplicationElement.app = this;
        if( this.style[ "-webkit-overflow-scrolling" ] != undefined )
        {
            this.style[ "-webkit-overflow-scrolling" ]  = "touch";
        }
        System.START_TIME = new Date();
        this.setSize( window.innerWidth, window.innerHeight ); 
        this.clipContent = true;
        this.imageFormatUtil.detectAvailableFormats();
        document.body.style.margin = 0 + "px";
        document.body.style.position = "absolute";
        document.body.style.backgroundColor = Theme.APP_BACKGROUND_COLOR;
        this.background.backgroundColor = Theme.APP_BACKGROUND_COLOR;
        window.addEventListener("resize", this.windowResized.bind( this ) );
        window.addEventListener( "load", this.appLoadComplete );
        this.addElement( this.background );
    }
    appLoadComplete( e )
    {
        window.removeEventListener( "load", this.appLoadComplete );
        this.dispatch( EventTypes.APPLICATION_LOAD_COMPLETE );
    }
    get background()
    {
        if( !this._background )
        {
            this._background = new DisplayElement();
            this._background.setSize( window.innerWidth, window.innerHeight );
        }
        return this._background;
    }
    get imageFormatUtil()
    {
        if( !this._imageFormatUtil )
        {
            this._imageFormatUtil = new ImageFormatUtil();
        }
        return this._imageFormatUtil;
    }
    windowResized()
    {
        this.setSize( window.innerWidth, window.innerHeight );
        this.background.setSize( window.innerWidth, window.innerHeight );
    }
}
customElements.define("application-element", ApplicationElement);