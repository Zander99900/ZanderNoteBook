import React from "react";

export const Alerts = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    //The first 'props.alert &&' is used so that if initially the props.alert value is null then it will not move further and the function is stopped there only
    //This style height is used to reduce cls: cummulitive layout shift
    <div>
      <div class="alert alert-primary" role="alert">
        {props.message}
      </div>
    </div>
  );
}
