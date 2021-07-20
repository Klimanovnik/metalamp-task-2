import "./like-button.scss";

$(function () {

    let likeButtonNumberArray = $(".like-button__number");

    for (let likeButtonNumber of likeButtonNumberArray) {
        if (+likeButtonNumber.textContent <= 0) {
            if (likeButtonNumber.closest(".like-button__button").classList.contains("like-button__button_active")) {
                likeButtonNumber.textContent = "1";
            } else {
                likeButtonNumber.textContent = "0";
            }
        } else if (+likeButtonNumber.textContent >= 999) {
            if (likeButtonNumber.closest(".like-button__button").classList.contains("like-button__button_active")) {
                likeButtonNumber.textContent = "999";
            } else {
                likeButtonNumber.textContent = "998";
            }
        }
    }

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