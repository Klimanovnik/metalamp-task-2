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

    rangeSliderCircle.onmousedown = function (event) {
        event.preventDefault();

        let currentCircle = this;
        let currentSlider = currentCircle.closest(".range-slider");
        let currentSliderWidth = parseFloat(getComputedStyle(currentSlider).width);
        let currentGradient = currentSlider.querySelector(".range-slider__gradient");
        let currentMin = currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-wrap__min-number");
        let currentMax = currentCircle.closest(".range-slider-wrap").querySelector(".range-slider-wrap__max-number");

        let siblingCircle = Array.from(currentSlider.children).find(item => {
            if (item != currentCircle && !item.classList.contains("range-slider__gradient")) {
                return true;
            } else {
                return false;
            }
        });

        let onMouseMove = function (event) {
            currentCircle.style.left = event.clientX - currentSlider.getBoundingClientRect().left - currentCircle.offsetWidth / 2 + "px";
            if (parseFloat(getComputedStyle(currentCircle).left) < 0) {
                currentCircle.style.left = 0 + "px";
            }
            if (parseFloat(getComputedStyle(currentCircle).right) < 0) {
                currentCircle.style.left = currentSliderWidth - currentCircle.offsetWidth - 2 + "px";
            }

            if (currentCircle.classList.contains("range-slider__circle_first")) {
                if (parseFloat(getComputedStyle(currentCircle).left) > (parseFloat(getComputedStyle(siblingCircle).left) - currentCircle.offsetWidth)) {
                    currentCircle.style.left = parseFloat(getComputedStyle(siblingCircle).left) - currentCircle.offsetWidth + "px";
                }
                currentGradient.style.left = getComputedStyle(currentCircle).left;
                currentMin.innerHTML = (Math.round(parseFloat(getComputedStyle(currentCircle).left)) + 1) * 65 + "&#8381;";
            } else if (currentCircle.classList.contains("range-slider__circle_second")) {
                if (parseFloat(getComputedStyle(currentCircle).left) < (parseFloat(getComputedStyle(siblingCircle).left) + currentCircle.offsetWidth)) {
                    currentCircle.style.left = parseFloat(getComputedStyle(siblingCircle).left) + currentCircle.offsetWidth + "px";
                }
                currentGradient.style.right = getComputedStyle(currentCircle).right;
                currentMax.innerHTML = (Math.round(parseFloat(getComputedStyle(currentCircle).left)) + 1) * 65 + "&#8381;";
            }
        };

        document.addEventListener("mousemove", onMouseMove);

        document.onmouseup = function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.onmouseup = null;
        };
    };

}