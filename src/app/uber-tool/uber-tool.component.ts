import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { UberApiService} from '../services/uber-api.service';


@Component({
  selector: 'app-uber-tool',
  templateUrl: './uber-tool.component.html',
  styleUrls: ['./uber-tool.component.css']
})
export class UberToolComponent implements OnInit {

  public origin: string;
  public destination: string;

  public uberPrice: string = "";

  constructor(private uberApiService: UberApiService){ }

  ngOnInit() {
  }

  public frequentLocationButton(location: string) {
    if ( this.origin === undefined || this.origin.length === 0) {
      this.origin = location;
    }
    else if (this.origin.length === 0 || this.destination === undefined || this.destination.length === 0) {
      this.destination = location;
    }

  }

  public switchButton() {
    const tempOrigin = this.origin;
    this.origin = this.destination;
    this.destination = tempOrigin;
  }

  onSubmitLoc(form: NgForm) {
    const origin = form.value.origin;
    const destination = form.value.destination;
    this.uberApiService.getUberPrice(origin, destination).subscribe((response: Response) => {
      const uberObj = response.json();
      this.uberPrice = uberObj.price;
      console.log(uberObj.price);
      console.log(uberObj.duration);
    });
   

  }


}
