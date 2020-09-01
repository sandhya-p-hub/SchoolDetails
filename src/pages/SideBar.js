import React, { Component } from "react";

const SideBar = props => {
  console.log("ites",props)
    const {
    items,
    onItemSelect,
    selectedItem
  } = props;
  
  return (
    <ul className="list-group">
                  {items.length>0 && items[0].map(item => (
        <li
          key={item._id}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem[0].name ? "list-group-item active" : "list-group-item"
          }        >
            {item.name}
        </li>
      ))}
    </ul>
  );
};


export default SideBar;
