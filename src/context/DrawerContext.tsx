import { createCtx } from './create-context';

const initialState = {
  isOpen: false,
  drawerComponent: [],
  data: [],
  urlStack: [],
  consumedUrl: undefined,
  newUrl: undefined,
};
type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      const components = [...state.drawerComponent, action.drawerComponent];
      return {
        ...state,
        isOpen: Boolean(components.length),
        drawerComponent: components,
        data: [...state.data, action.data],
        urlStack: [...state.urlStack, action.backUrl],
        newUrl: action.newUrl,
        consumedUrl: undefined,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        isOpen: Boolean(state.drawerComponent.slice(0, -1).length),
        drawerComponent: state.drawerComponent.slice(0, -1),
        data: state.data.slice(0, -1),
      };
    case 'CONSUME_URL_STACK':
      return {
        ...state,
        urlStack: state.urlStack.slice(0, -1),
        consumedUrl: state.urlStack.pop(),
        newUrl: undefined,
      };
    default:
      return state;
  }
}
const [useDrawerState, useDrawerDispatch, DrawerProvider] = createCtx(
  initialState,
  reducer
);

export { useDrawerState, useDrawerDispatch, DrawerProvider };
