import "./../button/button.js";
import "./../date-dropdown/date-dropdown.js";
import "./../dropdown/dropdown.js";
import "./book.scss";

$(function () {

    let counting = function () {
        let perDayArray = $(".book__counting-per-day");

        for (let perDay of perDayArray) {
            let perDayValue = +perDay.querySelector(".book__counting-per-day-value").textContent;
            let days = parseFloat(perDay.closest(".book__counting-text").querySelector(".book__counting-days").textContent);
            perDay.closest(".book__counting-item").querySelector(".book__counting-result-value-common").textContent = perDayValue * days;
        }

        let countingArray = $(".book__counting");

        for (let counting of countingArray) {
            let common = +counting.querySelector(".book__counting-result-value-common").textContent;
            let discont = +counting.querySelector(".book__counting-services-discount-value").textContent;
            let services = +counting.querySelector(".book__counting-result-value-services").textContent;
            let extraServices = +counting.querySelector(".book__counting-result-value-extra-services").textContent;
            let sum = counting.querySelector(".book__counting-result-value-summary");
            sum.textContent = common - discont + services + extraServices;
        }
    };


    counting();

    $(".calendar", ".book").on("click", function (event) {
        let firstButton = $(event.currentTarget).closest(".date-dropdown").find(".date-dropdown__button_first");
        let secondButton = $(event.currentTarget).closest(".date-dropdown").find(".date-dropdown__button_second");

        firstButton = firstButton.text().split(".");
        secondButton = secondButton.text().split(".");

        let allIsNumber = true;

        for (let item of firstButton) {
            if (isNaN(item)) {
                allIsNumber = false;
                break;
            }
        }

        if (allIsNumber === true) {
            for (let item of secondButton) {
                if (isNaN(item)) {
                    allIsNumber = false;
                    break;
                }
            }
        }

        if (allIsNumber === true) {
            firstButton = firstButton.reverse().join("-");
            secondButton = secondButton.reverse().join("-");

            let dateRange = new Date(secondButton) - new Date(firstButton);
            dateRange = dateRange / (1000 * 60 * 60 * 24);

            $(event.currentTarget).closest(".book").find(".book__counting-days").first().text(`${dateRange} cуток`);

            counting();
        }
    });

});