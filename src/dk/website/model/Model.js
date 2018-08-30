import ArrayCollection from "../../ava/data/ArrayCollection.js";
export default class Model
{
    constructor()
    {

    }
    static get trailersCollection()
    {
        if( !this._trailersCollection )
        {
            this._trailersCollection = new ArrayCollection();
        }
        return this._trailersCollection;
    }
    static get moviesCollection()
    {
        if( !this._moviesCollection )
        {
            this._moviesCollection = new ArrayCollection();
        }
        return this._moviesCollection;
    }
    static get actorsCollection()
    {
        if( !this._actorsCollection )
        {
            this._actorsCollection = new ArrayCollection();
        }
        return this._actorsCollection;
    }
    static get moviesGenresCollection()
    {
        if( !this._moviesGenresCollection )
        {
            this._moviesGenresCollection = new ArrayCollection( [] );  
        }
        return this._moviesGenresCollection;
    }
    static get trailersGenresCollection()
    {
        if( !this._trailersGenresCollection )
        {
            this._trailersGenresCollection = new ArrayCollection( [] );
        }
        return this._trailersGenresCollection;
    }
}