import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';

interface Day {
  value: moment.Moment; // дата
  // поля для корректного отображения дней
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
    this.dateService.date.subscribe(this.generate.bind(this)); // вызываем метод при изменении date
  }

  generate(now: moment.Moment): void { // генерирует дату при взаимодействии с компонентом и изменяет ее
    // границы для изображения календаря
    // момент переключается на начало месяца и недели
    const startDate = now.clone().startOf('month').startOf('week'); // клонирование объекта во избежание аномалий
    // последний день месяца
    const endDay = now.clone().endOf('month').endOf('week');

    // переменная для прохода по циклу
    const date = startDate.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')){ // итерация по дням, до конечного дня
      calendar.push({
        days: Array(7).fill(0) // инициализация пустого массива из 7 элементов
          .map(() => { // итерация по массиву
          const value = date.add(1, 'day').clone(); // сохранение клонированного объекта, прибавляем 1 день
          const active = moment().isSame(value, 'date'); // проверка на совпадение текущий даты
          const disabled = !now.isSame(value, 'month'); // если текущий месяц не совпадает с value -> disable
          const selected = now.isSame(value, 'date'); // если текущая дата совпадает с value по дням
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
