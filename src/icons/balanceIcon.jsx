import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={110}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={3}
      d="M1.5 14.693c23.727 1.32 15.652-12.36 29.095-12.688 13.443-.329 9.21 16.03 20.604 10.436 19.37-9.508 21.683 9.284 30.774 9.555C92.393 22.306 94.9 5.952 108.5 6.02"
    />
  </svg>
);
export default SvgComponent;
