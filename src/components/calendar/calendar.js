import "./../../../node_modules/air-datepicker/dist/js/datepicker.min.js";
import "./../../../node_modules/air-datepicker/dist/css/datepicker.min.css";
import "./calendar.scss";

$(function () {

    $(".calendar").datepicker({
        range: true,
        altField: "#input123",
        altFieldDateFormat: "dd MM yyyy",
        multipleDatesSeparator: " - ",
        clearButton: true
    });

});