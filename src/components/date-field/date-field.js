import "./date-field.scss";
import * as $ from "jquery";

$(function () {

    $(".date-field__field").on("input", function () {
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }

        let isOnlyNumberLetters = true;

        for (let letter of this.value) {
            if (isNaN(letter) && letter != ".") {
                $(this).addClass("date-field__field_error");
                $(this).closest(".date-field").find(".date-field__error-message").removeClass("date-field__error-message_disabled");
                isOnlyNumberLetters = false;
                break;
            }
        }

        if (this.value.length === 0 || isOnlyNumberLetters) {
            $(this).removeClass("date-field__field_error");
            $(this).closest(".date-field").find(".date-field__error-message").addClass("date-field__error-message_disabled");
        }

        if (this.value.length === 3 && this.value[2] === ".") {
            this.value = this.value.slice(0, 2);
        } else if (this.value.length === 3 && this.value[2] != "."){
            this.value = this.value.slice(0, 2) + "." + this.value.slice(2);
        }

        if (this.value.length === 6 && this.value[5] === ".") {
            this.value = this.value.slice(0, 5);
        } else if (this.value.length === 6 && this.value[5] != "."){
            this.value = this.value.slice(0, 5) + "." + this.value.slice(5);
        }
    });

});