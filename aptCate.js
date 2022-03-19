$(document).ready(function () {
    $("#liarea").on("click", "li a", function () {
        var area = $(this).text();
        $("#room").prev().removeClass("disabled");
        $("#liarea")
            .prev()
            .html(area + ' <span class="caret"></span>');

        // call ajax here using area var as post data

        // Demo data
        var ajaxData = ["room 1", "room 2", "room 3"];
        var i, len;
        for (i = 0, len = ajaxData.length; i < len; i++) {
            $("#room").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + ajaxData[i] + "</a></li>");
        }
    });

    $("#room").on("click", "li a", function () {
        var room = $(this).text();
        $("#room")
            .prev()
            .html(room + ' <span class="caret"></span>');

        // any ajax call here
        alert(room + " selected");
    });
});
