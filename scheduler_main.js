class Render {
  constructor() {
    this.computedDates = new ComputeDates();
    this.schedulerDiv = document.querySelector(".scheduler");
    this.schMonthYear = document.querySelector(".sch_title");
    this.dayList = ['pn', 'wt', 'śr', 'czw', 'pt', 'sb', 'nd']
    this.monthList = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];

    this.bookingsCurrentYear = [
      [], //styczeń
      [], //luty
      [], // marzec
      [], //kwiecień
      [22, 23, 28, 29, 30], //maj
      [7, 8, 9, 10, 11, 12, 13], //czerwiec
      [12, 13, 14, 15, 16, 20, 21, 22, 23, 28, 29, 30, 31], //lipiec
      [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        28,
        29,
        30,
        31,
      ], //sierpień
      [1, 2, 3, 4, 5], //wrzesień
      [], //październik
      [], //listopad
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ], //grudzień
    ];

    this.consecutiveYear = [
      [], //styczeń
      [], //luty
      [], //marzec
      [], //kwiecień
      [], //maj
      [], //czerwiec
      [], //lipiec
      [], //sierpień
      [], //wrzesień
      [], //październik
      [], //listopad
      [], //grudzień
    ];

    this.renderingFn = (iteration, object, attr, content) => {
      let i = iteration;
      for (i; i <= object; i++) {
        const day = document.createElement('div');
        day.setAttribute('class', attr);
        if (content === 0) day.textContent = i;
        else day.textContent = content[i];
        this.schedulerDiv.appendChild(day);
      }
    }

    this.showCurrentDay = () => {
      const regDays = [...this.schedulerDiv.querySelectorAll("div.day")];
      regDays[this.computedDates.currentDay - 1].classList.add("today");
      regDays[this.computedDates.currentDay - 1].setAttribute(
        "data-tooltip",
        "dzisiaj"
      );
      regDays[this.computedDates.currentDay - 1].style.background = "gray";
    };

    this.renderDays(
      this.computedDates.currentMonth,
      this.computedDates.currentYear
    );
    this.showCurrentDay();
  }

  renderDays(month, year) {
    this.schedulerDiv.innerHTML = "";
    this.schMonthYear.textContent = this.monthList[month - 1] + "  " + year;

    let i = 0;

    this.renderingFn(i, this.dayList.length - 1, 'days-in-week', this.dayList);
    this.renderingFn(i, this.computedDates.firstDayOfMonthIndex(month, year) - 2, 'empty', '');
    this.renderingFn(i + 1, this.computedDates.daysInMonth(month, year), 'day', i);


    // for (let i = 0; i <= this.dayList.length - 1; i++) {
    //   const dayInWeek = document.createElement('div');
    //   dayInWeek.setAttribute('class', 'days-in-week');
    //   dayInWeek.textContent = this.dayList[i];
    //   this.schedulerDiv.appendChild(dayInWeek);
    // };

    // for (let i = 0; i <= this.computedDates.firstDayOfMonthIndex(month, year) - 2; i++) {
    //   const day = document.createElement('div');
    //   day.setAttribute('class', 'empty');
    //   this.schedulerDiv.appendChild(day);
    // }

    // for (let i = 1; i <= this.computedDates.daysInMonth(month, year); i++) {
    //   const day = document.createElement("div");
    //   day.setAttribute("class", "day");
    //   day.textContent = i;
    //   this.schedulerDiv.appendChild(day);
    // }

    this.renderBookedDays(month, year);
    if (
      month === this.computedDates.currentMonth &&
      year === this.computedDates.currentYear
    )
      this.showCurrentDay();
  }

  renderBookedDays(month, year) {
    let bookings = this.bookingsCurrentYear;
    const regDays = [...this.schedulerDiv.querySelectorAll("div.day")];
    if (year > this.computedDates.currentYear) bookings = this.consecutiveYear;
    bookings[month - 1].forEach((bookedDay) => {
      regDays[bookedDay - 1].style.backgroundColor = "orange";
      regDays[bookedDay - 1].classList.add("booked");
      regDays[bookedDay - 1].setAttribute("data-tooltip", "zarezerwowane");
    });
  }
}