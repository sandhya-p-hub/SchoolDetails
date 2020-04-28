import React from "react";
import{NavLink} from "react-router-dom"

const LinkBtn = ({to, label}) => <NavLink className="btn" to={to}>{label}</NavLink>; 
export default LinkBtn;