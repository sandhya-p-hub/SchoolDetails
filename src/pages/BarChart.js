import React from 'react';
import {
	ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Label
} from 'recharts';

import { connect } from 'react-redux';

const CHART_HEIGHT = 200;

const labelStyle = {
	fontWeight: "bold",
	fontSize: 16
}

const BarChart = (props) => {
	const { chartData } = props;
	return <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
		<LineChart
			width={100}
			height={CHART_HEIGHT}
			data={chartData}
			margin={{
				top: 5, right: 10, left: 10, bottom: 30,
			}}
		>
			<CartesianGrid />
			<XAxis tickLine={false} axisLine={false} dataKey="NoInStock">
				<Label value="No of Branches" style={labelStyle} offset={0} position="bottom" />
			</XAxis>
			<YAxis axisLine={false} label={{ value: "Count", angle: -90, position: "left", ...labelStyle }} />
			<Line dataKey="count" stroke="blue" />
		</LineChart>
	</ResponsiveContainer>
}

const mapStateToProps = (state) => {
	return {
		chartData: state.chartData
	}
}

export default connect(mapStateToProps, {})(BarChart);