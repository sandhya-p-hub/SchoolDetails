import {  GET_INSTITUTEAREA } from "../action";

export default function InstituteArea(state = [], action = {}) {
    switch(action.type) {
      case GET_INSTITUTEAREA:
        console.log("areaAction",action)
        return [
          ...state,
          action.InstituteArea
        ];
        
       default: return state;
       
      }
      
    }