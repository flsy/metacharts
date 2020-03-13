import { mount } from "enzyme";
import * as React from "react";
import BarChart from "./BarChart";

describe("<BarChart />", () => {
    it("renders bar chart with one bar", () => {
        const data = [
            { key: "a", value: 4 },
        ];
        const chart = mount(<BarChart data={data} width={100} height={100} colour="green" />);

        const rect = chart.find("rect");
        expect(rect.length).toEqual(1);
        expect(rect.first().prop("fill")).toEqual("green");

        const titles = chart.find("title");
        expect(titles.length).toEqual(1);
        expect(titles.first().text()).toEqual("a: 4");
        chart.unmount();
    });

    it("renders bar chart with two bars and formatted labels", () => {
        const data = [
            { key: "a", value: 4 },
            { key: "b", value: 6 },
        ];
        const chart = mount(<BarChart data={data} width={100} height={100} colour="green"
                                      valueFormat={(value) => `#${value}`} />);

        expect(chart.find("rect").length).toEqual(2);

        const titles = chart.find("title");
        expect(titles.length).toEqual(2);
        expect(titles.at(0).text()).toEqual("a: #4");
        expect(titles.at(1).text()).toEqual("b: #6");
        chart.unmount();
    });

    it("renders bar charts with right axis labels", () => {
        const chart = mount(<BarChart data={[]} width={100} height={100} colour="green" xAxisLabel="First"
                                      yAxisLabel="Second" />);

        const labels = chart.find(".BarChart__label");
        expect(labels.length).toEqual(2);

        expect(labels.at(0).text()).toEqual("First");
        expect(labels.at(1).text()).toEqual("Second");
        chart.unmount();
    });
});
