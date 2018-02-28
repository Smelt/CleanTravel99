import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { GoogleTimeComponent } from './google-time/google-time.component';
import { GoogleMapsApiService } from './services/google-maps-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { UberToolComponent } from './uber-tool/uber-tool.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { UberApiService } from './services/uber-api.service';

const appRoutes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'google-time', component: GoogleTimeComponent },
  { path: 'tech-stack', component: TechStackComponent },
  { path: 'uber-tool', component: UberToolComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GoogleTimeComponent,
    UberToolComponent,
    TechStackComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [GoogleMapsApiService, UberApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
