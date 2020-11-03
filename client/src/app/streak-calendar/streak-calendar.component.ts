import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-streak-calendar',
   templateUrl: './streak-calendar.component.html',
   styleUrls: ['./streak-calendar.component.css'],
})
export class StreakCalendarComponent implements OnInit {
  nDays;
  nDaysLeft = [29, 30, 31];
  monthsWith30 = [3, 5, 8, 10];
  dayComplete: Array<boolean>;
  month: number;
  year: number;
  months: Array<string> = [ 
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
   @Input('monthlyStreak') streak: {month: number, monthStreak: Array<{date: Date,completed: boolean, dateTime: Date}> };

   constructor() {}

  ngOnInit(): void {
    const d = new Date();
    const currMonth = this.streak.month;
    if(currMonth === 1) {
      if(!(d.getUTCFullYear() % 4 == 0 && d.getUTCFullYear() % 100 !=0))
        this.nDaysLeft.pop();
      this.nDaysLeft.pop();
    }
    else if(this.monthsWith30.includes(currMonth))
      this.nDaysLeft.pop();

    this.month = this.streak.month;

    this.dayComplete = new Array(28 + this.nDaysLeft.length);
    this.calcDayComplete();
  }

  calcDayComplete() {
    for(var i = 0; i < this.dayComplete.length; i++) {
      this.dayComplete[i] = false;
      for(var d in this.streak.monthStreak) {
        if(this.streak.monthStreak[d]['date'].getDate() === (i+1) && this.streak.monthStreak[d].completed === true) {
          this.dayComplete[i] = true;
          break;
        }
      }
    }
  }
}
