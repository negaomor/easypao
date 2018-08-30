class MyDashBoardViewModel extends BaseViewModel {
    dataSource: kendo.data.DataSource;

    constructor() {
        super();
    }

    refresh() {

        var source = null;//this.loadProjects();

        //this.dataSource = new kendo.data.DataSource({
        //    data: source.data,
        //    pageSize: 5,
        //    page: 1,
        //    schema: {
        //        model: {
        //            id: "id",
        //            fields: {
        //                Id: { type: "string", nullable: true },
        //                accountId: { type: "string", nullable: true },
        //                projectId: { type: "string", nullable: true },
        //                name: { type: "string", nullable: true },
        //                projectName: { type: "string", nullable: true },
        //                parentId: { field: "reportsTo", nullable: true },
        //                description: { type: "string", nullable: true },
        //                favorite: { type: "boolean", nullable: true },
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