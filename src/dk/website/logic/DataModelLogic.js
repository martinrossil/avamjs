import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Model from "../model/Model.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import GenreItemRenderer from "../app/itemrenderers/GenreItemRenderer.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
export default class DataModelLogic extends Logic
{
    constructor()
    {
        super();
        this.currentSort = "sortedByCreated";
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
            else
            {
                let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
                if( itemRenderer )
                {
                    if( itemRenderer instanceof GenreItemRenderer )
                    {
                        this.genreItemRendererClicked( itemRenderer.data.h );
                    }
                }
            }
        }
    }
    genreItemRendererClicked( href )
    {
        let path = href + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "/data" + path + "/0.json" );
        }
        else
        {
            let arrayCollection = this.loadedPaths[ path ];
            if( href.indexOf( "trailers" ) != -1 )
            {
                this.setProperty( "videosList", "dataProvider", arrayCollection );
            }
            else if( href.indexOf( "film" ) != -1 )
            {
                this.setProperty( "moviesList", "dataProvider", arrayCollection );
            }
        }
    }
    iconButtonClicked( href )
    {
        let pathArray = href.split( "/" );
            pathArray.shift();
        if( pathArray.length == 2 )
        {
            if( !this.loadedPaths[ href ] )
            {
                this.jsonLoader.load( "/data" + href + ".json" );
            }
        }   
    }
    loadComplete( data )
    {
        if( data )
        {
            if( data.top === "trailers" )
            {
                this.trailersDataRecieved( data );
            }
            else if( data.top === "film" )
            {
                this.filmDataRecieved( data );
            }
        }
    }
    trailersDataRecieved( data )
    {
        if( data.sub === "genrer" )
        {
            this.trailersGenresDataRecieved( data );
        }
    }
    filmDataRecieved( data )
    {
        if( data.sub === "genrer" )
        {
            this.filmGenresDataRecieved( data );
        }
    }
    filmGenresDataRecieved( data )
    {
        if( data.subsub && data.sort )
        {
            let path = "/" + data.top + "/" + data.sub + "/" + data.subsub + "/" + data.sort;
            if( !this.loadedPaths[ path ] )
            {
                let arrayCollection = new ArrayCollection( data.items );
                this.loadedPaths[ path ] = arrayCollection;
                this.setProperty( "moviesList", "dataProvider", arrayCollection );
            }
        }
        else
        {
            let movieseGenresListDataProvider = new ArrayCollection( data.items );
            this.loadedPaths[ "/" + data.top + "/" + data.sub ] = movieseGenresListDataProvider;
            this.setProperty( "movieGenresList", "dataProvider", movieseGenresListDataProvider );
        }
    }
    trailersGenresDataRecieved( data )
    {
        if( data.subsub && data.sort )
        {
            let path = "/" + data.top + "/" + data.sub + "/" + data.subsub + "/" + data.sort;
            if( !this.loadedPaths[ path ] )
            {
                let arrayCollection = new ArrayCollection( data.items );
                this.loadedPaths[ path ] = arrayCollection;
                this.setProperty( "videosList", "dataProvider", arrayCollection );
            }
        }
        else
        {
            let trailersGenresListDataProvider = new ArrayCollection( data.items );
            this.loadedPaths[ "/" + data.top + "/" + data.sub ] = trailersGenresListDataProvider;
            this.setProperty( "trailersGenresList", "dataProvider", trailersGenresListDataProvider );
        }
    }
    applicationLoadComplete()
    {
        //this.jsonLoader.load( 'data/filter/film/sortedByCreated/genrer/alle/0.json' );
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
    get loadedPaths()
    {
        if( !this._loadedPaths )
        {
            this._loadedPaths = {};
        }
        return this._loadedPaths;
    }
}