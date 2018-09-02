import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import GenreItemRenderer from "../app/itemrenderers/GenreItemRenderer.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
export default class DataModelLogic extends Logic
{
    constructor()
    {
        super();
        this.currentSort = "sortedByCreated";
        this.currentGenre = "alle";
        this.listen( "AvaApp", EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        document.addEventListener( "click", this.clicked.bind( this ) );
        this.listen( "moviesList", EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.moviesListIsOnLastScreenChanged.bind( this ) );
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
                        this.genreItemRendererClicked( itemRenderer.data );
                    }
                }
            }
        }
    }
    moviesListIsOnLastScreenChanged( isOnLastScreen )
    {
        console.log( "DataModelLogic", "moviesListIsOnLastScreenChanged", isOnLastScreen );
        if( isOnLastScreen )
        {
            let path = "/film/genrer/" + this.currentGenre + "/" + this.currentSort;
            if( this.loadedPaths[ path ] )
            {
                let chunksObject = this.loadedPaths[ path ];
                if( chunksObject.index < chunksObject.total )
                {
                    this.jsonLoader.load( "/data" + path + "/" + ( chunksObject.index + 1 ) + ".json" );
                }
            }
        }
    }
    genreItemRendererClicked( data )
    {
        this.currentGenre = data.g.toLowerCase();
        let href = data.h;
        let path = href + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "/data" + path + "/0.json" );
        }
        else
        {
            /*let arrayCollection = this.loadedPaths[ path ];
            if( href.indexOf( "trailers" ) != -1 )
            {
                this.setProperty( "videosList", "dataProvider", arrayCollection );
            }
            else if( href.indexOf( "film" ) != -1 )
            {
                this.setProperty( "moviesList", "dataProvider", arrayCollection );
            }*/
        }
    }
    iconButtonClicked( href )
    {
        if( !this.loadedPaths[ href ] )
        {
            this.jsonLoader.load( "/data" + href + ".json" );
        }
    }
    loadComplete( data )
    {
        if( data )
        {
            console.log( data );
            if( data.path === "/film/genrer" )
            {
                let moviesGenresListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = moviesGenresListDataProvider;
                this.setProperty( "movieGenresList", "dataProvider", moviesGenresListDataProvider );
            }
            else if( data.path === "/trailers/genrer" )
            {
                let trailersGenresListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = trailersGenresListDataProvider;
                this.setProperty( "trailersGenresList", "dataProvider", trailersGenresListDataProvider );
            }
            else
            {
                let chunksObject;
                if( !this.loadedPaths[ data.path ] )
                {
                    chunksObject = {};
                    chunksObject.index = data.index;
                    chunksObject.total = data.total;
                    chunksObject.collection = new ArrayCollection( data.items );
                    this.loadedPaths[ data.path ] = chunksObject;
                }
                else
                {
                    chunksObject = this.loadedPaths[ data.path ];
                    chunksObject.index++;
                    chunksObject.collection.addItems( data.items );
                }
                if( data.path.indexOf( "film" ) != -1 )
                {
                    this.setProperty( "moviesList", "dataProvider", chunksObject.collection );
                }
                else if( data.path.indexOf( "trailers" ) != -1 )
                {
                    this.setProperty( "videosList", "dataProvider", chunksObject.collection );
                }
            }
            /*if( data.top === "trailers" )
            {
                this.trailersDataRecieved( data );
            }
            else if( data.top === "film" )
            {
                this.filmDataRecieved( data );
            }*/
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