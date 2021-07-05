import "./small-dropdown__line.scss";
import * as $ from "jquery";

$(function () {
    // Dropdown decrement & increment
    $(".small-dropdown__increment, .small-dropdown__decrement").on("click", function (event) {
        event.preventDefault();
        let dropdownNumber = $(this).closest(".small-dropdown__counter").find(".small-dropdown__number").first();
        let isChangeNumberValue = false;

        if ($(this).hasClass("small-dropdown__increment") && Number(dropdownNumber.text()) < 999) {
            dropdownNumber.text(`${+dropdownNumber.text() + 1}`);
            isChangeNumberValue = true;
        } else if ($(this).hasClass("small-dropdown__decrement") && Number(dropdownNumber.text()) > 0) {
            dropdownNumber.text(`${+dropdownNumber.text() - 1}`);
            isChangeNumberValue = true;
        }

        if (isChangeNumberValue) {
            dropdownNumber.closest(".small-dropdown__counter")[0].dispatchEvent(new Event("changeNumberValue"));
        }
    });

    $(".small-dropdown__counter").on("changeNumberValue", function () {
        let closestDecrement = $(this).find(".small-dropdown__decrement").first();
        if (+$(this).find(".small-dropdown__number").text() <= 0) {
            closestDecrement.addClass("small-dropdown__decrement_disabled");
        } else {
            closestDecrement.removeClass("small-dropdown__decrement_disabled");
        }
    });

});