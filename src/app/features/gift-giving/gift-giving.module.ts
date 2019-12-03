import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftGivingComponent } from './gift-giving.component';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HolidaysComponent } from './containers/holidays/holidays.component';
import { RecipientsComponent } from './containers/recipients/recipients.component';
import { HolidayEntryComponent } from './containers/holidays/holiday-entry/holiday-entry.component';
import { HolidayListComponent } from './containers/holidays/holiday-list/holiday-list.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './reducers';

const routes: Routes = [
  {
    path: 'gift-giving',
    component: GiftGivingComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'recipients',
        component: RecipientsComponent
      },
      {
        path: 'holidays',
        component: HolidaysComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    GiftGivingComponent,
    NavComponent,
    DashboardComponent,
    HolidaysComponent,
    RecipientsComponent,
    HolidayEntryComponent,
    HolidayListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers)
  ]
})
export class GiftGivingModule { }
