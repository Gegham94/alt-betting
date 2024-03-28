import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGamesService {
  matchBuildersDrafts = new BehaviorSubject<any[]>([])
  matchBuildersDrafts$ = this.matchBuildersDrafts.asObservable()

}
