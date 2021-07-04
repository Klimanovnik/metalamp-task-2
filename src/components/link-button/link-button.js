import "./link-button.scss";
import * as $ from "jquery";

$(function () {

    $(".link-button").on("click", function(event){
        event.preventDefault();
    });

});