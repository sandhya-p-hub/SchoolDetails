import React from 'react';

const DropDown =({name, handleChange, error, value})=>{
 
        return(
<div  className="dropdown">
<select
                name={name}
                onChange={handleChange}
                value={value}
                className="dropDown__box"
              >
               <option className="active">----please select the admin----</option>

               <option value="Institute" >Institute</option>
         <option value="School" >School</option>
             </select>
              {error && <div className="dropDown__error">{error}</div>}
        
          </div>
        )
}
export default DropDown;