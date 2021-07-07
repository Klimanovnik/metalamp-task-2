import "./reviews.scss";
import "./../like-button/like-button.js";
import * as $ from "jquery";

function importAll(r) {
    let images = {};
    r.keys().map(function (item) {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("./img", false, /\.(ico|gif|png|jpg|jpeg|svg)$/));

$(function () {

    let imgBlockArray = $(".reviews__item-img-name");
    let imgModule = "";

    for (let imgBlock of imgBlockArray) {
        imgModule = images[imgBlock.textContent];

        if(imgModule === undefined) {
            imgModule = images["default.svg"];
        }

        imgBlock.closest(".reviews__item").querySelector(".reviews__item-img").setAttribute("src", `${imgModule.default}`);
    }

});