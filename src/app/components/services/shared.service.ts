import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isSidebarOpen = new BehaviorSubject<boolean>(false);
  isDrawerOpen = new BehaviorSubject<boolean>(false);
  constructor() {}
}
