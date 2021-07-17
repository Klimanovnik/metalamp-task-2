import "./masked-text-field.scss";

$(function () {

    $(".masked-text-field__field").on("input", function () {
        let currentParent = $(this).closest(".masked-text-field");

        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }

        let isOnlyNumberLetters = true;

        for (let letter of this.value) {
            if (isNaN(letter) && letter != ".") {
                currentParent.addClass("masked-text-field_error");
                isOnlyNumberLetters = false;
                break;
            }
        }

        if (this.value.length === 0 || isOnlyNumberLetters) {
            currentParent.removeClass("masked-text-field_error");
        }

        if (this.value.length === 3) {
            if (this.value[2] === ".") {
                this.value = this.value.slice(0, 2);
            } else {
                this.value = this.value.slice(0, 2) + "." + this.value.slice(2);
            }
        }

        if (this.value.length === 6) {
            if (this.value[5] === ".") {
                this.value = this.value.slice(0, 5);
            } else {
                this.value = this.value.slice(0, 5) + "." + this.value.slice(5);
            }
        }
    });

});