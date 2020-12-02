import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';

interface Day {
  value: moment.Moment;
  // флаги для корректного отображения дней
  active: boolean; // сегодня
  disabled: boolean; // не в текущем месяце
  selected: boolean; // нажатый день
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this)); // подписываемся на изменения поля Date
  }

  generate(now: moment.Moment): void { // генерирует дату при взаимодействии с компонентом и изменяет ее
    // границы для изображения календаря
    const startDate = now.clone().startOf('month').startOf('week'); // клонирование объекта во избежание аномалий
    const endDay = now.clone().endOf('month').endOf('week');

    // переменная для проверки цикла
    const date = startDate.clone().subtract(1, 'day');
    // console.log(now.format());

    const calendar = [];

    while (date.isBefore(endDay, 'day')){ // итерация по дням, до конечного дня
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date'); // проверка на совпадение текущий даты
          const disabled = !now.isSame(value, 'month'); // если текущий месяц не совпадает с value -> disable
          const selected = now.isSame(value, 'date');
          return {value, active, disabled, selected};
        })
      });
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }

}
