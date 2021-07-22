import "./../checkbox/checkbox.js";
import "./expandable-checkbox-list.scss";

$(function () {

    $(".expandable-checkbox-list").find(".checkbox__title").addClass("expandable-checkbox-list__checkbox-title");

    $(".expandable-checkbox-list__title").on("click", function () {
        $(this).closest(".expandable-checkbox-list").toggleClass("expandable-checkbox-list_active");
    });

});