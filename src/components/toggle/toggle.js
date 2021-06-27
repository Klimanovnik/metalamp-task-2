import "./toggle.scss";
import * as $ from "jquery";
import { find } from "domutils";

$(function () {
    $(".toggle__title + .toggle__label").find(".toggle__checkbox").attr("checked", true);
});