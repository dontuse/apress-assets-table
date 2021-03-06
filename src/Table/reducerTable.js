import {CONFIG_SET_PER_PAGE} from '../Filter/actions';
import {
  TABLE_EDITOR_LOAD_START,
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_CHECK,
  TABLE_EDITOR_SET_CHECK_ALL,
  TABLE_EDITOR_SET_CHECK_ALL_RESET,
} from './actions';

const initialState = {
  columns: [],
  checked: [],
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_START:
      return {
        ...state,
        isLoaded: false
      };

    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        columns: action.payload.columns,
        new_row: action.payload.new_row,
        total: action.payload.total,
        isLoaded: true
      };

    case TABLE_EDITOR_SET_CHECK:
      return {
        ...state,
        checked: action.payload.checked ?
          [...state.checked, action.payload.id] :
          state.checked.filter(id => id !== action.payload.id)
      };

    case TABLE_EDITOR_SET_CHECK_ALL_RESET:
      return {
        ...state,
        checked: initialState.checked,
      };

    case CONFIG_SET_PER_PAGE:
    case TABLE_EDITOR_SET_CHECK_ALL:
      return {
        ...state,
        checked: action.payload.checked ? action.payload.id : []
      };

    default:
      return state;
  }
}
