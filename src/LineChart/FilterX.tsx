import * as React from "react";

interface Props {
  height: number;
  width: number;
  x: number;
  colour: string;
  handlePadding: number;

  focusedFrom: boolean;
  focusedTo: boolean;
}

const Filter = ({
  height,
  width,
  x,
  colour,
  handlePadding,
  focusedFrom,
  focusedTo,
}: Props) => {
  const strokeWidth = handlePadding * 2;
  return (
    <g>
      <rect
        x={x}
        y={0}
        width={width}
        height={height}
        cursor="move"
        fill={colour}
        opacity={0.5}
      />
      <line
        x2={x}
        x1={x}
        y1={0}
        y2={height}
        stroke={focusedFrom ? "grey" : "lightgrey"}
        strokeWidth={strokeWidth}
      />
      <line
        x2={x + width}
        x1={x + width}
        y1={0}
        y2={height}
        stroke={focusedTo ? "grey" : "lightgrey"}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default Filter;
