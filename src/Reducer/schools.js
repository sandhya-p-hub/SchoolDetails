import {  SET_SCHOOLS } from "../action";

export default function schools(state = [], action = {}) {
    switch(action.type) {
      case SET_SCHOOLS:
        console.log("action",action)
        return [
          ...state,
          action.schools
        
        ];
        
       default: return state;
       
      }
      
    }