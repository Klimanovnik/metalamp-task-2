import "./../calendar/calendar.js";
import "./date-dropdown.scss";

$(function () {

    let activateAndDisable = function () {
        $(this).closest(".date-dropdown").toggleClass("date-dropdown_active");
    }

    $(".date-dropdown__button").on("click", activateAndDisable);
    $(".calendar__apply", ".date-dropdown").on("click", activateAndDisable);

    let ddCalendarArray = $(".calendar", ".date-dropdown");

    for (let ddCalendar of ddCalendarArray) {
        $(ddCalendar).data("datepicker").update({
            altFieldDateFormat: "dd.mm.yyyy",
        });
    }

    $(".calendar", ".date-dropdown").on("click", function () {
        let calendarInputValue = $(this).find(".calendar__input")[0].value;
        let firstButton = $(this).closest(".date-dropdown").find(".date-dropdown__button_first")[0];
        let secondButton = $(this).closest(".date-dropdown").find(".date-dropdown__button_second")[0];

        calendarInputValue = calendarInputValue.split(" - ");

        if (calendarInputValue.length === 2) {

            firstButton.textContent = calendarInputValue[0];
            secondButton.textContent = calendarInputValue[1];

        } else if (calendarInputValue.length === 1) {

            secondButton.textContent = "ДД.ММ.ГГГГ";

            if (calendarInputValue[0] === "") {
                firstButton.textContent = "ДД.ММ.ГГГГ";
            } else {
                firstButton.textContent = calendarInputValue[0];
            }

        }

    });

});