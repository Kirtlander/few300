export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayModels from '../models/holidays';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHolidayListContolModels from '../models/list-controls';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
}

// typing reducers using ActionReduserMap ensures that
// the type is enforced within the reducer
export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer
};

// SELECTORS

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);

// 2. Feature per branch
const selectHolidaysBranch = createSelector(selectGiftFeature,
  g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature,
  g => g.holidayListControls);

// 3. Helpers
const { selectAll: selectHolidayArray } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);

// 4. For the Components


// 4.a. We need one that returns a holiday model.
export const selectHolidayModel = createSelector(
  selectHolidayArray,
  (holidays) => {
    return {
      holidays // Note: Easy for now because they are the same.
    } as fromHolidayModels.HolidaysModel;
  });

export const selectHolidayListControlsModel = createSelector(
  selectHolidayListControlsBranch,
  b => {
    return {
      showingAll: b.showAll,
      showingUpcoming: !b.showAll,
      sortingByDate: b.sortBy === 'date',
      sortingByName: b.sortBy === 'name'
    } as fromHolidayListContolModels.ListControlsModel;
  }
);
