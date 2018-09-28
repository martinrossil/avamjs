import BaseDialog from "./BaseDialog.js";
import DialogTopBar from "./DialogTopBar.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
export default class ActorDialog extends BaseDialog
{
    constructor()
    {
        super();
    }
    pathChanged()
    {
        if( this.path )
        {
            console.log( "ActorDialog", "pathChanged", this.path );
            if( !this.infoData[ this.path ] )
            {
                let url = window.location.origin + "/info/skuespillere/" + this.path + ".json";
                this.infoLoader.load( url );
            }
            else
            {
                let data = this.infoData[ this.path ];
                this.infoComplete( data );
            }
        }
    }
    infoComplete( data )
    {
        if( data )
        {
            this.dialogTopBar.title = data.title;
        }
    }
    initialize()
    {
        super.initialize();
        this.backgroundColor = Theme.APP_BACKGROUND_COLOR;
        this.createChildren();
    }
    createChildren()
    {
        // scroll
        this.addElement( this.dialogTopBar );
    }
    get dialogTopBar()
    {
        if( !this._dialogTopBar )
        {
            this._dialogTopBar = new DialogTopBar();
            this._dialogTopBar.layoutData = new AnchorLayoutData( 0, 0, 0 );
            this._dialogTopBar.backgroundColor = Theme.PRIMARY_COLOR;
        }
        return this._dialogTopBar;
    }
}
customElements.define("actor-dialog", ActorDialog);