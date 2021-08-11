// Assets
import "./../../../assets/fonts.scss";
import "./../../../assets/reset.scss";
import "./../../../assets/atomic.scss";
import "./../../../assets/container-1920.scss";

// Components
import "./../../../components/header/header.js";
import "./../../../components/graphic/graphic.js";
import "./../../../components/footer/footer.js";

// Page
import "./room-details.scss";

function importAll(r) {
    let images = {};
    r.keys().map(function (item) {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("./img", false, /\.(ico|gif|png|jpg|jpeg|svg)$/));

$(function () {

    let imgBlockArray = $(".room-details__img");
    let imgModule = "";

    for (let imgBlock of imgBlockArray) {
        imgModule = images[imgBlock.alt];

        if (imgModule === undefined) {
            imgModule = images["bg-1.jpg"];
        }

        imgBlock.setAttribute("src", `${imgModule.default}`);
    }

});