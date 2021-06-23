import "./dropdown__line.scss";
import * as $ from "jquery";

// Dropdown decrement & increment
$(".dropdown__increment, .dropdown__decrement").on("click", function (event) {
    event.preventDefault();
    let dropdownNumber = $(this).closest(".dropdown__counter").find(".dropdown__number").first();
    let isChangeNumberValue = false;

    if ($(this).hasClass("dropdown__increment") && Number(dropdownNumber.text()) < 999) {
        dropdownNumber.text(`${+dropdownNumber.text() + 1}`);
        isChangeNumberValue = true;
    } else if ($(this).hasClass("dropdown__decrement") && Number(dropdownNumber.text()) > 0) {
        dropdownNumber.text(`${+dropdownNumber.text() - 1}`);
        isChangeNumberValue = true;
    }

    if (isChangeNumberValue) {
        dropdownNumber[0].dispatchEvent(new Event("changeNumberValue"));
    }
});

$(".dropdown__number").on("changeNumberValue", function () {
    let closestDecrement = $(this).closest(".dropdown__counter").find(".dropdown__decrement").first();
    if (+$(this).text() <= 0) {
        closestDecrement.addClass("dropdown__decrement_disabled");
    } else {
        closestDecrement.removeClass("dropdown__decrement_disabled");
    }
});