import "./range-slider.scss";

// On load

let rangeSliderWrapArray = document.querySelectorAll(".range-slider-wrap");

for (let rangeSliderWrap of rangeSliderWrapArray) {

    let numbers = rangeSliderWrap.querySelector(".range-slider-text__numbers");

    let currentMin = numbers.querySelector(".range-slider-text__min-number-hidden");
    let currentMax = numbers.querySelector(".range-slider-text__max-number-hidden");

    if (+currentMin.textContent < 0) {
        currentMin.textContent = "0";
    }

    if (+currentMax.textContent < 0 || +currentMax.textContent < +currentMin.textContent) {
        currentMax.textContent = +currentMin.textContent + 1000 + "";
    }

    let firstCircleLeftOffset = numbers.querySelector(".range-slider-text__offset-first-to-left");
    let secondCircleRightOffset = numbers.querySelector(".range-slider-text__offset-second-to-right");

    if (+firstCircleLeftOffset.textContent < 0) {
        firstCircleLeftOffset.textContent = "0";
    }

    if (+secondCircleRightOffset.textContent < 0) {
        secondCircleRightOffset.textContent = "0";
    }

    let slider = rangeSliderWrap.querySelector(".range-slider");
    let firstCircle = slider.querySelector(".range-slider__circle_first");
    let secondCircle = slider.querySelector(".range-slider__circle_second");

    if ((+firstCircleLeftOffset.textContent) + (+secondCircleRightOffset.textContent) > slider.offsetWidth - firstCircle.offsetWidth - secondCircle.offsetWidth) {
        firstCircleLeftOffset.textContent = "0";
        secondCircleRightOffset.textContent = "0";
    }

    let gradient = slider.querySelector(".range-slider__gradient");

    firstCircle.style.left = gradient.style.left = firstCircleLeftOffset.textContent + "px";
    secondCircle.style.right = gradient.style.right = secondCircleRightOffset.textContent + "px";

    let visibleMin = numbers.querySelector(".range-slider-text__min-number");
    let visibleMax = numbers.querySelector(".range-slider-text__max-number");

    let rangeNumber = +currentMax.textContent - +currentMin.textContent;

    visibleMin.textContent = Math.round((+currentMin.textContent) + (+firstCircleLeftOffset.textContent) * (rangeNumber / slider.offsetWidth)) + "";
    visibleMax.textContent = Math.round((+currentMax.textContent) - (+secondCircleRightOffset.textContent) * (rangeNumber / slider.offsetWidth)) + "";
}

// On events

let rangeSliderCircleArray = document.querySelectorAll(".range-slider__circle");

for (let rangeSliderCircle of rangeSliderCircleArray) {

    rangeSliderCircle.ondragstart = function () {
        return false;
    };

    rangeSliderCircle.onpointerdown = function (event) {

        rangeSliderCircle.setPointerCapture(event.pointerId);

        let currentCircle = this;
        let isFirstCircle = currentCircle.classList.contains("range-slider__circle_first");
        let currentSlider = currentCircle.closest(".range-slider");
        let currentGradient = currentSlider.querySelector(".range-slider__gradient");
        let currentMin = currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-text__min-number");
        let currentMax = currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-text__max-number");
        let minValue = +currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-text__min-number-hidden").textContent;
        let maxValue = +currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-text__max-number-hidden").textContent;

        let siblingCircle = "";

        if (isFirstCircle) {
            siblingCircle = currentSlider.querySelector(".range-slider__circle_second");
        } else {
            siblingCircle = currentSlider.querySelector(".range-slider__circle_first");
        }

        let onPointerMove = function (event) {
            let offset = "";
            let siblingOffset = "";

            if (isFirstCircle) {
                offset = "left";
                siblingOffset = "right";

                currentCircle.style[offset] = event.clientX - currentSlider.getBoundingClientRect().left - currentCircle.offsetWidth / 2 + "px";

                if (parseFloat(getComputedStyle(currentCircle)[offset]) < 0) {
                    currentCircle.style[offset] = 0 + "px";
                }

                if (parseFloat(getComputedStyle(currentCircle)[offset]) + parseFloat(getComputedStyle(siblingCircle)[siblingOffset]) > currentSlider.offsetWidth - currentCircle.offsetWidth - siblingCircle.offsetWidth - 2) {
                    currentCircle.style[offset] = currentSlider.offsetWidth - currentCircle.offsetWidth - siblingCircle.offsetWidth - parseFloat(getComputedStyle(siblingCircle)[siblingOffset]) - 2 + "px";
                }

                currentGradient.style[offset] = currentCircle.style[offset];

                currentMin.textContent = Math.round(minValue + parseFloat(getComputedStyle(currentCircle)[offset]) * (maxValue - minValue) / currentSlider.offsetWidth);

            } else {
                offset = "right";
                siblingOffset = "left";

                currentCircle.style[offset] = currentSlider.offsetWidth - (event.clientX - currentSlider.getBoundingClientRect().left) - currentCircle.offsetWidth / 2 - 2 + "px";

                if (parseFloat(getComputedStyle(currentCircle)[offset]) < 0) {
                    currentCircle.style[offset] = 0 + "px";
                }

                if (parseFloat(getComputedStyle(currentCircle)[offset]) + parseFloat(getComputedStyle(siblingCircle)[siblingOffset]) > currentSlider.offsetWidth - currentCircle.offsetWidth - siblingCircle.offsetWidth - 2) {
                    currentCircle.style[offset] = currentSlider.offsetWidth - currentCircle.offsetWidth - siblingCircle.offsetWidth - parseFloat(getComputedStyle(siblingCircle)[siblingOffset]) - 2 + "px";
                }

                currentGradient.style[offset] = currentCircle.style[offset];

                currentMax.textContent = Math.round(maxValue - parseFloat(getComputedStyle(currentCircle)[offset]) * (maxValue - minValue) / currentSlider.offsetWidth);
            }

        };

        rangeSliderCircle.addEventListener("pointermove", onPointerMove);

        rangeSliderCircle.onpointerup = function () {
            rangeSliderCircle.removeEventListener("pointermove", onPointerMove);
            rangeSliderCircle.onpointerup = null;
        };

    };

}