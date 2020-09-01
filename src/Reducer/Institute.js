import { GET_INSTITUTE } from "../action";

export default function Institute(state = [], action = []) {
  switch (action.type) {
    case GET_INSTITUTE:
      return [...state, ...action.Institute];

    default:
      return state;
  }
}
