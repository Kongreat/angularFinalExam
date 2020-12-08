import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../shared/tasks.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];
  value: any;

  constructor(private dateService: DateService,
              private tasksService: TasksService) { }

  // инициализация формы и валидация
  ngOnInit(): void {
    // загрузка данных при изменении поля date
    this.dateService.date.pipe(
      // переключение на TasksService
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
      console.log('Changed');
    });
    this.form = new FormGroup({
      TaskTitle: new FormControl('', Validators.required)
    });
  }

  // функция при submit формы, получает значение, создает задачу
  submit(): void{
    const {TaskTitle} = this.form.value;

    // создание объекта задачи
    const task: Task = {
      TaskId: this.dateService.date.value.format('DD-MM-YYYY'),
      TaskTitle,
      TaskDate: this.dateService.date.value.format('DD-MM-YYYY')
    };
    this.tasksService.create(task).subscribe(t => {
      this.tasks.push(t); // добавление задачи в массив, чтобы показывалась сразу, не перезагружая данные
      this.form.reset();
    }, err => console.error(err));
  }

  getDate(): any{
    return this.dateService.date;
  }

  remove(task: Task): any{
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.TaskId !== task.TaskId); // удаление задачи через filter из массива
      // (остаются только те, у которые не совпадают айди с удаляемым
    }, err => {
      console.error(err);
    });
  }
}
