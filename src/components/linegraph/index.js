import { LineGraphWrapper } from "./styled";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	zoomPlugin
);

export const LineGraph = ({ title, labels, datasets, bgColor }) => {
	const MAX_CHARS = 7;
	const truncatedLabels = labels.map((label) => {
		if (typeof label === "string" && label.length > MAX_CHARS) {
			return label.substring(0, MAX_CHARS) + "...";
		}
		return label;
	});

	const initialViewCount = 10;
	const startIndex = Math.max(0, truncatedLabels.length - initialViewCount);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: title,
			},
			zoom: {
				pan: {
					enabled: true,
					mode: "x",
					modifierKey: "ctrl",
				},
				zoom: {
					wheel: {
						enabled: true,
						modifierKey: "ctrl",
					},
					pinch: {
						enabled: true,
					},
					mode: "x",
					drag: {
						enabled: true,
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
			x: {
				min: truncatedLabels[startIndex],
				max: truncatedLabels[truncatedLabels.length - 1],
				ticks: {
					maxRotation: 45,
					minRotation: 45,
				},
				autoSkip: true,
				maxTicksLimit: 20,
			},
		},
	};

	const data = {
		labels: truncatedLabels,
		datasets: datasets,
	};

	return (
		<LineGraphWrapper bgColor={bgColor}>
			<Line data={data} options={options} className="line-graph-component" />
		</LineGraphWrapper>
	);
};
