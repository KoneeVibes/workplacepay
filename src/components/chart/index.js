import { ChartWrapper } from "./styled";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Chart = ({ title, labels, datasets }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const data = {
        labels: labels,
        datasets: datasets
    };
    return (
        <ChartWrapper>
            <Line data={data} options={options} className="line-graph-component" />
        </ChartWrapper>
    )
}