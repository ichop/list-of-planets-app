import {animate,  state, style, transition, trigger} from '@angular/animations';

export const fadeStateTrigger = [trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(2000)
  ]),
  transition(':leave', animate(2000, style({
    opacity: 0
  })))
]),
trigger('mouseOn', [
  state('selected',
    style({
      transform: 'scale(1.1)'
    })),
  state('unselected',
    style({

    })),
  transition('selected <=> *', [
    animate('300ms ease-in')
  ])
])]
;
