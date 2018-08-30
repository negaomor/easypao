class ProductsViewModel extends BaseViewModel {
    name: string;
    description: string;
    projectId: string;
    dataSource: kendo.data.DataSource;

    constructor() {
        super();
    }

    refresh() {

    }

    loadProducts(category: string): WebApiResult {

        var webapi = new WebApiHelper();

        var result = webapi.getProducts(category);

        this.dataSource = new kendo.data.DataSource({
            data: result.data,
            pageSize: 10,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "string", nullable: true },
                        descricao: { type: "string", nullable: true },
                        valor: { type: "string", nullable: true }
                    }
                }
            }
        });

        return result;
    }

    getProductsContainer(category: string) {
        var order = new OrderViewModel();

        var sourceData = this.loadProducts(category).data;
    }

    
}