import { ADD_USER } from "../action";

export default function user(state = [], action = { user: [] }) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];

        default:
          return state;
    

  }
}
