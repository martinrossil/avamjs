import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import GenreItemRenderer from "../app/itemrenderers/GenreItemRenderer.js";
import BottomNavigationBarItemRenderer from "../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
import CountryItemRenderer from "../app/itemrenderers/CountryItemRenderer.js";
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
                let showActorsDrawer = iconButton.href === "/skuespillere/lande";
                this.setProperty( "moviesGenresDrawer", "isShown", showMovieGenres );
                this.setProperty( "trailersGenresDrawer", "isShown", showTrailersGenres );
                this.setProperty( "actorsDrawer", "isShown", showActorsDrawer );
            }
            let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
            if( itemRenderer )
            {
                if( itemRenderer instanceof GenreItemRenderer )
                {
                    let href = itemRenderer.data.h;
                    this.setProperty( "trailersGenresDrawer", "isShown", false );
                    this.setProperty( "moviesGenresDrawer", "isShown", false );
                }
                else if( itemRenderer instanceof CountryItemRenderer )
                {
                    this.setProperty( "actorsDrawer", "isShown", false );
                }
                else if( itemRenderer instanceof BottomNavigationBarItemRenderer )
                {
                    let href = itemRenderer.data.href;
                    let isOpenTrailersGenresDrawerIconButtonShown = href === "/trailers";
                    let isOpenMovieGenresDrawerIconButtonShown = href === "/film";
                    let isOpenActorsDrawerIconButtonShown = href === "/skuespillere";
                    this.setProperty( "openTrailersGenresDrawerIconButton", "isVisible", isOpenTrailersGenresDrawerIconButtonShown );
                    this.setProperty( "openMovieGenresDrawerIconButton", "isVisible", isOpenMovieGenresDrawerIconButtonShown );
                    this.setProperty( "openActorsDrawerIconButton", "isVisible", isOpenActorsDrawerIconButtonShown );
                }
            }
        }
    }
}