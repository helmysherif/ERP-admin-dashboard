import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million',
})
export class MillionPipe implements PipeTransform {
  // i wanna convert number to be like this
  // 1000000 => 1M
  // 1000000000 => 1B
  // 1000000000000 => 1T
  // 1000 => 1K
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'number') {
      if (value >= 1000000000000) {
        return (value / 1000000000000).toFixed(1) + 'T';
      } else if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1) + 'B';
      } else if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      } else {
        return value.toString();
      }
    }
    return null;
  }
}
