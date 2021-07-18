import "./expandable-checkbox-list.scss";
import "./../checkbox/checkbox.js";

$(function () {

    $(".expandable-checkbox-list__title").on("click", function () {
        $(this).closest(".expandable-checkbox-list").toggleClass("expandable-checkbox-list_active");
    });

});