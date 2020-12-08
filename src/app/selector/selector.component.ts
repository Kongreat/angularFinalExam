import { Component } from '@angular/core';
import {DateService} from '../shared/date.service';
import {HighlightDirective} from '../shared/highlight.directive';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent{

  constructor(private dateService: DateService) { }

  go(direction: number): void{
    this.dateService.changeMonth(direction);
  }

  getDate(): any{
    return this.dateService.date;
  }

}
