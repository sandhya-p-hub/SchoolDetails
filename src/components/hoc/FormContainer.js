import React from "react";

const FromContainer = ({ children }) => {
  return (
    <div className="form-Container">
      <div className="form-Container__box">{children}</div>
    </div>
  );
};

export default FromContainer;
