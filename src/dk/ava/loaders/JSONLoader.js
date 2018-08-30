import EventDispatcher from "../events/EventDispatcher.js";
import EventTypes from "../constants/EventTypes.js";
export default class JSONLoader extends EventDispatcher
{
    constructor()
    {
        super();
    }
    load( url )
    {
        this.xHR.open( 'GET', url, true );
        this.xHR.send();
    }
    get xHR()
    {
        if( !this._xHR )
        {
            this._xHR = new XMLHttpRequest();
            this._xHR.responseType = "json";
            this._xHR.addEventListener( "progress", this.updateProgress.bind( this ) );
            this._xHR.addEventListener( "load",     this.transferComplete.bind( this ) );
            this._xHR.addEventListener( "error",    this.transferFailed.bind( this ) );
            this._xHR.addEventListener( "abort",    this.transferCanceled.bind( this ) );
        }
        return this._xHR;
    }
    updateProgress( e )
    {
        if( e.lengthComputable )
        {
            var percentComplete = e.loaded / e.total; 
            this.dispatch( EventTypes.LOAD_PROGRESS,  percentComplete );
          }
    }
    transferComplete( e )
    {
        this.dispatch( EventTypes.LOAD_COMPLETE, this.xHR.response );
    }
    transferFailed( e )
    {
        this.dispatch( EventTypes.LOAD_ERROR );
    }
    transferCanceled( e )
    {
        this.dispatch( EventTypes.LOAD_ABORTED );
    }
}