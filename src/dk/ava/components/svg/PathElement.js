import SVGElement from "./SVGElement.js";
export default class PathElement extends SVGElement
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.svg.appendChild( this.path );
    }
    get path()
    {
        if( !this._path )
        {
            this._path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        }
        return this._path;
    }
    set pathData( value )
    {
        if( this._pathData !== value )
        {
            this._pathData = value;
            this._path.setAttribute( "d", value );
        }
    }
    get pathData()
    {
        return this._pathData;
    }
}
customElements.define( "path-element", PathElement );