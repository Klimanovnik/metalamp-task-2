import "./../../../node_modules/air-datepicker/dist/js/datepicker.min.js";
import "./../../../node_modules/air-datepicker/dist/css/datepicker.min.css";
import "./calendar.scss";

$(function () {

    let count = 0;
    let calendarInputArray = $(".calendar__input");

    for (let calendarInput of  calendarInputArray) {

        calendarInput.setAttribute("id", `calendar__input-${count}`);

        $(calendarInput).closest(".calendar").datepicker({
            altField: `#calendar__input-${count}`,
            altFieldDateFormat: "dd M",
            multipleDatesSeparator: " - ",
            range: true,
            clearButton: true,
            navTitles: {
                days: "MM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2"
            },
            moveToOtherMonthsOnSelect: false,
            moveToOtherYearsOnSelect: false,
            minDate: new Date(),
            prevHtml: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 
                            17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z"
                            fill="#BC9CFF"/>
                       </svg>`,
            nextHtml: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 
                            9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>
                       </svg>`,
            indexOfYearElement: -1,
            onRenderCell: function (date, cellType) {
                if (cellType === "day") {
                    if (date.getDay() === 0) {
                        return {
                            classes: "calendar__last-day"
                        }
                    } else if (date.getDay() === 1) {
                        return {
                            classes: "calendar__first-day"
                        }
                    }
                } else if (cellType === "month") {
                    if (date.getMonth() % 4 === 0) {
                        return {
                            classes: "calendar__first-month"
                        }
                    } else if ((date.getMonth() + 1) % 4 === 0) {
                        return {
                            classes: "calendar__last-month"
                        }
                    }
                } else {
                    this.indexOfYearElement++;
    
                    if (this.indexOfYearElement >= 12) {
                        this.indexOfYearElement = 0;
                    }
    
                    console.log(this.indexOfYearElement);
    
                    if (this.indexOfYearElement % 4 === 0) {
                        return {
                            classes: "calendar__first-year"
                        }
                    } else if ((this.indexOfYearElement + 1) % 4 === 0) {
                        return {
                            classes: "calendar__last-year"
                        }
                    }
                }
            }
        });

        count++;
    }

    $(".calendar__clear").on("click", function () {
        let initСlean = $(this).closest(".calendar").find(".datepicker--button[data-action='clear']")[0];
        initСlean.dispatchEvent(new Event("click", { bubbles: true }));
    });

});