import Direction from "../../../constants/Direction.js";
export default class Shadows
{
    static getShadow( z, direction = Direction.SOUTH )
    {
        let s = "";
        if( z > 0 && z < 25 )
        {
            let rgb1 = "rgba(0,0,0,0.14)";
            let rgb2 = "rgba(0,0,0,0.12)";
            let rgb3 = "rgba(0,0,0,0.20)";
            if( direction === Direction.SOUTH )
            {
                s +=   "0px " + z + "px " + Math.ceil( z * 1.5 ) + "px " + Math.ceil( z / 8 ) + "px " + rgb1;
                s += ", 0px " + Math.ceil( z / 2.5 ) + "px " + z * 2 + "px " + Math.ceil( z / 3 ) + "px " + rgb2;
                s += ", 0px " + Math.ceil( z * .5 ) + "px " + z * 2 + "px 0px " + rgb3;
                return s;
            }
            else if( direction === Direction.NORTH )
            {
                s +=   "0px -" + z + "px " + Math.ceil( z * 1.5 ) + "px " + Math.ceil( z / 8 ) + "px " + rgb1;
                s += ", 0px -" + Math.ceil( z / 2.5 ) + "px " + z * 2 + "px " + Math.ceil( z / 3 ) + "px " + rgb2;
                s += ", 0px -" + Math.ceil( z * .5 ) + "px " + z * 2 + "px 0px " + rgb3;
                return s;
            }
            else if( direction === Direction.WEST )
            {

            }
            else if( direction === Direction.EAST )
            {

            }
            else
            {
                return "";
            }
        }
        else
        {
            return "none";
        }
    }
}
// formula "0 " + v + "px " + 1.5 * v + "px rgba(0,0,0," + ( .12 + .002 * v ) + "), 0 " + v + "px " + 1.5 * v + "px rgba(0,0,0," + ( .24 - ( 0.5 * v * .001 ) ) + ")";
// https://material.io/guidelines/resources/shadows.html#shadows-sketch
// umbra, shadow coompletely covered by object
// penumbra, partly covered
// ambient lighting
// x, y, blur, spread