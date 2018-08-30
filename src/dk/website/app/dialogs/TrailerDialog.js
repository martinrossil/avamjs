import BaseDialog from "./BaseDialog.js";
import Colors from "../../../ava/styles/Colors.js";
import FAB from "../../../ava/components/buttons/FAB.js";
import IconNames from "../../../ava/constants/IconNames.js";
import Theme from "../../../ava/styles/Theme.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
import Config from "../Config.js";
import VideoElement from "../../../ava/components/media/VideoElement.js";
import MediaEventTypes from "../../../ava/constants/MediaEventTypes.js";
import SpinnerElement from "../../../ava/components/progress/SpinnerElement.js";
import VideoControls from "../../../ava/components/media/VideoControls.js";
import RippleSurface from "../../../ava/components/display/RippleSurface.js";
import DialogTopBar from "./DialogTopBar.js";
export default class TrailerDialog extends BaseDialog
{
    constructor()
    {
        super();
    }
    isShownChanged()
    {
        if( !this.isShown )
        {
            this.href = null;
            this.data = null;
            this.videoElement.stop();
            this.videoElement.source = "";
            this.videoControls.loadProgress = 0;
        }
    }
    dataChanged()
    {
        if( this.data )
        {
            let source = "/trailers/" + this.data.u;
            this.dialogTopBar.title = this.data.t + " - " + this.data.d;
            this.videoElement.source = source;
            this.videoElement.play();
        }
    }
    hrefChanged()
    {
        if( this.href )
        {
            let url = Config.FIRE_BASE_DB_BASE_URL + 'info/videos/' + this.href.replace( "/trailers/", "" ) + ".json";
            this.jsonLoader.load( url );
        }
    }
    videoInfoComplete( data )
    {
        if( data )
        {
            let id = data.i;
            let url = Config.FIRE_BASE_STORAGE_BASE_URL + "videos%2F" + id + ".mp4?alt=media";
            this.videoElement.source = url;
            this.videoElement.play();
        }
    }
    videoInfoAborted()
    {
    }
    videoInfoError()
    {
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
            this._dialogTopBar.backgroundColor = Colors.GREY_900;
            this._dialogTopBar.closeHref = "/trailers/";
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
        if( this.videoElement.isPlaying )
        {
            this.videoElement.pause();
        }
        else
        {
            this.videoElement.play();
        }
    }
    get videoControls()
    {
        if( !this._videoControls )
        {
            this._videoControls = new VideoControls();
            this._videoControls.backgroundColor = Colors.GREY_900;
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
    get jsonLoader()
    {
        if( !this._jsonLoader )
        {
            this._jsonLoader = new JSONLoader();
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.videoInfoComplete.bind( this ) );
            this._jsonLoader.listen( EventTypes.LOAD_ABORTED, this.videoInfoAborted.bind( this ) );
            this._jsonLoader.listen( EventTypes.LOAD_ERROR, this.videoInfoError.bind( this ) );
        }
        return this._jsonLoader;
    }
}
customElements.define("trailer-dialog", TrailerDialog);