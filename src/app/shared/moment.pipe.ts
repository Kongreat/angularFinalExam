import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'moment',
  pure: false     // нужно, для того, чтобы шаблон перерисовывался при изменениях
})

// пайп для отображения даты в нужном формате
export class MomentPipe implements PipeTransform {
  transform(m: moment.Moment, format: string = 'MMMM YYYY'): string {
    return m.format(format);
  }

}
