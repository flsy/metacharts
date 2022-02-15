import * as React from "react";

import { axisLeft,ScaleLinear, select } from "d3";
import { max } from "../utils";

interface YAxisProps {
    scale: ScaleLinear<number, any | {}>;
    axisWidthUpdated?: (labelMaxWidth: number) => void;
    tickFormat?: (value: number) => string;
    ticks?: number;
}

class YAxis extends React.Component<YAxisProps, {}> {
    private axis: SVGGElement | undefined | null;

    public componentDidMount() {
        this.updateAxis();
    }

    public componentDidUpdate(prevProps: YAxisProps) {
        this.updateAxis();
    }

    public updateAxis() {
        const d = axisLeft(this.props.scale)
        if (this.props.tickFormat) {
            d.tickFormat(this.props.tickFormat as any)
        }
        if (this.props.ticks) {
            d.ticks(this.props.ticks)
        }
        if (!this.axis) {
            return;
        }
        const axis = select(this.axis).call(d as any);

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
