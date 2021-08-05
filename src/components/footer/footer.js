import "./../../assets/container-1920.scss";
import "./../subscription-text-field/subscription-text-field.js";
import "./footer.scss";

$(function(){

    $(".footer__link, .footer__social-link").on("click", function(event){
        event.preventDefault();
    });

});