import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import GenreItemRenderer from "../app/itemrenderers/GenreItemRenderer.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Model from "../model/Model.js";
import BottomNavigationBarItemRenderer from "../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
export default class FilterByGenreLogic extends Logic
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
            let iconButton = ClickTargetUtil.getIconButtonFromTarget( e.target );
            if( iconButton )
            {
                let showMovieGenres = iconButton.href === "/film/genrer";
                let showTrailersGenres = iconButton.href === "/trailers/genrer";
                this.setProperty( "moviesGenresDrawer", "isShown", showMovieGenres );
                this.setProperty( "trailersGenresDrawer", "isShown", showTrailersGenres );
            }
            let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
            if( itemRenderer )
            {
                if( itemRenderer instanceof GenreItemRenderer )
                {
                    let href = itemRenderer.data.h;
                    console.log( href );
                    this.setProperty( "trailersGenresDrawer", "isShown", false );
                    this.setProperty( "moviesGenresDrawer", "isShown", false );
                }
                else if( itemRenderer instanceof BottomNavigationBarItemRenderer )
                {
                    let href = itemRenderer.data.href;
                    let isOpenTrailersGenresDrawerIconButtonShown = href === "/trailers";
                    let isOpenMovieGenresDrawerIconButtonShown = href === "/film";
                    this.setProperty( "openTrailersGenresDrawerIconButton", "isVisible", isOpenTrailersGenresDrawerIconButtonShown );
                    this.setProperty( "openMovieGenresDrawerIconButton", "isVisible", isOpenMovieGenresDrawerIconButtonShown );
                    
                }
            }
        }
    }
    loadComplete( data )
    {
        Model.moviesCollection.arrayData = data;
    }
    get jsonLoader()
    {
        if( !this._jsonLoader )
        {
            this._jsonLoader = new JSONLoader();
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.loadComplete.bind( this ) );
        }
        return this._jsonLoader;
    }
}