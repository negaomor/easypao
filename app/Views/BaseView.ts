/**
 * The base class for creating new Kendo Views.
 */
abstract class BaseView extends kendo.View {

    /**
     * Initializes a new instance of the class.
     * @param url The url from where the external Kendo template will be loaded.
     * @param content The id of an existing script element which defines the Kendo template.
     * @param viewModel The view model which will be bound to this view.
     */
    constructor(private url: string, content: string, protected viewModel: BaseViewModel) {
        super(content, <kendo.ViewOptions>{ model: viewModel, evalTemplate: true });
    }

    /**
     * Renders the view.
     * @param container The placeholder element for the view.
     */
    render(container?: any): JQuery {
        // Load the external Kendo template
        if (this.url != null) {
            var loader = new TemplateLoader();
            var result = loader.load([this.url]);

            if (!result.sucess) {
                $('body').append('<script type="text/x-kendo-template" id="' + this.content + '"><span>' + result.errorMessage + '</span></div>');
            }
        }

        // Refresh the view model
        this.viewModel.refresh();

        // Render the view
        var view = super.render(container);

        // Allow custom rendering by the child class
        this.renderInternals();               

        return view;
    }

    /**
     * Gives child-classes the opportunity to run custom initializations just after rendering the view.
     */
    protected abstract renderInternals();

    permission(userId?: any): JQuery {
    
            return
    };


}
