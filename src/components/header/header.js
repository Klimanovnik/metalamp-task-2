import "./../_container-1160/container-1160.js";
import "./../button/button.js";
import "./header.scss";

$(function () {

    $(".header__link").on("click", function (event) {
        event.preventDefault();
    });

    $(".header__burger").on("click", function () {
        $(this).closest(".header").toggleClass("header_active");
    });

});