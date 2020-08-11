import React from "react";

const Library = (props) => {
  // console.log(props);
  let pathname = "Library";
  if (props.location.pathname === "/library") {
    pathname = "My Library";
  }

  return <div>{pathname}</div>;
};

export default Library;
