class ComputeDates {
  constructor() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentDay = currentDate.getDate();
    this.weekDay = currentDate.getDay();
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  firstDayOfMonthIndex(month, year) {
    let firstDay = new Date(`${year}-${month}-01`).getDay();
    firstDay = (firstDay === 0) ? 7 : firstDay;
    return firstDay;
  }
}
