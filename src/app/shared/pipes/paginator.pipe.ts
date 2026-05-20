import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
  transform<T>(items: T[], first: number, rows: number): T[] {
    if (!items || items.length === 0) {
      return [];
    }

    return items.slice(first, first + rows);
  }
}
