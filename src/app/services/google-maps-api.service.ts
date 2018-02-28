import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/finally';
import { environment } from '../../environments/environment';


@Injectable()
export class GoogleMapsApiService {

  private serverURL = environment.serverUrl;

  constructor(private http: Http) { }

   currentTimeCheck(origin: string, destination: string) {
     // console.log(this.serverURL + '/mapdata/' + origin + '/' + destination);
     return this.http.get(this.serverURL + '/mapdata/' + origin + '/' + destination);


  }

}
