import AppBarsVisibilityLogic from "./AppBarsVisibilityLogic.js";
import TopLevelNavigationLogic from "./TopLevelNavigationLogic.js";
import TrailerPlaybackLogic from "./TrailerPlaybackLogic.js";
import ShowMovieInfoLogic from "./ShowMovieInfoLogic.js";
import FilterByGenreLogic from "./FilterByGenreLogic.js";
import DataModelLogic from "./DataModelLogic.js";
import DataLogic from "./DataLogic.js";
import ShowHideUILogic from "./ShowHideUILogic.js";
import HistoryLogic from "./HistoryLogic.js";
import ShowHideDrawersAndMenusLogic from "./ShowHideDrawersAndMenusLogic.js";
import TopNavigationLogic from "./TopNavigationLogic.js";
import DrawersDataLoadLogic from "./DrawersDataLoadLogic.js";
import ListsDataLoadLogic from "./ListsDataLoadLogic.js";
export default class BusinessLogic
{
    constructor()
    {
        //new AppBarsVisibilityLogic();
        //new TopLevelNavigationLogic();
        //new TrailerPlaybackLogic();
        //new ShowMovieInfoLogic();
        //new FilterByGenreLogic();
        //new DataModelLogic();
        //new ShowHideUILogic();
        //new DataLogic();
        //new HistoryLogic();
        new TopNavigationLogic();
        new ListsDataLoadLogic();
        new ShowHideDrawersAndMenusLogic();
        new DrawersDataLoadLogic();
    }
}