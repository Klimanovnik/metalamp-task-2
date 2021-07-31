import "./../../../node_modules/slick-carousel/slick/slick.min.js";
import "./../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./../rate-button/rate-button.js";
import "./room-card.scss";

function importAll(r) {
    let images = {};
    r.keys().map(function (item) {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("./img", false, /\.(ico|gif|png|jpg|jpeg|svg)$/));

$(function () {

    let imgBlockArray = $(".room-card__img");
    let imgModule = "";

    for (let imgBlock of imgBlockArray) {
        imgModule = images[imgBlock.alt];

        if (imgModule === undefined) {
            imgModule = images["1.jpg"];
        }

        imgBlock.setAttribute("src", `${imgModule.default}`);
    }

    $(".room-card__carousel").slick({
        arrows: true,
        dots: true
    });

});