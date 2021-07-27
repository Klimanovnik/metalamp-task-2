import "./../button/button.js";
import "./../date-dropdown/date-dropdown.js";
import "./../dropdown/dropdown.js";
import "./book.scss";

$(function () {

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

});