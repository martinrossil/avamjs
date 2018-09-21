import Util from "../app/utils/Util.js";
import BasePathLogic from "./base/BasePathLogic.js";
export default class HistoryLogic extends BasePathLogic
{
    constructor()
    {
        super();
    }
    pathChanged( path )
    {
        if( path !== window.location.pathname )
        {
            history.pushState( null, null, path );
        }
        document.title = Util.getTitleFromPath( path );
    }
}