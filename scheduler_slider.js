class SliderSch {
  constructor() {
    this.render = new Render();
    this.prevBtn = document.querySelector('.prev_sch');

    let month = this.render.computedDates.currentMonth;
    let year = this.render.computedDates.currentYear;

    this.prevBtn.addEventListener('click', () => {
      month--;
      if (month < 1) {
        year--;
        month = 12;
      };

      this.render.renderDays(month, year);

      if (month === this.render.computedDates.currentMonth && year === this.render.computedDates.currentYear) this.prevBtn.style.display = 'none';
      else this.prevBtn.style.display = 'block';
    });

    document.querySelector('.next_sch').addEventListener('click', () => {
      month++;
      if (month > 12) {
        year++;
        month = 1;
      };
      this.render.renderDays(month, year);
      this.prevBtn.style.display = 'block';
    });
  }
}

const slider = new SliderSch();
