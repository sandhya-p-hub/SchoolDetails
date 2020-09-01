import { CHART_DATA } from '../action';

export default function chartData(state = [], action = {}) {
	switch (action.type) {
		case CHART_DATA:
			return action.chartData;
		default: return state;
	}
}