class MyCartViewModel extends BaseViewModel {
    dataSource: kendo.data.DataSource;

    constructor() {
        super();
    }

    refresh() {

        //var source = app.productsTemp;

        //this.dataSource = new kendo.data.DataSource({
        //    data: source,
        //    pageSize: 5,
        //    page: 1,
        //    schema: {
        //        model: {
        //            id: "id",
        //            fields: {
        //                Id: { type: "string", nullable: true },
        //                descricao: { type: "string", nullable: true },
        //                valor: { type: "string", nullable: true }                        
        //            }
        //        }
        //    }
        //});

    }

    //loadProjects(project?: ProjectModel): WebApiResult {

    //    var webapi = new WebApiHelper();

    //    if (project == null) { project = new ProjectModel }

    //    var result = webapi.getUserProjects(project);

    //    return result;
    //}

}