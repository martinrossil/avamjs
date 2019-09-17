import DisplayElement from "../display/DisplayElement.js";
import IconPaths from "../../constants/IconPaths.js";
import Theme from "../../styles/Theme.js";
export default class IconElement extends DisplayElement
{
    constructor() 
	{
        super();
    }
    sizeChanged()
    {
        super.sizeChanged();
        this.svg.setAttribute( "width", this.width ); 
        this.svg.setAttribute( "height", this.height );
    }
    widthChanged()
    {
        super.widthChanged(); 
        this.svg.setAttribute( "width", this.width );
    }
    heightChanged()
    {
        super.heightChanged();
        this.svg.setAttribute( "height", this.height );
    }
    initialize()
    {
        super.initialize();
        this.isInteractive = false;
        this.iconColor = Theme.ICON_COLOR;
        this.setSize( 24, 24 );
        this.appendChild( this.svg );
    }
    get svg()
    {
        if( !this._svg )
        {
            this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._svg.setAttribute( "fill", this.iconColor );
            this._svg.setAttribute( "width", "24" );
            this._svg.setAttribute( "height", "24" );
            this._svg.setAttribute( "viewBox", "0 0 24 24" );
            this._svg.appendChild( this.path );
            this._svg.style.position = "absolute";
        }
        return this._svg;
    }
    get path()
    {
        if( !this._path )
        {
            this._path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        }
        return this._path;
    }
    set iconName( value )
    {
        if( this._iconName != value )
        {
            this._iconName = value;
            this.path.setAttribute( "d", IconPaths[ value ] );
        }
    }
    get iconName()
    {
        return this._iconName;
    }
    set iconColor( value )
    {
        if( this._iconColor != value )
        {
            this._iconColor = value;
            this.svg.setAttribute( "fill", value );
        }
    }
    get iconColor()
    {
        return this._color;
    }
}
customElements.define("icon-element", IconElement);