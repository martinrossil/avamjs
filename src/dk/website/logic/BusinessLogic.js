import AppBarsVisibilityLogic from "./AppBarsVisibilityLogic.js";
import ShowHideDrawersAndMenusLogic from "./ShowHideDrawersAndMenusLogic.js";
import TopNavigationLogic from "./TopNavigationLogic.js";
import DrawersDataLoadLogic from "./DrawersDataLoadLogic.js";
import ListsDataLoadLogic from "./ListsDataLoadLogic.js";
export default class BusinessLogic
{
    constructor()
    {
        new AppBarsVisibilityLogic();
        new TopNavigationLogic(); 
        new ListsDataLoadLogic();
        new ShowHideDrawersAndMenusLogic();
        new DrawersDataLoadLogic();
    }
}