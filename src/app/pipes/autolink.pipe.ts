import { Pipe, PipeTransform } from '@angular/core';
import Autolinker from 'autolinker';

@Pipe({
  name: 'autolink',
})
export class AutolinkPipe implements PipeTransform {
  transform(value: any): any {
    let autolinker = new Autolinker();
    return autolinker.link(value);
  }
}
