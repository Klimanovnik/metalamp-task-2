import "./like-button.scss";
import * as $ from "jquery";

$(function () {
    $(".like-button__title + .like-button__button").addClass("like-button__button_active");

    $(".like-button__button").on("click", function (event) {
        event.preventDefault();
        let isButtonActive = $(this).hasClass("like-button__button_active");

        let currentLikeButtonNumber = $(this).find(".like-button__number");

        if (isButtonActive) {
            currentLikeButtonNumber.text(`${+currentLikeButtonNumber.text() - 1}`);
            $(this).removeClass("like-button__button_active");
        } else {
            currentLikeButtonNumber.text(`${+currentLikeButtonNumber.text() + 1}`);
            $(this).addClass("like-button__button_active");
        }
    });

});