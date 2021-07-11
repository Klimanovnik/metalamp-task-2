import "./dropdown.scss";

$(function () {

    // Dropdown Button
    $(".dropdown__button").on("click", function (event) {
        event.preventDefault();
        $(this).closest(".dropdown").toggleClass("dropdown_active");
    });

    // Summation
    $(".dropdown__number").on("changeNumberValue", function () {
        let closestDropdown = $(this).closest(".dropdown");

        let dropdownNumberArray = closestDropdown.find(".dropdown__number");
        let sum = 0;

        for (let dropdownNumber of dropdownNumberArray) {
            sum = sum + Number($(dropdownNumber).text());
        }

        let visitorString = "";
        if (sum % 10 === 1 && sum != 11) {
            visitorString = "гость";
        } else if ((sum % 10 === 2 && sum != 12) || (sum % 10 === 3 && sum != 13) || (sum % 10 === 4 && sum != 14)) {
            visitorString = "гостя";
        } else {
            visitorString = "гостей";
        }

        let currentDropdownButton = closestDropdown.find(".dropdown__button").first();
        let isThereClear = Boolean(closestDropdown.find(".dropdown__clear").first().length);

        if (sum > 0) {
            currentDropdownButton.text(`${sum + " " + visitorString}`);
            if (isThereClear) {
                closestDropdown.find(".dropdown__clear").first().removeClass("dropdown__clear_invisible");
            }
        } else if (sum === 0) {
            currentDropdownButton.text("Сколько гостей");
            if (isThereClear) {
                closestDropdown.find(".dropdown__clear").first().addClass("dropdown__clear_invisible");
            }
        } else {
            currentDropdownButton.text("Отрицательное количество гостей !");
            if (isThereClear) {
                closestDropdown.find(".dropdown__clear").first().removeClass("dropdown__clear_invisible");
            }
        }
    });

    // ApplyClearButtons
    $(".dropdown__clear").on("click", function (event) {
        event.preventDefault();
        let dropdownNumberArray = $(this).closest(".dropdown__list").find(".dropdown__number");
        dropdownNumberArray.text("0");

        dropdownNumberArray[0].dispatchEvent(new Event("changeNumberValue"));
        $(this).closest(".dropdown__list").find(".dropdown__decrement").addClass("dropdown__decrement_disabled");
    });

    $(".dropdown__apply").on("click", function (event) {
        event.preventDefault();
        $(this).closest(".dropdown").removeClass("dropdown_active");
    });

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
});