import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill}
      d="M2.752 15.89c.15.146.39.146.545 0L9.97 9.417l6.156 6.042c.15.146.395.146.545 0L29.955 2.504a.371.371 0 0 0 0-.531L28.046.109a.393.393 0 0 0-.545 0L16.404 10.927l-6.146-6.032a.392.392 0 0 0-.545 0L.846 13.49a.373.373 0 0 0 0 .532l1.906 1.868Z"
    />
  </svg>
);
export default SvgComponent;
