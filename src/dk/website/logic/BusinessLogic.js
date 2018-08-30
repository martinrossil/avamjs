import AppBarsVisibilityLogic from "./AppBarsVisibilityLogic.js";
import TopLevelNavigationLogic from "./TopLevelNavigationLogic.js";
import TrailerPlaybackLogic from "./TrailerPlaybackLogic.js";
import ShowMovieInfoLogic from "./ShowMovieInfoLogic.js";
import FilterByGenreLogic from "./FilterByGenreLogic.js";
import DataModelLogic from "./DataModelLogic.js";
export default class BusinessLogic
{
    constructor()
    {
        new AppBarsVisibilityLogic();
        new TopLevelNavigationLogic();
        new TrailerPlaybackLogic();
        new ShowMovieInfoLogic();
        new FilterByGenreLogic();
        new DataModelLogic();
    }
}