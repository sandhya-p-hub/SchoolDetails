import {  GET_SCHOOLAREA,SAVE_SCHOOLAREA } from "../action";

export default function schoolArea(state = [], action = {}) {
    switch(action.type) {
      case GET_SCHOOLAREA:
        return [
          ...state,
          action.schoolArea
        ];
        case SAVE_SCHOOLAREA:
          console.log("schollarea",action)
          return [
            ...state,
            action.schoolArea
          ];
       default: return state;
       
      }
      
    }