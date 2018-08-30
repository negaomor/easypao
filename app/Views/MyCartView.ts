var cartItens: ProductModel[] = JSON.parse(sessionStorage.getItem("cartItens"));
var easyuser: UserModel = JSON.parse(sessionStorage.getItem("easyuser"));
class MyCartView {


    renderInternals() {
        $('#guest-checkout').hide()
        $('#confirm-checkout').hide();
        $('#deliverydata').hide();

        this.fillGrid();

        ///*-----------------
        //	RESIZE IMAGE
        //-----------------*/
        $("figure.imgLiquidFill").imgLiquid();

        $('.remove').click(function (e) {
            if (cartItens.length > 0) {
                $('#product-container').empty();
                cartItens = jQuery.grep(cartItens, function (value) {
                    return value.productId != e.target.id;
                });
                sessionStorage.setItem("cartItens", JSON.stringify(cartItens));
                var cart = new MyCartView();
                cart.fillGrid();
                var common = new CommonView();
                common.fillTotal();
            }
        });

        $('#btnlogincheckout').click(function (e) {

            kendo.ui.progress($(document.body), true);
            var register = new LoginWindowViewModel(this);
            register.onButtonLoginClick();
            var cart = new CommonView();
            cart.fillTotal();

        });

        $('#continue').click(function () {
            location.href = "#/shop";
        });

        $('.popup').click(function (e) {
            e.preventDefault();
            var button = $(this);

            // show form overlay
            $('.form-box-overlay').fadeIn(600);

            // hide previous form
            button.parents('.form-box').fadeOut(600);

            // show register form and focus
            if (button.hasClass('register')) {
                $('#registerDiv').show();
                $('.form-box.register').fadeIn(600);
                $('#register_name').focus();
            }
        });

        $("#saveData").click(function (e) {
            showFieds($(this).is(":checked"));
        })

        $('#submitOrder').on('click', function () {

            //if (easyuser.email == null) {
            $(".pagamento").show();
            $('#phone').kendoMaskedTextBox({ mask: "(99) 99999-9999" });
            $('#documentId').kendoMaskedTextBox({ mask: "999.999.999-99" });
            //}
            //else {
            //    var webapi = new WebApiHelper();
            //    var purchase = new Order();
            //    purchase.products = [];
            //    $.each(cartItens, function () {

            //        purchase.products.push(this);

            //    });
            //    //purchase.subscribePlan = 1;            
            //    //purchase.orderType = 1;
            //    //purchase.deliveryTime = 1;
            //    purchase.email = easyuser.email;
            //    //purchase.daysOfWeek: Array<number>;
            //    //purchase.deliveryDate: Date;
            //    kendo.ui.progress($("#app-root"), true);
            //    webapi.submitOrder(purchase);
            //    sessionStorage.removeItem("cartItem");
            //    sessionStorage.removeItem("easyuser");
            //    kendo.ui.progress($("#app-root"), false);
            //}
        });

        $("#createaccount").click(function () {
            $(".bill-to").show();
            $("#saveData").hide();
            $("#lblSaveData").hide();
            $(".login-form").hide();
            $(".form-one").show();
            $(".form-two").show();
            showFieds(true);
        })

        $("#expresscheckout").click(function () {
            $(".bill-to").show();
            $("#saveData").show();
            $("#lblSaveData").show();
            $(".login-form").hide();
            $(".form-one").show();
            $(".form-two").show();
            showFieds(false);
        })

        $("#logincheckout").click(function () {
            $(".bill-to").hide();
            $("#saveData").hide();
            $("#lblSaveData").hide();
            $(".login-form").show();
            $(".form-one").hide();
            $(".form-two").hide();
            showFieds(false);
            $("#txtPassword").prop("type", 'password');
        })

        $('.registerExpress').click(function () {
            var purchase = new PurchaseModel();


            if ($('#condominio').val() == "") {
                $("#registerExpressForm-two").kendoValidator().data("kendoValidator").validate();
                return;
            }

            if ($("#registerExpressForm-one").kendoValidator().data("kendoValidator").validate() &&
                ($("#registerExpressForm-two").kendoValidator().data("kendoValidator").validate()) &&

                ($("#deliveryDate").val() != "")) {

                var address = new AddressModel();
                address.condominioId = $("#condominio").val();
                address.apartment = $("#apartment").val();
                address.tower = $("#tower").val();
                address.mobile = $("#phone").val();
                purchase.address = address;

                var cartItens = JSON.parse(sessionStorage.getItem("cartItens"));
                purchase.products = new Array();
                $.each(cartItens, function () {
                    var product = new ProductModel();
                    product.productId = this.productId;
                    product.name = this.name;
                    product.qtd = this.qtd;
                    product.amount = this.amount;
                    purchase.products.push(product);
                });

                var webapi = new WebApiHelper();
                purchase.name = $("#name").val();
                purchase.email = $("#email").val();
                purchase.lastname = $("#lastname").val();
                purchase.deliveryDate = $("#deliveryDate").val();
                purchase.deliveryTime = $("#deliveryTime").kendoComboBox().val();
                purchase.discount = sessionStorage.getItem("discountValue") == null ? false : true;

                if ($("#expresscheckout").is(":checked")) {

                    purchase.express = true;
                }
                else {
                    purchase.documentId = $("#documentId").val();
                    purchase.password = $("#pwd").val();
                    purchase.confirmpassword = $("#confirmpwd").val();
                }

                webapi.purchase(purchase);
                sessionStorage.removeItem("cartItem");
                sessionStorage.removeItem("easyuser");
                var page = new CommonView();
                page.fillTotal();
            }
        })

        var d = new Date();
        d.setDate(d.getUTCDate() + 1);
        var day = d.getUTCDay() + 1;
        
        $("#deliveryDate").kendoDatePicker({
            value: d,
            min: new Date(d.getUTCFullYear(), d.getUTCMonth(), day),
            culture: "pt-BR"
        });

        $("#deliveryTime").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Manhã", value: 1 },
                { text: "Tarde", value: 2 },
                { text: "Noite", value: 3 }
            ],
            index: 0
        });

        function showFieds(show) {


            if (show) {
                $("#pwd").show();
                $("#pwd").attr("required", "required");
                $("#confirmpwd").show();
                $("#confirmpwd").attr("required", "required");
                $("#documentId").show();
                $("#documentId").attr("required", "required");

            } else {
                $("#pwd").hide();
                $("#pwd").removeProp("required");
                $("#confirmpwd").hide();
                $("#confirmpwd").removeProp("required");
                $("#documentId").hide();
                $("#documentId").removeProp("required");
            }
        }
    }

    fillGrid() {
        for (var i = 0; i < cartItens.length; i++) {
            $('#product-container').append(
                "<li>" +
                "<div class='circle tiny'>" +
                "<figure class='imgLiquidFill'>" +
                "<img src='images/" + cartItens[i].image + "' alt=" + cartItens[i].name + ">" +
                "</figure>" +
                "<div class='shadow'> </div>" +
                "<div class='fill'> </div>" +
                "</div>" +
                "<div class='description'>" +
                "<h6>" + cartItens[i].description + "</h6>" +
                "</div>" +
                "<h6 class='price-small'> Preço:</h6>" +
                "<h6> R$ <span>" + cartItens[i].amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + "</span></h6>" +
                "<div class='quantity'>" +
                "<div>" + cartItens[i].qtd + "</div>" +
                "<a href='javascript:void(0);' class='counter up'> </a>" +
                "<a href='javascript:void(0);' class='counter down'> </a>" +
                "</div>" +
                "<h6 class='subtotal-small'> Subtotal:</h6>" +
                "<h6> R$ <span>" + (cartItens[i].amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + "</span></h6>" +
                "<a href='javascript:void(0);' data-id=" + cartItens[i].productId + " class='remove'>" +
                "<img src='images/remove-cart.png' id='" + cartItens[i].productId + "' alt= 'remove'>" +
                "</a>" +
                "</li>");
        }
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
    if (cartItens == null) { window.location.href = "shop.html" }
    else {
        var page = new MyCartView();
        page.renderInternals();
    }
    if (easyuser == null) { easyuser = new UserModel(); }


});