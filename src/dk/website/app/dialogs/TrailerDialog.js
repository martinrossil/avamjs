import BaseDialog from "./BaseDialog.js";
import Colors from "../../../ava/styles/Colors.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import VideoElement from "../../../ava/components/media/VideoElement.js";
import MediaEventTypes from "../../../ava/constants/MediaEventTypes.js";
import SpinnerElement from "../../../ava/components/progress/SpinnerElement.js";
import VideoControls from "../../../ava/components/media/VideoControls.js";
import RippleSurface from "../../../ava/components/display/RippleSurface.js";
import DialogTopBar from "./DialogTopBar.js";
import Theme from "../../../ava/styles/Theme.js";
export default class TrailerDialog extends BaseDialog
{
    constructor()
    {
        super();
    }
    pathChanged()
    {
        if( this.path )
        {
            if( !this.infoData[ this.path ] )
            {
                let url = window.location.origin + "/info" + this.path + ".json";
                this.infoLoader.load( url );
            }
            else
            {
                let data = this.infoData[ this.path ];
                this.infoComplete( data );
            }
        }
    }
    infoComplete( data )
    {
        if( data )
        {
            let source = "/trailers/" + data.fileName;
            this.dialogTopBar.title = data.title;
            this.videoElement.source = source;
            this.videoElement.play();
            this.showControls();
        }
    }
    isShownChanged()
    {
        super.isShownChanged();
        if( !this.isShown )
        {
            this.path = null;
            this.dialogTopBar.title = null;
            this.videoElement.stop();
            this.videoElement.source = "";
            this.videoControls.loadProgress = 0;
            this.videoControls.currentTime = 0;
            this.videoControls.duration = 0;
        }
    }
    initialize()
    {
        super.initialize();
        this.backgroundColor = Colors.BLACK;
        this.createChildren();
    }
    isWaiting( data )
    {
        this.videoControls.isPlaying = !data;
        this.spinnerElement.isShown = data;
    }
    isPlaying( data )
    {
        this.videoControls.isPlaying = data;
        if( data )
        {
            this.showControlsTimeoutId = window.setTimeout( this.showControlsTimedOut.bind( this ), 3000 );
        }
        else
        {
            this.clearHideConstrolsTimeOut();
        }
    }
    clearHideConstrolsTimeOut()
    {
        if( this.showControlsTimeoutId )
        {
            window.clearTimeout( this.showControlsTimeoutId );
            this.showControlsTimeoutId = null;
        }
    }
    showControls()
    {
        this.dialogTopBar.isShown = true;
        this.videoControls.isShown = true;
    }
    showControlsTimedOut()
    {
        this.hideControls();
    }
    hideControls()
    {
        this.dialogTopBar.isShown = false;
        this.videoControls.isShown = false;
    }
    isPaused( data )
    {
        this.videoControls.isPlaying = !data;
    }
    durationChanged( data )
    {
        this.videoControls.duration = data;
    }
    currentTimeChanged( data )
    {
        this.videoControls.currentTime = data;
    }
    loadProgressChanged( data )
    {
        this.videoControls.loadProgress = data;
    }
    playPauseTriggered()
    {
        if( this.videoElement.isPlaying )
        {
            this.videoElement.pause();
        }
        else
        {
            this.videoElement.play();
        }
    }
    createChildren()
    {
        this.addElement( this.videoElement );
        this.addElement( this.rippleSurface );
        this.addElement( this.spinnerElement );
        this.addElement( this.videoControls );
        this.addElement( this.dialogTopBar );
    }
    get dialogTopBar()
    {
        if( !this._dialogTopBar )
        {
            this._dialogTopBar = new DialogTopBar();
            this._dialogTopBar.layoutData = new AnchorLayoutData( 0, 0, 0 );
            this._dialogTopBar.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        }
        return this._dialogTopBar;
    }
    get rippleSurface()
    {
        if( !this._rippleSurface )
        {
            this._rippleSurface = new RippleSurface();
            this._rippleSurface.clipContent = false;
            this._rippleSurface.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._rippleSurface.listen( EventTypes.TRIGGERED, this.rippleSurfaceTriggered.bind( this ) );
        }
        return this._rippleSurface;
    }
    rippleSurfaceTriggered()
    {
        this.showControls();
        if( this.videoElement.isPlaying )
        {
            this.showControlsTimeoutId = window.setTimeout( this.showControlsTimedOut.bind( this ), 3000 );
        }
    }
    get videoControls()
    {
        if( !this._videoControls )
        {
            this._videoControls = new VideoControls();
            this._videoControls.backgroundColor = Theme.PRIMARY_COLOR_DARK;
            this._videoControls.layoutData = new AnchorLayoutData( 0, NaN, 0, 0 );
            this._videoControls.listen( MediaEventTypes.PLAY_PAUSE_TRIGGERED, this.playPauseTriggered.bind( this ) );
        }
        return this._videoControls;
    }
    get spinnerElement()
    {
        if( !this._spinnerElement )
        {
            this._spinnerElement = new SpinnerElement();
            this._spinnerElement.layoutData = new AnchorLayoutData( NaN, NaN, NaN, NaN, 0, 0 );
        }
        return this._spinnerElement;
    }
    get videoElement()
    {
        if( !this._videoElement )
        {
            this._videoElement = new VideoElement();
            this._videoElement.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._videoElement.listen( MediaEventTypes.IS_WAITING, this.isWaiting.bind( this ) );
            this._videoElement.listen( MediaEventTypes.IS_PLAYING, this.isPlaying.bind( this ) );
            this._videoElement.listen( MediaEventTypes.IS_PAUSED, this.isPaused.bind( this ) );
            this._videoElement.listen( MediaEventTypes.DURATION_CHANGED, this.durationChanged.bind( this ) );
            this._videoElement.listen( MediaEventTypes.LOAD_PROGRESS_CHANGED, this.loadProgressChanged.bind( this ) );
            this._videoElement.listen( MediaEventTypes.CURRENT_TIME_CHANGED, this.currentTimeChanged.bind( this ) );
        }
        return this._videoElement;
    }
}
customElements.define("trailer-dialog", TrailerDialog);