class OrderViewModel extends BaseViewModel {
    name: string;
    description: string;
    projectId: string;
    dataSource: kendo.data.DataSource;

    constructor() {
        super();
    }

    refresh() {

    }

    loadProducts(category): WebApiResult {

        var webapi = new WebApiHelper();

        var result = webapi.getProducts(category);

        return result;
    }


}