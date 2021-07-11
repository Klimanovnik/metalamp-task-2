import "./small-dropdown.scss";

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

    let counterArray = document.querySelectorAll(".small-dropdown__counter");

    for (let counter of counterArray) {
        counter.dispatchEvent(new Event("changeNumberValue"));
    }

});