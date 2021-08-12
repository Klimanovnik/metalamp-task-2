// Assets
import "./../../../assets/fonts.scss";
import "./../../../assets/reset.scss";
import "./../../../assets/container-1920.scss";

// Components
import "./../../../components/header/header.js";
import "./../../../../node_modules/slick-carousel/slick/slick.min.js";
import "./../../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./../../../components/sign-in/sign-in.js";
import "./../../../components/footer/footer.js";

// Page
import "./sign-in-page.scss";

function importAll(r) {
    let images = {};
    r.keys().map(function (item) {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("./img", false, /\.(ico|gif|png|jpg|jpeg|svg)$/));

$(function () {

    let imgBlockArray = $(".sign-in-page__auto-slider-img");
    let imgModule = "";

    for (let imgBlock of imgBlockArray) {
        imgModule = images[imgBlock.alt];

        if (imgModule === undefined) {
            imgModule = images["bg-1.jpg"];
        }

        imgBlock.setAttribute("src", `${imgModule.default}`);
    }

    $(".sign-in-page__auto-slider").slick({
        infinite: true,
        draggable: false,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        fade: true,
        speed: 5000
    });

});