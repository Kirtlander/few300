import { createAction } from '@ngrx/store';

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

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/recipients.actions';

export interface RecipientEntity {
  id: string;
  name: string;
  email: string;
  selectedHolidayIds: string[];
}

export interface RecipientState extends EntityState<RecipientEntity> {

}

export const adapter = createEntityAdapter<RecipientEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.recipientAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.loadRecipientsSucceeded, (state, action) => adapter.addAll(action.payload, state)),
  on(actions.addRecipientSucceeded, (state, action) => {
    const oldState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, oldState);
  }),
  on(actions.addRecipientFailed, (state, action) => adapter.removeOne(action.payload.id, state))
);

export function reducer(state: RecipientState = initialState, action: Action) {
  return reducerFunction(state, action);
}
