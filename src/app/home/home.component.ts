import { Component, OnInit } from '@angular/core';
import { LedService } from './services/led/led.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public effects = [
        { value: 'blank', name: 'Blank' },
        { value: 'static', name: 'Static' },
        { value: 'cyclon rainbow', name: 'Cyclon Bruh' },
        { value: 'rainbow', name: 'Rainbow' },
    ]

    public brightnessBehaviourSubject = new BehaviorSubject<number>(0);
    public effectBehaviorSubject = new BehaviorSubject<string>(this.effects[0].value)

    constructor(
        private ledService: LedService
    ) { }

    ngOnInit(): void {
        this.ledService.getCurrent().subscribe(x => {
            this.effectBehaviorSubject.next(x.status);
            this.brightnessBehaviourSubject.next(x.brightness);

            this.brightnessBehaviourSubject
                .pipe(
                    debounceTime(50),
                    switchMap(x => this.ledService.setBrightness(x))
                ).subscribe(
                    x => {
                        console.log(x);
                    }
                )

            this.effectBehaviorSubject
                .pipe(
                    switchMap(x => this.ledService.setEffect(x))
                ).subscribe(
                    x => {
                        console.log(x)
                    }
                )
        });
    }

    changeBrightness(brightness: string) {
        localStorage.setItem('brightness', brightness);

        this.brightnessBehaviourSubject.next(brightness as unknown as number);
    }

    changeEffect(effect: string) {
        localStorage.setItem('effect', effect);

        this.effectBehaviorSubject.next(effect);
    }
}
