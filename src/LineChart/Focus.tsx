import * as React from "react";

interface Props {
  height: number;
  x: number;
  y: number;
}

const Focus = ({ height, x, y }: Props) => (
  <g>
    <line x1={0} x2={x} y1={y} y2={y} stroke="lightgrey" strokeWidth="1" />
    <line x1={x} x2={x} y1={y} y2={height} stroke="lightgrey" strokeWidth="1" />
    <circle r={4} cx={x} cy={y} />
  </g>
);

export default Focus;
