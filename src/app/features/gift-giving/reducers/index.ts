export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GiftGivingState {

}

// typing reducers using ActionReduserMap ensures that
// the type is enforced within the reducer
export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer
};
