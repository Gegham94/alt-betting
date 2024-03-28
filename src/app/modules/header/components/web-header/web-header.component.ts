import { Component } from '@angular/core';
import { HEADER_OPTIONS_WEB, IHeaderOptionWeb } from '../../constant';
import { fadeIn, fadeInOut } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrl: './web-header.component.scss',
  animations: [fadeIn],
})
export class WebHeaderComponent {
  OPTIONS: IHeaderOptionWeb[] = HEADER_OPTIONS_WEB;
}
