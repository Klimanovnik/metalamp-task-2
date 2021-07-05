import "./../checkbox/checkbox.js";
import "./expandable-checkbox-list.scss";
import * as $ from "jquery";

$(function () {

    $(".expandable-checkbox-list__title").on("click", function () {
        $(this).closest(".expandable-checkbox-list").find(".expandable-checkbox-list__list").first().toggleClass("expandable-checkbox-list__list_invisible");
    });

    $(".checkbox:nth-child(2), .checkbox:nth-child(3), .checkbox:nth-child(4)", ".expandable-checkbox-list__list").addClass("checkbox_active-default");
    $(".checkbox_active-default").find(".checkbox__button").attr("checked", true);
});