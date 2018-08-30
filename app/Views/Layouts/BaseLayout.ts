/**
 * The base class for creating new Kendo Layouts.
 */
abstract class BaseLayout extends kendo.Layout {

    /**
     * Initializes a new instance of the class.
     * @param url The url from where the external template will be loaded.
     * @param content The element ID of the HTML element which contains the layout content.
     */
    constructor(private url: string, content: string) {
        super(content);
    }

    /**
     * Renders the layout.
     * @param container The placeholder element for the layout.
     */
    render(container?: any): JQuery {
        if (this.url != null) {
            var loader = new TemplateLoader();
            var result = loader.load([this.url]);

            if (!result.sucess) {
                $('body').append('<script type="text/x-kendo-template" id="' + this.content + '"><span>' + result.errorMessage + '</span></div>');
            }
        }

        var layout = super.render(container);
        this.renderInternals();

        return layout;
    }

    /**
     * Gives child-classes the opportunity to run custom initializations just after rendering the layout.
     */
    protected abstract renderInternals();

}
