import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public themeService: ThemeService,
    public webSocketService: WebSocketService,
  ) {
    // afterNextRender(() => {
    //   this.webSocketService.initSocketConnection('http://localhost:3000');
    //   let observer = this.webSocketService.on('exo')
    //
    //   observer.subscribe((data)=>{
    //     console.log('data',data);
    //   })
    //
    //   setTimeout(()=>{
    //     this.webSocketService.off('exo')
    //   },10000)
    // });
  }
}
