export default class Colors
{
    static get AMBER_200()      {return "#FFE082";};
    static get AMBER_500()      {return "#FFC107";};
    static get AMBER_700()      {return "#FFA000";};

    static get BLACK()          {return "#000000";}

    static get BLUE_100()       {return "#BBDEFB";};
    static get BLUE_500()       {return "#2196F3";};
    static get BLUE_900()       {return "#0D47A1";};

    static get GREEN_200()      {return "#A5D6A7";};
    static get GREEN_500()      {return "#4CAF50";};
    static get GREEN_700()      {return "#388E3C";};

    static get GREY_200()       {return "#EEEEEE";}
    static get GREY_300()       {return "#E0E0E0";}
    static get GREY_400()       {return "#BDBDBD";}
    static get GREY_800()       {return "#424242";}
    static get GREY_900()       {return "#212121";}

    static get PINK_500()       {return "#E91E63";};

    static get RED_200()        {return "#EF9A9A";};
    static get RED_500()        {return "#F44336";};
    static get RED_700()        {return "#D32F2F";};
    
    static get WHITE()          {return "#FFFFFF";};

    static get RANDOM_COLOR()   {return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);};
}