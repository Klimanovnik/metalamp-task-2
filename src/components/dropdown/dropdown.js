import "./dropdown.scss";

$(function () {

    // Change Value on List
    $(".dropdown__list").on("changeValue", function () {
        let sum = 0;
        let newButtonText = "";

        let currentLineArray = $(this).find(".dropdown__line");

        for (let currentLine of currentLineArray) {
            let lineNumber = +$(currentLine).find(".dropdown__number").text();

            if (lineNumber > 0) {
                let lineText = $(currentLine).find(".dropdown__line-text").text();
                newButtonText = newButtonText + lineNumber + " " + lineText + ", ";
                sum = sum + lineNumber;
                $(currentLine).find(".dropdown__decrement").removeClass("dropdown__decrement_disabled");
            } else {
                $(currentLine).find(".dropdown__decrement").addClass("dropdown__decrement_disabled");
            }
        }

        newButtonText = newButtonText.slice(0, -2);
        let currentButton = $(this).closest(".dropdown").find(".dropdown__button");

        if (sum > 0) {
            currentButton.text(`${newButtonText}`);
            $(this).find(".dropdown__clear").addClass("dropdown__clear_visible");
        } else {
            currentButton.text(`${$(this).closest(".dropdown").find(".dropdown__invisible-button-text").text()}`);
            $(this).find(".dropdown__clear").removeClass("dropdown__clear_visible");
        }

    });

    // On Dropdown Load
    let dropdownListArray = document.querySelectorAll(".dropdown__list");

    for (let dropdownList of dropdownListArray) {
        let currentNumberArray = $(dropdownList).find(".dropdown__number");

        for (let currentNumber of currentNumberArray) {
            if (+currentNumber.textContent < 0) {
                currentNumber.textContent = "0";
            } else if (+currentNumber.textContent > 999) {
                currentNumber.textContent = "999";
            }
        }

        dropdownList.dispatchEvent(new Event("changeValue"));
    }

    // Dropdown Button
    $(".dropdown__button").on("click", function (event) {
        event.preventDefault();
        $(this).closest(".dropdown").toggleClass("dropdown_active");
    });

    // Clear Button
    $(".dropdown__clear").on("click", function (event) {
        event.preventDefault();
        if ($(this).hasClass("dropdown__clear_visible")) {
            let closestList = $(this).closest(".dropdown__list");
            closestList.find(".dropdown__number").text("0");
            closestList[0].dispatchEvent(new Event("changeValue"));
        }
    });

    // Apply Button
    $(".dropdown__apply").on("click", function (event) {
        event.preventDefault();
        $(this).closest(".dropdown").removeClass("dropdown_active");
    });

    // Dropdown Decrement and Increment
    $(".dropdown__increment, .dropdown__decrement").on("click", function (event) {
        event.preventDefault();
        let closestNumber = $(this).closest(".dropdown__counter").find(".dropdown__number");
        let isChangeValue = false;

        if ($(this).hasClass("dropdown__increment") && +closestNumber.text() < 999) {
            closestNumber.text(`${+closestNumber.text() + 1}`);
            isChangeValue = true;
        } else if ($(this).hasClass("dropdown__decrement") && +closestNumber.text() > 0) {
            closestNumber.text(`${+closestNumber.text() - 1}`);
            isChangeValue = true;
        }

        if (isChangeValue) {
            this.closest(".dropdown__list").dispatchEvent(new Event("changeValue"));
        }
    });

});