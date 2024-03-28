import { animate, state, style, transition, trigger } from '@angular/animations';

export const collapse = trigger('collapse', [
  state('void', style({ height: '0' })),
  transition('void => *', [
    style({ height: '0' }),
    animate('0.2s ease-in-out', style({ height: '*' })),
  ]),
  transition('* => void', [
    style({ height: '*' }),
    animate('0.2s ease-in-out', style({ height: '0' })),
  ]),
]);


export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
]);


export const animateBetButton = trigger('animateBetButton', [
  transition(':enter', [
    style({ opacity: 0, width:0 }),
    animate('150ms linear', style({ opacity: 1 , width: 70})),
  ]),
  transition(':leave', [animate('150ms linear', style({ opacity: 0, width:0 }))]),
]);
