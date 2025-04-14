import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutWrapper } from "./styled";
import { H2 } from "../typography/styled";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ labels, values, title }) => {
    const data = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: [
                '#3052CC',
                '#E40C5B',
            ],
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        datasets: {
            doughnut: {
                borderColor: "transparent",
            }
        }
    }

    return (
        <DoughnutWrapper>
            {title && <H2>{title}</H2>}
            <Doughnut
                data={data}
                options={options}
                width={"100%"}
            />
        </DoughnutWrapper>
    )
}