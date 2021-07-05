import "./small-dropdown.scss";
import "./small-dropdown__line/small-dropdown__line.js";
import * as $ from "jquery";

$(function () {

    // Small Dropdown Button
    $(".small-dropdown__button").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("small-dropdown__button_active");
        let closestDropdown = $(this).closest(".small-dropdown");
        closestDropdown.find(".small-dropdown__list").first().toggleClass("small-dropdown__list_invisible");
        closestDropdown.toggleClass("small-dropdown_shadow");
    });

    // Summation
    $(".small-dropdown__counter").on("changeNumberValue", function () {
        let closestDropdown = $(this).closest(".small-dropdown");

        let dropdownNumberArray = closestDropdown.find(".small-dropdown__number");
        let sum = 0;

        let bedRoomString = "";

        for (let dropdownNumber of dropdownNumberArray) {
            sum = sum + Number($(dropdownNumber).text());
            bedRoomString = bedRoomString + $(dropdownNumber).text() + " " + $(dropdownNumber).closest(".small-dropdown__line").find(".small-dropdown__line-title").first().text() + ", ";
        }

        bedRoomString = bedRoomString.split("");
        bedRoomString.pop();
        bedRoomString.pop();
        bedRoomString = bedRoomString.join("");
        bedRoomString = bedRoomString.slice(0, 20) + "...";

        let currentDropdownButton = closestDropdown.find(".small-dropdown__button").first();

        if (sum > 0) {
            currentDropdownButton.text(`${bedRoomString}`);
        } else if (sum === 0) {
            currentDropdownButton.text("Сколько спальных мест");
        } else {
            currentDropdownButton.text("Отрицательное количество !");
        }
    });


    let counterArray = document.querySelectorAll(".small-dropdown__counter");

    for (let counter of counterArray) {
        counter.dispatchEvent(new Event("changeNumberValue"));
    }

});