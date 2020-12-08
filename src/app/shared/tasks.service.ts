import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface Task {
  TaskId?: string; // необязательное поле
  TaskTitle: string;
  TaskDate?: string;
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'})

export class TasksService{
  // инъекция httpClient для работы с бэкэнд запросами
  constructor(private http: HttpClient) { }
  static url = 'https://angular-todo-exam.firebaseio.com/tasks'; // ссылка на БД
  static APIUrl = 'http://localhost:54669/api/Task';
  // метод загрузки задач из БД (firebase)
  // load(date: moment.Moment): Observable<Task[]>{
  //   return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
  //     .pipe(map(tasks => {
  //       if (!tasks) {
  //         return [];
  //       }
  //       return Object.keys(tasks).map(key => ({...tasks[key], id: key})); // создается объект
  //     }));
  // }


  // load .net
  load(date: moment.Moment): Observable<Task[]>{
    return this.http.get<Task[]>(`${TasksService.APIUrl}?date=${date.format('DD-MM-YYYY')}`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key, TaskTitle: tasks[key].TaskTitle})); // создается объект
      }));
  }

 // создание задачи через post запрос в firebase
 //  create(task: Task): Observable<Task>{
 //    return this.http
 //      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
 //      .pipe(map(res => {
 //        // console.log('Response: ', res);
 //        return {...task, id: res.name};
 //      }));
 //  }

  // create .net
  create(task: Task): Observable<any>{
    return this.http
      .post(`${TasksService.APIUrl}`, task);
  }

  remove(task: Task): Observable<void>{
    return this.http.delete<void>(`${TasksService.url}/${task.TaskDate}/${task.TaskId}.json`);
  }
}
