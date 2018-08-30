export default class AnimatedProperty
{
    constructor( property, duration = 225, easing = "ease-out" )
    {
        this._property = property;
        this._duration = duration;
        this._easing = easing;
    }
    get property()
    {
        return this._property;
    }
    get duration()
    {
        return this._duration;
    }
    get easing()
    {
        return this._easing;
    }
}