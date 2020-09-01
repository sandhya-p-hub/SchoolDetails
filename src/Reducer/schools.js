import {  SET_SCHOOLS,SAVE_SCHOOL,UPDATE_SCHOOL,SCHOOL_DELETED } from "../action";

export default function schools(state = [], action = {}) {
    switch(action.type) {
      case SET_SCHOOLS:
        console.log("action",action)
        return [
          ...state,
          ...action.schools
        
        ];
        case SAVE_SCHOOL:
        return [
          ...state,
          action.schools
        ];
      
        case UPDATE_SCHOOL:

        const updateRecord = state.map((el) => {
          if(el._id === action.id) {
            el = action.schools
          }
          return el;
        })
        return updateRecord;

        case SCHOOL_DELETED:
            return state.filter(item => item._id !== action.id);

       default: return state;
       
      }
      
    }