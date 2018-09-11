import LayoutContainer from "../display/LayoutContainer.js";
import Theme from "../../styles/Theme.js";
import Direction from "../../constants/Direction.js";
import ProgressBar from "../progress/ProgressBar.js";
import AnchorLayout from "../../layouts/AnchorLayout.js";
import AnchorLayoutData from "../../layouts/data/AnchorLayoutData.js";
import TimeIndicator from "./TimeIndicator.js";
import IconButton from "../buttons/IconButton.js";
import IconNames from "../../constants/IconNames.js";
import EventTypes from "../../constants/EventTypes.js";
import ApplicationElement from "../application/ApplicationElement.js";
import MediaEventTypes from "../../constants/MediaEventTypes.js";
export default class VideoControls extends LayoutContainer
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize(); 
        this.layout = new AnchorLayout();
        this.height = 56;
        this.backgroundColor = Theme.PRIMARY_COLOR;
        this.shadowDirection = Direction.NORTH;
        this.z = 4;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.timeIndicator );
        this.addElement( this.loadProgressBar );
        this.addElement( this.playbackProgressBar );
        this.addElement( this.playPauseIconButton );
        this.addElement( this.fullScreenIconButton );
    }
    get playPauseIconButton()
    {
        if( !this._playPauseIconButton )
        {
            this._playPauseIconButton = new IconButton();
            this._playPauseIconButton.iconName = IconNames.PLAY_ARROW;
            this._playPauseIconButton.layoutData = new AnchorLayoutData( 4, NaN, NaN, NaN, NaN, 0 );
            this._playPauseIconButton.listen( EventTypes.TRIGGERED, this.playPauseIconButtonTriggered.bind( this ) );
        }
        return this._playPauseIconButton;
    }
    get fullScreenIconButton()
    {
        if( !this._fullScreenIconButton )
        {
            this._fullScreenIconButton = new IconButton();
            this._fullScreenIconButton.iconName = IconNames.FULLSCREEN;
            this._fullScreenIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
            this._fullScreenIconButton.listen( EventTypes.TRIGGERED, this.fullScreenIconButtonTriggered.bind( this ) );
        }
        return this._fullScreenIconButton;
    }
    playPauseIconButtonTriggered( data )
    {
        this.dispatch( MediaEventTypes.PLAY_PAUSE_TRIGGERED );
    }
    get loadProgressBar()
    {
        if( !this._loadProgressBar )
        {
            this._loadProgressBar = new ProgressBar();
            this._loadProgressBar.layoutData = new AnchorLayoutData( 140, NaN, 52, NaN, NaN, 0 );
        }
        return this._loadProgressBar;
    }
    get playbackProgressBar()
    {
        if( !this._playbackProgressBar )
        {
            this._playbackProgressBar = new ProgressBar();
            this._playbackProgressBar.layoutData = new AnchorLayoutData( 140, NaN, 52, NaN, NaN, 0 );
            this._playbackProgressBar.color = Theme.PRIMARY_COLOR;
            this._playbackProgressBar.showTrack = false;
        }
        return this._playbackProgressBar;
    }
    get timeIndicator()
    {
        if( !this._timeIndicator )
        {
            this._timeIndicator = new TimeIndicator();
            this._timeIndicator.x = 40;
        }
        return this._timeIndicator;
    }
    set loadProgress( value )
    {
        if( this._loadProgress !== value )
        {
            this._loadProgress = value;
            this.loadProgressBar.setProgress( value, this.duration );
        }
    }
    get loadProgress()
    {
        return this._loadProgress;
    }
    set duration( value )
    {
        if( this._duration !== value )
        {
            this._duration = value;
            this.loadProgressBar.setProgress( this.loadProgress, value );
            this.playbackProgressBar.setProgress( this.currentTime, value );
            this.timeIndicator.duration = value;
        }
    }
    get duration()
    {
        return this._duration;
    }
    set currentTime( value )
    {
        if( this._currentTime !== value )
        {
            this._currentTime = value;
            this.timeIndicator.currentTime = value;
            this.playbackProgressBar.setProgress( value, this.duration );
        }
    }
    get currentTime()
    {
        return this._currentTime;
    }
    set isPlaying( value )
    {
        if( this._isPlaying !== value )
        {
            this._isPlaying = value;
            if( value )
            {
                this.playPauseIconButton.iconName = IconNames.PAUSE;
            }
            else
            {
                this.playPauseIconButton.iconName = IconNames.PLAY_ARROW;
            }
        }
    }
    fullScreenIconButtonTriggered()
    {
        let app = ApplicationElement.app;
        if( !document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement )
        {
            if( app.requestFullscreen )
            {
                app.requestFullscreen();
            }
            else if( app.msRequestFullscreen )
            {
                app.msRequestFullscreen();
            }
            else if( app.mozRequestFullScreen )
            {
                app.mozRequestFullScreen();
            }
            else if( app.webkitRequestFullscreen )
            {
                app.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT );
            }
            this.fullScreenIconButton.iconName = IconNames.FULLSCREEN_EXIT;
        }
        else
        {
            if( document.exitFullscreen )
            {
                document.exitFullscreen();
            }
            else if( document.msExitFullscreen ) 
            {
                document.msExitFullscreen();
            } 
            else if( document.mozCancelFullScreen )
            {
                document.mozCancelFullScreen();
            }
            else if( document.webkitExitFullscreen )
            {
                document.webkitExitFullscreen();
            }
            this.fullScreenIconButton.iconName = IconNames.FULLSCREEN;
        }
    }
}
customElements.define( "video-controls", VideoControls );