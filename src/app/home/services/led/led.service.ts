import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LedService {

    constructor(
        private http: HttpClient
    ) { }

    setBrightness(brightness: number) {

        let params = new HttpParams()
            .set('brightness', Math.round(brightness).toString());

        return this.http.get(environment.url, { params: params, responseType: 'text' });
    }

    setEffect(effect: string) {

        let params = new HttpParams()
            .set('effect', effect);

        return this.http.get(environment.url, { params: params, responseType: 'text' });
    }
}