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
                if (parseFloat(getComputedStyle(currentCircle).left) > (parseFloat(getComputedStyle(siblingCircle).left) - currentCircle.offsetWidth) ) {
                    currentCircle.style.left = parseFloat(getComputedStyle(siblingCircle).left) - currentCircle.offsetWidth + "px";
                }
                currentGradient.style.left = getComputedStyle(currentCircle).left;
                currentMin.innerHTML = (Math.round(parseFloat(getComputedStyle(currentCircle).left)) + 1) * 65 + "&#8381;";
            } else if (currentCircle.classList.contains("range-slider__circle_second")) {
                if (parseFloat(getComputedStyle(currentCircle).left) < (parseFloat(getComputedStyle(siblingCircle).left) + currentCircle.offsetWidth) ) {
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