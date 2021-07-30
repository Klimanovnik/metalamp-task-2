import "./../calendar/calendar.js";
import "./filter-date-dropdown.scss";

$(function () {

    let activateAndDisable = function () {
        $(this).closest(".filter-date-dropdown").toggleClass("filter-date-dropdown_active");
    }

    $(".filter-date-dropdown__button").on("click", activateAndDisable);
    $(".calendar__apply", ".filter-date-dropdown").on("click", activateAndDisable);

    $(".calendar", ".filter-date-dropdown").on("click", function () {
        let calendarInputValue = $(this).find(".calendar__input")[0].value;
        let currentButton = $(this).closest(".filter-date-dropdown").find(".filter-date-dropdown__button")[0];

        if (calendarInputValue === "") {
            currentButton.textContent = "ДД.ММ - ДД.ММ";
        } else {
            currentButton.textContent = calendarInputValue;
        }

    });
});