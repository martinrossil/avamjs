import LayoutContainer from "../components/display/LayoutContainer.js";
import EventTypes from "../constants/EventTypes.js";
export default class ScreensNavigator extends LayoutContainer
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        this.resizeChildScreens( w, h ); 
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.resizeChildScreens( w, this.height );
    }
    heightChanged( h )
    {
        this.resizeChildScreens( this.width, h );
    }
    resizeChildScreens( w, h )
    {
        if( this.screens.length > 0 )
        {
            for( let screen of this.screens )
            {
                screen.setSize( w, h );
            }
        }
    }
    selectedIndexChanged()
    {
        if( this.selectedIndex < this.screens.length )
        {
            this.showHideScreens();
        }
    }
    showHideScreens()
    {
        if( this.selectedIndex > -1 )
        {
            let index = this.selectedIndex;
            if( index < this.screens.length )
            {
                if( this.currentScreen )
                {
                    this.currentScreen.opacity = 0;
                }
                this.currentScreen = this.screens[ index ];
                //this.addElement( this.currentScreen );
                this.currentScreen.isVisible = true;
                this.currentScreen.isInteractive = true;
                this.currentScreen.opacity = 1;
            }
        }
    }
    initialize()
    {
        super.initialize();
        this.screenHideComplete = this.screenHideComplete.bind( this );
        this._selectedIndex = -1;
    }
    screenHideComplete( screen )
    {
        screen.isVisible = false;
        screen.isInteractive = false;
        /*if( this.containsElement( screen ) )
        {
            this.removeElement( screen );
        }*/
    }
    addScreen( screen )
    {
        screen.isInteractive = false;
        screen.isVisible = false;
        screen.opacity = 0;
        this.screens.push( screen );
        screen.listen( EventTypes.HIDE_COMPLETE, this.screenHideComplete );
        this.addElement( screen );
        this.showHideScreens();
    }
    set selectedIndex( value )
    {
        if( this._selectedIndex !== value )
        {
            this._selectedIndex = value;
            this.selectedIndexChanged();
        }
    }
    get selectedIndex()
    {
        return this._selectedIndex;
    }
    get screens()
    {
        if( !this._screens )
        {
            this._screens = [];
        }
        return this._screens;
    }
}
customElements.define( "screens-navigator", ScreensNavigator );