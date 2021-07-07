import "./../checkbox/checkbox.js";
import "./expandable-checkbox-list.scss";
import * as $ from "jquery";

$(function () {

    $(".expandable-checkbox-list__title").on("click", function () {
        $(this).closest(".expandable-checkbox-list").toggleClass("expandable-checkbox-list_active");
    });

    $(".checkbox:nth-child(2), .checkbox:nth-child(3), .checkbox:nth-child(4)", ".expandable-checkbox-list__list").find(".checkbox__button").attr("checked", true);
});