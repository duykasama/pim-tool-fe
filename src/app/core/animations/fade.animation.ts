import {animate, style, transition, trigger} from "@angular/animations";
export const fadeAnimation = [
    trigger('fadeIn', [
        transition(':enter', [
            style({
            transform: 'scale(0%)',
            }),
            animate('250ms ease-out',
            style({
                transform: 'scale(100%)'
            }))
        ])
    ]),
    trigger('fadeOut', [
        transition(':leave', [
            style({
            transform: 'scale(100%)',
            }),
            animate('250ms ease-out',
            style({
                transform: 'scale(0%)'
            }))
        ])
    ])
]