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
    }
  })
);

export const loadRecipients = createAction(
  '[gift giving] load the recipients'
);

export const loadRecipientsSucceeded = createAction(
  '[gift giving] loading the recipients worked',
  props<{ payload: RecipientEntity[] }>()
);

export const loadRecipientsFailed = createAction(
  '[gift giving] loading the recipients failed',
  props<{ payload: string }>()
);
