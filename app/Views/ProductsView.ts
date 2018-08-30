var cartItens: ProductModel[] = JSON.parse(sessionStorage.getItem("cartItens"));
var products: Array<ProductModel> = JSON.parse(localStorage.getItem("products"));


class ProductsView extends BaseView {
    
    constructor(public viewModel: ProductsViewModel) {
        super('./Content/templates/RegionView.tmpl.html',
            '#template-region-view',
            viewModel);
    }

    renderInternals() {
        $('.assinatura').focus();
        $('#precheckout').hide();
        
    }

    showProductsContainer(sourceData, category) {
        var instance = this;

        for (var i = 0; i <= (<any>sourceData).length - 1; i++) {

            sourceData[i].valor = sourceData[i].amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }

        var productsData = sourceData.filter(function (e) {
            return e.categoryId == parseInt(category);
        });

        this.viewModel.dataSource = new kendo.data.DataSource({
            data: productsData,
            pageSize: 10,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "string", nullable: true },
                        name: { type: "string", nullable: true },
                        descricao: { type: "string", nullable: true },
                        valor: { type: "string", nullable: true }
                    }
                }
            }
        });

        if ($('#productsContainer').length > 0) {
            $('#productsContainer').kendoGrid().empty();

            $('#productsContainer').kendoListView({
                dataSource: this.viewModel.dataSource,
                template: kendo.template($("#template-product").html()),

            });

            $(".k-grid-header").hide();
            $(".k-grid .k-grid-header").hide();
            $(".k-grid-content").removeClass();
            $(".dishes").removeClass("k-widget");

            ///*-----------------
            //	RESIZE IMAGE
            //-----------------*/
            $("figure.imgLiquidFill").imgLiquid();
            kendo.ui.progress($("#app-root"), false);
            $('.assinatura').focus();
        }

        $(".adicionar").click(function () {
            instance.prepareProductstoIncrement(this.id, 1);
        });
    }

    wireNavigationEvents(products) {
        var instance = this;
      

        $(".assinatura").click(function () {
            $('#days').show();
            $('.weekdays').show();
        });
        $(".avulso").click(function () {
            $(".weekdays").hide();
        });
        $("#details").click(function () {
            if ($('#deliverys').is(":visible"))
                $('#deliverys').hide();
            else
                $('#deliverys').show();
        });

        $(".breakfast").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            
            instance.showProductsContainer(products, '2');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".bread").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '1');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".cake").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '3');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".juice").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '4');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".glutenfree").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '5');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".coldcuts").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '6');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".fruit").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '7');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        $(".detox").click(function (e) {
            kendo.ui.progress($("#shop-wrap"), true);
            instance.showProductsContainer(products, '8');
            kendo.ui.progress($("#shop-wrap"), false);
        });

        //$("input[name='checkWeekDay']").click(function () {

        //    var subscribes = cartItens.filter(function (e) {
        //        e.orderType == 1;
        //        return true;
        //    });
        //    if (subscribes.length > 0)
        //        $.each(subscribes, function () {
        //            page.prepareProductstoIncrement(this.productId, 0);
        //        });
        //});       
    }

    prepareProductstoIncrement(productId, qtd) {
        var days = "";
        if ($('#chkMon').is(":checked")) { days += "1," };
        if ($('#chkTue').is(":checked")) { days += "2," };
        if ($('#chkWed').is(":checked")) { days += "3," };
        if ($('#chkThu').is(":checked")) { days += "4," };
        if ($('#chkFri').is(":checked")) { days += "5," };
        if ($('#chkSat').is(":checked")) { days += "6," };
        if ($('#chkSun').is(":checked")) { days += "7," };
        if ($('#chkAll').is(":checked")) { days += "0" };

        var avulso = $('.avulso').is(":checked");
        var assinatura = $('.assinatura').is(":checked");

        if (!avulso && !assinatura) {
            alert('Você gostaria de fazer uma assinatura ou um pedido avulso?');
            $('.assinatura').focus();
            return false;
        }

        var orderType = avulso == true ? 0 : 1;

        if (days != "" || avulso) {
            this.incrementProducts(productId, days, qtd, orderType);
        }
        else {
            alert('Favor selecionar quais dias da semana gostaria de receber!');
        }
    }

    incrementProducts(productId, days, qtd, orderType) {
        $(this).fadeIn();
        kendo.ui.progress($(document.body), true);


        var api = new WebApiHelper();
        var products = new Array<ProductModel>();
        var product = new ProductModel();
        var _order = new OrderCalculate();
        _order.DaysOfWeek = new Array<number>();
        product.daysOfWeek = new Array<number>();
        if (cartItens == null) { cartItens = new Array<ProductModel>(); }

        if ($('.assinatura').is(":checked")) {

            if (days != "") {
                var daysofweek = new Array(days);
                if (days.substring(days.length - 1) == ",") {
                    days = days.substring(0, days.length - 1)
                }

                var lowEnd = Number(days.split(',')[0]);
                var highEnd = days.split(',').length;

                for (var i = lowEnd; i <= highEnd; i++) {
                    _order.DaysOfWeek.push(i);
                    product.daysOfWeek.push(i);
                }
            }
            product.subscribedType = 30;
            _order.SubscribedType = 30;
        }
        product.orderType = orderType;
        _order.OrderType = orderType;

        var prod = JSON.parse(localStorage.getItem("products")).filter(
            function (e: any) {
                return e.id == productId;
            });

        product.qtd = qtd;
        product.productId = productId;
        product.image = prod[0].image; // Image of product
        product.name = prod[0].name; // Name of product
        product.cost = prod[0].cost; // Unit Cost of product
        product.amount = prod[0].amount;
        product.description = prod[0].description; // Unit Cost of product

        this.productAnalystic(productId);

        product.deliveryTime = 1;
        _order.DeliveryTime = 1;
        products.push(product);
        _order.Products = products

        var existProduct;
        if (cartItens.length > 0) {
            var totalproducts = cartItens.length - 1;
            var currentProductId = product.productId;

            if ($('.assinatura').is(":checked")) {
                existProduct = cartItens.filter(
                    function (e: ProductModel) {
                        return e.productId == currentProductId && e.orderType == product.orderType;
                        //Retirei verificação para os dias selecionados do mesmo produto quando assinatura
                        // && e.daysOfWeek.toString() == product.daysOfWeek.toString();
                    });
            }
            else {
                existProduct = cartItens.filter(
                    function (e) {
                        return e.productId == currentProductId && e.orderType == product.orderType;
                    });
            }
            if (existProduct.length == 0) {
                //Includew new order
                for (var i = 0; i <= cartItens.length - 1; i++) {
                    _order.Products.push(cartItens[i])
                }
                if (product.qtd == 0 || product.qtd == undefined)
                    cartItens[i].qtd = 1;

                cartItens.push(product);
                sessionStorage.setItem("cartItens", JSON.stringify(cartItens));
            }
            else {
                //Increment avulso order on existent product
                if (existProduct[0].orderType == product.orderType) {

                    product.qtd += existProduct[0].qtd;
                    existProduct[0].qtd = product.qtd;
                    _order.Products = existProduct;
                }
                else {

                    for (var i = 0; i <= cartItens.length - 1; i++) {
                        _order.Products.push(cartItens[i])
                    }

                }
                //for (var i = 0; i <= cartItens.length - 1; i++) {
                //    if (cartItens[i].productId == existProduct[0].productId) {
                //        cartItens[i].daysOfWeek = product.daysOfWeek;
                //        cartItens[i].qtd = existProduct[0].qtd;
                //    }
                //}
                sessionStorage.setItem("cartItens", JSON.stringify(cartItens));
            }
        }
        else {
            if (product.qtd == 0 || product.qtd == undefined)
                product.qtd = 1;

            cartItens.push(product);
            sessionStorage.setItem("cartItens", JSON.stringify(cartItens));
        }

        api.calculateOrder(_order);
    }

    showCalculatedProducts(orderResult) {

        this.showPreCheckout(orderResult);

        for (var i = 0; i <= orderResult.produtos.length - 1; i++) {
            //for (var b = 0; b <= widthLine; b++) {
            //    orderResult.produtos[i].descricao = orderResult.produtos[i].descricao + "."
            //    b = orderResult.produtos[i].descricao.length;
            //}

            cartItens.filter(
                function (e) {
                    if (e.productId == orderResult.produtos[i].productId && e.orderType == orderResult.produtos[i].orderType) {
                        e.description = orderResult.produtos[i].descricao;
                        e.amount = orderResult.produtos[i].valor;
                        e.qtd = orderResult.produtos[i].qtd;
                    }
                    return true;
                });

            orderResult.produtos[i].valor = orderResult.produtos[i].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }
        sessionStorage.setItem("cartItens", JSON.stringify(cartItens));
        this.showDeliveryItens(orderResult.produtos);
        $('.item-entrega').show();
        $('.fazer-pedido').show();
        $('.unit').val('');

        var dialog = new CartDialog(new ProductsViewModel());
        dialog.render("#dialogCart");

        var notificationWidget = $("#dialogCart").kendoNotification({
            button: true,
            hideOnClick: false,
            autoHideAfter: 100000,
            height: 200,
            position: {
                top: 100,
                left: window.innerWidth / 2.5
            },

        }).data("kendoNotification");

        notificationWidget.show($("#template-go-to-cart-dialog").html(), "success");

        $('.keepon').off();
        $('.keepon').click(function () {
            notificationWidget.hide();
        })

        $('.gotocart').off();
        $('.gotocart').click(function () {
            location.href = "checkout.html";
        })


        kendo.ui.progress($("#shop-wrap"), false);
    };

    showPreCheckout(orderResult) {
        $('.total-soma').html("R$ " + orderResult.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
        $('.quant-soma').html(orderResult.quantidade + " unidade(s)");
        $('.sum-amout').html("R$ " + orderResult.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
        $('.sum-qtd').html(orderResult.quantidade);
        $('#sum-cart').html(orderResult.quantidade);
        $('#precheckout').show();
    };

    showDeliveryItens(products) {

        var dataSource = new kendo.data.DataSource({
            data: products,
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
        $('#deliverys').html('');
        $('#deliverys').kendoGrid({
            dataSource: dataSource,
            rowTemplate: kendo.template("<div class='item-entrega ng-scope'><div class='quant'>#: qtd# un ..............</div>" +
                "<div class='nome'>#: descricao#</div>" +
                "<div class='total' > R$ #: valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })# </div>" +
                "<div class='delete'><a title='Excluir item' ></a></div></div>"),
            messages: {
                noRecords: "Click here to find your company's projects"
            }
        });
        $("#deliverys .k-grid-header").css('display', 'none');
        $("#deliverys .k-grid-content").css('height', 'auto');
        $(".k-grid-content").removeClass();

        $('.delete').click(function () {
            var page = new IndexPage();

        });

        $('#gridOrder').kendoGrid().empty();
        $('#gridOrder').kendoGrid({ dataSource: [] });
        $('#gridOrder').kendoGrid({
            dataSource: dataSource,
            rowTemplate: kendo.template("<div class='nome menor'>#: descricao# R$#: valor#</div>"),
            messages: {
                noRecords: "Click here to find your company's projects"
            }
        });
        $("#gridOrder .k-grid-header").css('display', 'none');
        $("#gridOrder .k-grid-content").css('height', 'auto');
        $(".k-grid-content").removeClass();
    };

    showCategory() {


        if ($('#productsContainer').hide())
            $('#productsContainer').show();
        else
            $('#productsContainer').hide();

    }

    productAnalystic(productId) {
        var webapi = new WebApiHelper();
        //Save the product clicked
        var ip;
        $.ajaxSetup({ async: false });
        $.getJSON("http://jsonip.com?callback=?", function (data) {
            ip = data.ip;            
            data = { ProductId: productId, Ip: ip }
            webapi.productAnalystic(data);                       
        })
    }
}
$(document).ready(() => {
    if (cartItens == null) { cartItens = new Array<ProductModel>(); }
    $('.assinatura').focus();
});