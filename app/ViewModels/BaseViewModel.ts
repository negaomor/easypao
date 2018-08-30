/**
 * The base class for creating a view model.
 */
abstract class BaseViewModel extends kendo.data.ObservableObject {

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        super();
        super.init(this);

    }

    /**
     * Gives the view model a oportunity to refresh. This method is called by "BaseView" just before rendering a view.
     */
    abstract refresh();

}