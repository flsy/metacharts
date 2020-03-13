import * as React from "react";

import focusedHOC from "../focusedHOC";
import { tooltipFormat } from "../utils";

interface Props {
    value: number;
    label?: string;

    valueFormat?: (value: number) => string;
    tooltipValueFormat?: (value: number) => string;
    children?: any;
}

const NumberChart = ({ value, label, valueFormat, tooltipValueFormat, children }: Props) => {

    return (
        <div className="NumberChart"
             title={`${label ? `${label}: ` : ""}${tooltipFormat(value, tooltipValueFormat, valueFormat)}`}>
            {children}
            <div className="value">
                {valueFormat ? valueFormat(value) : value}
            </div>
        </div>
    );
};

export default focusedHOC(NumberChart);
