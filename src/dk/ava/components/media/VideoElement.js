import DisplayContainer from "../display/DisplayContainer.js";
import MediaEventTypes from "../../constants/MediaEventTypes.js";
export default class VideoElement extends DisplayContainer
{
    get extension()
    {
        if( !this._extension )
        {
            this._extension = "mp4";
        }
        return this._extension;
    }
    set extension( value )
    {
        this._extension = value;
    }
    constructor()
    {
        super();
    }
    play()
    {
        this.video.play(); 
    }
    pause()
    {
        this.video.pause();
    }
    stop()
    {
        this.video.pause();
        this.video.currentTime = 0;
    }
    sizeChanged( w, h )
    {
        super.sizeChanged();
        this.video.width = w + "";
        this.video.height = h + "";
    }
    widthChanged( w )
    {
        this.video.width = w + "";
        this.video.height = this.height + "";
    }
    heightChanged( h )
    {
        this.video.width = this.width + "";
        this.video.height = h + "";
    }
    initialize()
    {
        super.initialize();
        let vp9 = this.video.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
        if( vp9 === "probably" )
        {
            this.extension = "webm";
        }
        this._isWaiting = false;
        this._isPlaying = false;
        this._isPaused = false;
        this.addElement( this.video );
    }
    get video()
    {
        if( !this._video )
        {
            this._video = document.createElement( "video" );
            this._video.setAttribute( "playsinline", true );
            this._video.setAttribute( "webkit-playsinline", true );
            this._video.addEventListener( "loadstart", this.loadStarted.bind( this ) );
            this._video.addEventListener( "loadeddata", this.firstFrameLoaded.bind( this ) );
            this._video.addEventListener( "loadedmetadata", this.metaDataLoaded.bind( this ) );
            this._video.addEventListener( "waiting", this.waiting.bind( this ) );
            this._video.addEventListener( "progress", this.loadProgress.bind( this ) );
            this._video.addEventListener( "play", this.playStarted.bind( this ) );
            this._video.addEventListener( "canplay", this.canStartPlaying.bind( this ) );
            this._video.addEventListener( "canplaythrough", this.canPlayThrough.bind( this ) );
            this._video.addEventListener( "playing", this.playing.bind( this ) );
            this._video.addEventListener( "timeupdate", this.timeUpdated.bind( this ) );
            this._video.addEventListener( "pause", this.paused.bind( this ) );
            this._video.addEventListener( "ended", this.playbackEnded.bind( this ) );
        }
        return this._video;
    }
    loadProgress()
    {
        this.notifyLoadProgress();
    }
    notifyLoadProgress()
    {
        let timeRanges = this.video.buffered;
        if( timeRanges.length > 0 )
        {
            let loaded = timeRanges.end( 0 );
            this.dispatch( MediaEventTypes.LOAD_PROGRESS_CHANGED, loaded );
        }
    }
    loadStarted()
    {
    }
    firstFrameLoaded()
    {
    }
    metaDataLoaded()
    {
        this.dispatch( MediaEventTypes.DURATION_CHANGED, this.video.duration );
    }
    waiting()
    {
        this.isWaiting = true;
        this.isPaused = false;
        this.isPlaying = false;
    }
    canStartPlaying()
    {
        this.isWaiting = false;
    }
    canPlayThrough()
    {
        this.notifyLoadProgress();
    }
    playStarted()
    {
    }
    playing()
    {
        this.isPlaying = true;
        this.isPaused = false;
    }
    timeUpdated()
    {
        this.dispatch( MediaEventTypes.CURRENT_TIME_CHANGED, this.video.currentTime );
    }
    paused()
    {
        this.isPlaying = false;
        this.isPaused = true;
    }
    playbackEnded()
    {
        this.isPlaying = false;
        this.isPaused = true;
    }
    set source( value )
    {
        if( this._source != value )
        {
            this._source = value;
            if( value )
            {
                this.video.src = value + "." + this.extension;
            }
            else
            {
                this.video.src = value;
            }
        }
    }
    get source()
    {
        return this._source;
    }
    set poster( value )
    {
        if( this._poster !== value )
        {
            this._poster = value;
            this.video.poster = value;
        }
    }
    get poster()
    {
        return this._poster;
    }
    set isWaiting( value )
    {
        if( this._isWaiting !== value )
        {
            this._isWaiting = value;
            this.dispatch( MediaEventTypes.IS_WAITING, value );
        }
    }
    get isWaiting()
    {
        return this._isWaiting;
    }
    set isPlaying( value )
    {
        if( this._isPlaying !== value )
        {
            this._isPlaying = value;
            this.dispatch( MediaEventTypes.IS_PLAYING, value );
        }
    }
    get isPlaying()
    {
        return this._isPlaying;
    }
    set isPaused( value )
    {
        if( this._isPaused !== value )
        {
            this._isPaused = value;
            this.dispatch( MediaEventTypes.IS_PAUSED, value );
        }
    }
    get isPaused()
    {
        return this._isPaused;
    }
}
customElements.define( "video-element", VideoElement );