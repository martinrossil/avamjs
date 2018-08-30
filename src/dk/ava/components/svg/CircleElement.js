import SVGElement from "./SVGElement.js";
export default class CircleElement extends SVGElement
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        let r = Math.min( w, h ) * .5;
        this.setCircleValues( w * .5, h * .5, r );
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        let r = Math.min( w, this.height ) * .5;
        this.setCircleValues( w * .5, this.height * .5, r );
    }
    heightChanged( h )
    {
        super.heightChanged( h );
        let r = Math.min( this.width, h ) * .5;
        this.setCircleValues( this.width * .5, h * .5, r );
    }
    setCircleValues( x, y, radius )
    {
        this.circle.setAttribute( "cx", x );
        this.circle.setAttribute( "cy", y );
        this.circle.setAttribute( "r", radius );
    }
    initialize()
    {
        super.initialize();
        this.svg.appendChild( this.circle );
    }
    get circle()
    {
        if( !this._circle )
        {
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        }
        return this._circle;
    }
}
customElements.define( "circle-element", CircleElement );