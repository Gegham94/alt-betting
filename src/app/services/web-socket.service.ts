import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket?: Socket<any, any>;

  constructor() {}

  initSocketConnection(url: string) {
    this.socket = io(url);
  }

  on(eventName: string) {
    return new Observable((observer) => {
      this.socket?.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  off(eventName: string) {
    return this.socket?.off(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}
