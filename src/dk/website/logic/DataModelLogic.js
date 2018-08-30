import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Model from "../model/Model.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
export default class DataModelLogic extends Logic
{
    constructor()
    {
        super();
        this.hasTrailerGenresBeenLoaded = false;
        this.isLoadingTrailerGenres = false;
        this.hasMovieGenresBeenLoaded = false;
        this.isLoadingMovieGenres = false;
        this.listen( "AvaApp", EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
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
                this.iconButtonClicked( iconButton.href );
            }
        }
    }
    iconButtonClicked( href )
    {
        if( href === "/trailers/genrer" )
        {
            if( !this.hasTrailerGenresBeenLoaded )
            {
                this.isLoadingTrailerGenres = true;
                this.jsonLoader.load( '/data/filter/trailers/genrer.json' );
            }
        }
        else if( href === "/film/genrer" )
        {
            if( !this.hasMovieGenresBeenLoaded )
            {
                this.isLoadingMovieGenres = true;
                this.jsonLoader.load( '/data/filter/film/genrer.json' );
            }
        }
    }
    loadComplete( data )
    {
        if( this.isLoadingTrailerGenres )
        {
            this.isLoadingTrailerGenres = false;
            this.hasTrailerGenresBeenLoaded = true;
            Model.trailersGenresCollection.arrayData = data;
        }
        else if( this.isLoadingMovieGenres )
        {
            this.isLoadingMovieGenres = false;
            this.hasMovieGenresBeenLoaded = true;
            Model.moviesGenresCollection.arrayData = data;
        }
        if( data )
        {
            Model.moviesCollection.arrayData = data.items;
        }
    }
    applicationLoadComplete()
    {
        this.jsonLoader.load( 'data/filter/film/sortedByCreated/genrer/alle/0.json' );
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