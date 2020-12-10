import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface Task {
  TaskId?: number;
  TaskTitle: string;
  TaskDate: string;
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'})

export class TasksService{
  // инъекция httpClient для работы с бэкэнд запросами
  constructor(private http: HttpClient) { }
 // ссылка на БД
  static APIUrl = 'http://localhost:54669/api/Task';

  // метод загрзки данных из БД .net
  load(date: moment.Moment): Observable<Task[]>{
    return this.http.get<Task[]>(`${TasksService.APIUrl}?date=${date.format('DD-MM-YYYY')}`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], TaskTitle: tasks[key].TaskTitle}));
      }));
  }

  // метод добавления задачи в БД
  create(task: Task): Observable<any>{
    return this.http
      .post(`${TasksService.APIUrl}`, task);
  }

  // метод удаления задачи из БД
  remove(task: Task): Observable<void>{
    return this.http.delete<void>(`${TasksService.APIUrl}?id=${task.TaskId}`);
  }
}
