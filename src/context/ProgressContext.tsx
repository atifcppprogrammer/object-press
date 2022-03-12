import { createCtx } from './create-context';

const initialState = {
  isOpen: false,
  progressComponent: null,
  confirmed: false,
};
type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        progressComponent: action.progressComponent,
        confirmed: false,
      };
    case 'CANCEL_MODAL':
      return {
        ...state,
        isOpen: false,
        progressComponent: null,
        confirmed: false,
      };
    case 'CONFIRM_MODAL':
      return {
        ...state,
        isOpen: false,
        progressComponent: null,
        confirmed: true,
      };
    case 'OPEN_TOAST':
      return {
        ...state,
        isOpen: false,
        progressComponent: action.progressComponent,
        confirmed: false,
      };
    default:
      return state;
  }
}
const [useProgressState, useProgressDispatch, ProgressProvider] = createCtx(
  initialState,
  reducer
);

export { useProgressState, useProgressDispatch, ProgressProvider };
