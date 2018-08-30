class MainNavigationBarView extends BaseView {

    constructor(protected viewModel: MainNavigationBarViewModel) {
        super('../Content/templates/MainNavigationBarView.tmpl.html',
            '#template-main-navigation-bar-view',
            viewModel);
    }

    renderInternals() {
        //$(function () {

        //    function displayLoading(target) {
        //        var element = $(target);
        //        kendo.ui.progress(element, true);
        //        setTimeout(function () {
        //            kendo.ui.progress(element, false);
        //        }, 2000);
        //    }

        //    $(":button").click(function () {
        //        displayLoading(document.body);
        //    });
        //    $("a").click(function () {
        //        displayLoading(document.body);
        //    });
        //    $("span").click(function () {
        //        displayLoading(document.body);
        //    });

        //    //$(document).bind('keydown', (e) => {
        //    //    if (e.keyCode == kendo.keys.ENTER) {
        //    //        displayLoading(document.body);
        //    //    }
        //    //});      
        //});

        this.viewModel.onSetUser();
        //var menu = $('#nav-bar-menu-user');
        var menu = $('#functionality-dropdown');
        var data = {
            menu: this.viewModel.dataSource
        };
        //Fixed menu equipament
        var menuEquipament = function () {
            var item = $("<li>")
                .append(
                $("<a>", {
                    href: '/#/' + 'equipament',
                    //html: topograph.messages.dashboard.myequipament
                }));
            return item;
        }
        //Fixed menu projects
        var menuProject = function () {
            var item = $("<li>")
                .append(
                $("<a>", {
                    href: '/#/' + 'projects',
                   // html: topograph.messages.dashboard.myproject
                }));
            return item;
        }
        //Fixed menu profile
        var menuProfile = function () {
            var item = $("<li>")
                .append(
                $("<a>", {
                    href: '/#/' + 'myprofile',
                    //html: topograph.messages.dashboard.viewprofile
                }));
            return item;
        }
        //Fixed menu Settings
        var menuSettings = function () {
            var item = $("<li>")
                .append(
                $("<a>", {
                    href: '/#/' + 'settings',
                    //html: topograph.messages.dashboard.settings
                }));
            return item;
        }
        //Fixed menu profile
        var menuSignOut = function () {
            var item = $("<li>", { class: "k-item k-state-default k-last" })
                .append(
                $("<a>", {
                    href: '\#/',
                    'onclick': 'app.getView("main-navigation-bar-view").onLogoutClick()',
                    //html: topograph.messages.dashboard.signout
                }));
            return item;
        }

        var getMenuItem = function (itemData) {

            var item = $("<li>")
                .append(
                $("<a>", {
                    href: '/#/' + itemData.link,
                    html: itemData.name
                }));
            if (itemData.sub) {
                var subList = $("<ul>");
                $.each(itemData.sub, function () {
                    subList.append(getMenuItem(this));
                });
                item.append(subList);
            }
            return item;
        };

        //Fixed menu
        menu.append(menuProfile);
        //Fixed menu
        menu.append(menuProject);
        //Fixed menu
        menu.append(menuEquipament);

        if (data.menu != undefined) {
            $.each(data.menu, function () {
                menu.append(
                    getMenuItem(this)
                );
            });
        }
        //Fixed menu
        menu.append(menuSignOut);

    }

    onLogoutClick() {

        kendo.ui.progress($('#single-panel-layout'), true);
        if (app.user != null) {
            app.user = null;
        }
        document.cookie = '__WebApiAuthenticationToken' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        window.location.assign('/');
    }

}
