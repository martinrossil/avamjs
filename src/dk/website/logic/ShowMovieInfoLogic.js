import Logic from "../../ava/logic/Logic.js";
import MovieItemRenderer from "../app/itemrenderers/MovieItemRenderer.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
export default class ShowMovieInfoLogic extends Logic
{
    constructor()
    {
        super();
        document.addEventListener( "click", this.clicked.bind( this ) );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
            if( itemRenderer )
            {
                if( itemRenderer instanceof MovieItemRenderer )
                {
                    console.log( "ShowMovieInfoLogic", itemRenderer.data );
                }
            }
        }
    }
}