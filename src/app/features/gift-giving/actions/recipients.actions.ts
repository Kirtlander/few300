import { createAction, props } from '@ngrx/store';
import { RecipientEntity } from '../reducers/recipients.reducer';

let currentId = 1;
export const recipientAdded = createAction(
  '[gift giving] added a recipient',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    } as RecipientEntity
  })
);

export const addRecipientSucceeded = createAction(
  '[gift giving] recipient added successfully',
  props<{ payload: RecipientEntity, oldId: string, selectedHolidayIds: string[] }>()
);

export const addRecipientFailed = createAction(
  '[gift giving] adding a recipient failed',
  props<{ payload: RecipientEntity, message: string }>()
);

export const addRecipientHolidaysSucceeded = createAction(
  '[gift giving] recipient holidays added successfully',
  props<{ payload: RecipientEntity }>()
);

export const addRecipientHolidaysFailed = createAction(
  '[gift giving] adding recipient holidays failed',
  props<{ payload: RecipientEntity, message: string }>()
);

export const loadRecipients = createAction(
  '[gift giving] load the recipients'
);

export const loadRecipientsSucceeded = createAction(
  '[gift giving] recipients loaded successfully',
  props<{ payload: RecipientEntity[] }>()
);

export const loadRecipientsFailed = createAction(
  '[gift giving] loading the recipients failed',
  props<{ payload: string }>()
);
