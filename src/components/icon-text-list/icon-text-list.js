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

    let imgBlockArray = $(".icon-text-list__item-img");
    let imgModule = "";

    for (let imgBlock of imgBlockArray) {
        imgModule = images[imgBlock.textContent];

        if(imgModule === undefined) {
            imgModule = images["default.svg"];
        }

        imgBlock.closest(".icon-text-list__item").style.backgroundImage = `url(${imgModule.default})`;
    }

});