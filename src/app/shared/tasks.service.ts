import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface iTask {
  TaskId?: number;
  TaskTitle: string;
  TaskDate: string;
}

@Injectable({
  providedIn: 'root'})

export class TasksService{
  constructor(private http: HttpClient) { }   // инъекция httpClient для работы с бэкэнд запросами
  static APIUrl = 'http://localhost:54669/api/Task'; // ссылка на БД

  // метод загрзки данных из БД
  load(date: moment.Moment): Observable<iTask[]>{
    return this.http.get<iTask[]>(`${TasksService.APIUrl}?date=${date.format('DD-MM-YYYY')}`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        // пробегаю по объекту tasks
        return Object.keys(tasks).map(key => ({...tasks[key], TaskTitle: tasks[key].TaskTitle}));
      }));
  }

  // метод добавления задачи в БД
  create(task: iTask): Observable<any>{
    return this.http
      .post(`${TasksService.APIUrl}`, task);
  }

  // метод удаления задачи из БД
  remove(task: iTask): Observable<void>{
    return this.http.delete<void>(`${TasksService.APIUrl}?id=${task.TaskId}`);
  }
}
