import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleMapsApiService} from '../services/google-maps-api.service';
import { Headers, Http, Response } from '@angular/http';

@Component({
  selector: 'app-google-time',
  templateUrl: './google-time.component.html',
  styleUrls: ['./google-time.component.css']
})
export class GoogleTimeComponent implements OnInit {

  public origin: string;
  public destination: string;
  public hoursAtWork: number = 10;
  public distance: number = -1;
  public duration: number = -1;

  public userStartTime: string = '-1';
  public userStartDuration: number = -1;
  public userEndTime: string = '-1';
  public userEndDuration: number = -1;

  public csStart: string = "0:00";
  public csEnd: string = "24:00";
  public csTotalCommute: number = 60;
  // lineChart
  public commuteLengthData: Array<any> = [
    { data: [67, 59, 62, 63, 56, 55, 56, 53, 59, 63, 60, 54, 50, 60, 62, 63, 65, 63, 51, 50, 49, 48], label: 'Minutes' }
  ];
  public timeIntervals: Array<any> = ['5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
   '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00'];
  public lineChartOptions: any = {
    responsive: true,
    title: {
       display: true,
       text: 'Commute Time'
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          // OR //
          beginAtZero: true   // minimum value will be 0.
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [

    { // grey
      backgroundColor: 'rgba(170, 247, 193, 0.6)',
      borderColor: 'rgb(188, 192, 214)',
      pointBackgroundColor: 'green',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';


  // events
  public chartClicked(e: any): void {
    if(e.active[0]._index != undefined){
      let index = parseInt(e.active[0]._index);
      let time = this.timeIntervals[index];
      let duration = parseInt(this.commuteLengthData[0].data[index]);
      let length = this.timeIntervals.length;
      if(index < length/2){
        this.userStartTime = time;
        this.userStartDuration = duration;
      }
      else{
        this.userEndTime = time;
        this.userEndDuration = duration;
      }
    }
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public switchButton() {
    const tempOrigin = this.origin;
    this.origin = this.destination;
    this.destination = tempOrigin;
    this.idealCommute();
  }

  public frequentLocationButton(location: string) {
    if ( this.origin === undefined || this.origin.length === 0) {
      this.origin = location;
    }
    else if (this.origin.length === 0 || this.destination === undefined || this.destination.length === 0) {
      this.destination = location;
    }

  }

  private idealCommute() {
    let workTime = this.hoursAtWork;
    let minDuration = 99999;
    let startDex = 0;
    let travelTimes = this.commuteLengthData[0].data;
    if(travelTimes.length > 18 ){
      workTime * 4;
    }

    for(let i = 0; i < travelTimes.length - workTime - 4; i++){
      let sumTime = travelTimes[i] + travelTimes[i + workTime];
      if(sumTime < minDuration){
        minDuration = sumTime;
        startDex = i;
      }
    }
  
    this.userStartDuration = travelTimes[startDex];
    this.userStartTime = this.timeIntervals[startDex];
    this.userEndDuration = travelTimes[startDex + workTime];
    this.userEndTime = this.timeIntervals[startDex + workTime]; 
    this.csStart = this.userStartTime;
    this.csEnd = this.userEndTime
    this.csTotalCommute = this.userStartDuration + this.userEndDuration
    
  }

  

  onSubmitLoc(form: NgForm) {
    const origin = form.value.origin;
    const destination = form.value.destination;
    this.mapsService.currentTimeCheck(origin, destination).subscribe((response: Response) => {
      const travelObj = response.json();
      const travelArr = travelObj.arr;
      const departureTimes = [];
      const commuteTimeSeconds = [];
      const commuteTimeMinutes = [];
      const commuteTime = [];
      this.distance = travelObj.distance;
      this.duration = travelObj.duration;
      for (let i = 0; i < travelArr.length - 1; i++) {
        commuteTimeMinutes.push(travelArr[i].commuteMinutes);
      }
      for (let i = 0; i < travelArr.length; i += 1) {
        departureTimes.push(travelArr[i].timeStr);
      }
      this.timeIntervals = departureTimes;
      this.commuteLengthData[0].data = commuteTimeMinutes;
      this.commuteLengthData[0].label = 'Minutes';
      this.idealCommute();
    });
   

  }

 

  constructor(private mapsService: GoogleMapsApiService) { }

  ngOnInit() {
    this.idealCommute();
  

  }




}
