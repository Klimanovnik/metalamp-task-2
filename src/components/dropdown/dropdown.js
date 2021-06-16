import "./dropdown.scss";
import "./dropdown__apply-clear/dropdown__apply-clear.js";
import "./dropdown__line/dropdown__line.js";
import * as $ from "jquery";

$(function () {

    // Dropdown Button
    $(".dropdown__button").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("dropdown__button_active");
        let closestDropdown = $(this).closest(".dropdown");
        closestDropdown.find(".dropdown__list").first().toggleClass("dropdown__list_invisible");
        closestDropdown.toggleClass("dropdown_shadow");
    });

    // Summation
    let summation = function () {
        let closestDropdown = $(this).closest(".dropdown");

        let dropdownNumberArray = closestDropdown.find(".dropdown__number");
        let sum = 0;

        for (let dropdownNumber of dropdownNumberArray) {
            sum = sum + Number($(dropdownNumber).text());
        }

        let currentDropdownButton = closestDropdown.find(".dropdown__button").first();
        let currentDropdownClear = closestDropdown.find(".dropdown__clear").first();

        if (sum > 0) {
            currentDropdownButton.text(`${sum} гостя`);
            if (currentDropdownClear) {
                currentDropdownClear.removeClass("dropdown__clear_invisible");
            }
        } else if (sum === 0) {
            currentDropdownButton.text("Сколько гостей");
            if (currentDropdownClear) {
                currentDropdownClear.addClass("dropdown__clear_invisible");
            }
        } else {
            currentDropdownButton.text("Отрицательное количество гостей !");
            if (currentDropdownClear) {
                currentDropdownClear.removeClass("dropdown__clear_invisible");
            }
        }
    };

    // Dropdown decrement & increment
    // Decrement
    $(".dropdown__decrement").on("click", function (event) {
        event.preventDefault();
        let dropdownNumber = $(this).closest(".dropdown__counter").find(".dropdown__number").first();

        if (Number(dropdownNumber.text()) > 0) {
            dropdownNumber.text(`${+dropdownNumber.text() - 1}`);
        }

        summation.call(this);
    });

    // Increment
    $(".dropdown__increment").on("click", function (event) {
        event.preventDefault();
        let dropdownNumber = $(this).closest(".dropdown__counter").find(".dropdown__number").first();

        if (Number(dropdownNumber.text()) < 999) {
            dropdownNumber.text(`${+dropdownNumber.text() + 1}`);
        }

        summation.call(this);
    });

    // ApplyClearButtons
    $(".dropdown__clear").on("click", function (event) {
        event.preventDefault();
        $(this).closest(".dropdown__list").find(".dropdown__number").text("0");
        summation.call(this);
    });

    $(".dropdown__apply").on("click", function (event) {
        event.preventDefault();
        let closestDropdown = $(this).closest(".dropdown");
        closestDropdown.find(".dropdown__button").removeClass("dropdown__button_active");
        closestDropdown.find(".dropdown__list").addClass("dropdown__list_invisible");
        closestDropdown.removeClass("dropdown_shadow");
    });
});