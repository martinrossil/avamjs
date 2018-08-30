import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import BottomNavigationBarItemRenderer from "../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
export default class TopLevelNavigationLogic extends Logic
{
    constructor()
    {
        super();
        window.addEventListener( "popstate", this.popped.bind( this ) ); 
        document.addEventListener( "click", this.clicked.bind( this ) );
        this.listen( "AvaApp", EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
    }
    applicationLoadComplete()
    {
        if( window.location.pathname === "/" )
        {
            this.navigateTopLevel( 0, "Trailers" );
        }
    }
    popped( e )
    {
        console.log( "NavigationLogic", "popped", window.location.pathname );
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
                if( itemRenderer instanceof BottomNavigationBarItemRenderer )
                {
                    this.bottomNavigationBarNavigation( itemRenderer );
                }
            }
        }
    }
    bottomNavigationBarNavigation( itemRenderer )
    {
        let href = itemRenderer.data.href;
        if( href === "/trailers" )
        {
            this.navigateTopLevel( 0, "Trailers" );
        }
        else if( href === "/film" )
        {
            this.navigateTopLevel( 1, "Film" );
        }
        else
        {
            this.navigateTopLevel( 2, "Skuespillere" );
        }
    }
    navigateTopLevel( index, title )
    {
        this.setProperty( "screensNavigator", "selectedIndex", index );
        this.setProperty( "appBar", "title", title );
        document.title = title;
    }
}