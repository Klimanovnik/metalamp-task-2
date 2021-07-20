import "./rate-button.scss";

$(function () {

    $(".rate-button__stars").on("click", function (event) {
        event.preventDefault();
        let isStarActive = $(this).hasClass("rate-button__stars_active");

        if (isStarActive) {
            $(this).nextAll().removeClass("rate-button__stars_active");
            $(this).removeClass("rate-button__stars_active");
        } else {
            $(this).prevAll().addClass("rate-button__stars_active");
            $(this).addClass("rate-button__stars_active");
        }
    });

});