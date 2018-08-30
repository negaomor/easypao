class MyShopView 
{
    renderInternals() {
        $('header').css("position","");
        $('header').css("width","");        

        $('.weekdays').hide();
        $('.box').hide();

       
        kendo.ui.progress($("#app-root"), true);
        var products = JSON.parse(localStorage.getItem("products"));
        if (products != null) {
            var productview = new ProductsView(new ProductsViewModel);
            productview.showProductsContainer(products, 1);
            productview.wireNavigationEvents(products);
        }
        else {
            var webapi = new WebApiHelper();
            webapi.getProducts('1');
        }

        this.setObjects();        

        $('.assinatura').focus();

        $('#productsFilter').change(function () {
            var webapi = new WebApiHelper();
            webapi.getProducts('1');
        });
    }

    setObjects() {
        //$('#spanRecentProjects').text(topograph.messages.dashboard.recentprojects);
        //$('#panel-area-title').text(topograph.messages.dashboard.title);
        //$('#pEquipament').text(topograph.messages.dashboard.equipament)
        //$('#pProjects').text(topograph.messages.dashboard.project)
        //$('#pSettings').text(topograph.messages.dashboard.settings)
    }

}
$(document).ready(() => {
    $('#shop-wrap').focus();
    $('.assinatura').focus();   
    var page = new MyShopView();
    page.renderInternals();    
});

