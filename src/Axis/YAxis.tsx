import * as React from "react";

import { axisLeft,ScaleLinear, select } from "d3";
import { max } from "../utils";

interface YAxisProps {
    scale: ScaleLinear<number, any | {}>;
    axisWidthUpdated?: (labelMaxWidth: number) => void;
    tickFormat?: (value: number) => string;
}

class YAxis extends React.Component<YAxisProps, {}> {
    // @ts-ignore
    private axis: SVGGElement | null;

    public componentDidMount() {
        this.updateAxis();
    }

    public componentDidUpdate(prevProps: YAxisProps) {
        this.updateAxis();
    }

    public updateAxis() {
        // @ts-ignore
        const axis = select(this.axis).call(axisLeft(this.props.scale).tickFormat(this.props.tickFormat || null));

        if (this.props.axisWidthUpdated) {
            // @ts-ignore
            const widths = axis.selectAll("g.tick text").nodes().map((d: SVGTextContentElement) => d.getComputedTextLength());

            this.props.axisWidthUpdated(max(widths));
        }
    }

    public render() {
        return <g ref={(t) => (this.axis = t)} />;
    }
}

export default YAxis;
