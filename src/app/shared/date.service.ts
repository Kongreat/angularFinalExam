import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  changeMonth(direction: number): void{
    const value = this.date.value.add(direction, 'month');
    this.date.next(value);
  }

  // выбирает и подсвечивает дату при клике
  changeDate(date: moment.Moment): void {
    const value = this.date.value.set({   // создание нового объекта moment. Применяю к этому объекту функцию set, чтобы задать новые значения
      date: date.date(),
      month: date.month()
    });
    this.date.next(value);
  }
}
