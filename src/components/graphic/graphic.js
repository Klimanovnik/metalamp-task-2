import "./../../../node_modules/chart.js/dist/chart.min.js";
import "./graphic.scss";

let graphicArray = document.querySelectorAll(".graphic");

graphicArray.forEach(function (item) {

    // Gradients
    let yellowGradient = item.getContext("2d").createLinearGradient(0, 0, 0, 126);
    yellowGradient.addColorStop(0, "#FFE39C");
    yellowGradient.addColorStop(1, "#FFBA9C");

    let greenGradient = item.getContext("2d").createLinearGradient(0, 0, 0, 126);
    greenGradient.addColorStop(0, "#6FCF97");
    greenGradient.addColorStop(1, "#66D2EA");

    let purpleGradient = item.getContext("2d").createLinearGradient(0, 0, 0, 126);
    purpleGradient.addColorStop(0, "#BC9CFF");
    purpleGradient.addColorStop(1, "#8BA4F9");

    let greyGradient = item.getContext("2d").createLinearGradient(0, 0, 0, 126);
    greyGradient.addColorStop(0, "#909090");
    greyGradient.addColorStop(1, "#3D4975");

    // Charts
    let valuesData = [0, 65, 65, 130];

    new Chart(item.getContext("2d"), {
        type: "doughnut",
        data: {
            labels: ["Разочарован", "Удовлетворительно", "Хорошо", "Великолепно"],
            datasets: [{
                cutout: "90%",
                label: "Впечатления от номера",
                data: valuesData,
                backgroundColor: [
                    greyGradient,
                    purpleGradient,
                    greenGradient,
                    yellowGradient
                ],
                hoverOffset: 1,
                hoverBorderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            family: "'Montserrat', 'Arial', sans-serif",
                            weight: "300",
                            lineHeight: 1
                        },
                        color: "rgba(31, 32, 65, 0.75)",
                        usePointStyle: true,
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 9
                    },
                    position: "right",
                    align: "end",
                    reverse: true
                },
                tooltip: {
                    bodyFont: {
                        size: 12,
                        family: "'Montserrat', 'Arial', sans-serif",
                        weight: "300",
                        lineHeight: 1
                    },
                    usePointStyle: true,
                    boxWidth: 8,
                    boxHeight: 8
                }
            },
            maintainAspectRatio: false
        }
    });

    let sum = 0;
    valuesData.forEach(function (item) {
        sum = sum + item;
    });

    item.closest(".graphic-wrap").querySelector(".graphic__sum-number").textContent = String(sum);

});