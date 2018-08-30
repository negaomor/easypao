class Message {

    static showMessage(element: string, description: string, type: string) {

        var staticNotification = $("#Notification").kendoNotification({
            appendTo: element, autoHideAfter: 10000
        }).data("kendoNotification");

        staticNotification.show(description, type);
    }
}