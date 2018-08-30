export default class MediaEventTypes
{
    static get IS_WAITING(){return "isWaiting";}
    static get IS_PLAYING(){return "isPlaying";}
    static get IS_PAUSED(){return "isPaused";}
    static get DURATION_CHANGED(){return "durationChanged";}
    static get LOAD_PROGRESS_CHANGED(){return "loadProgressChanged";}
    static get CURRENT_TIME_CHANGED(){return "currentTimeChanged";}
    static get PLAY_PAUSE_TRIGGERED(){return "playPauseTriggered";}
}