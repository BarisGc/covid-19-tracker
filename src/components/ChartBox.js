import React from 'react'
import { Col, Card, Row } from 'react-bootstrap';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from './general/Loading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { Bar, Chart } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// Chart.defaults.global.legend.display = false

function ChartBox() {
    // Global States & Selectors
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid19Data.status);
    const dataList = useSelector((state) => state.covid19Data.dataList);
    const selectedLocation = useSelector((state) => state.covid19Data.selectedLocation);

    console.log("dataList", dataList)
    console.log("status", status)
    console.log("selectedLocation", selectedLocation)

    const selectedLocationData = dataList.filter((data) => {
        return data.Slug == selectedLocation.value
    })
    console.log("selectedLocationData", selectedLocationData)
    console.log("selectedLocationData[0]", selectedLocationData[0])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'Summary Chart',
            },
        },
    };

    const labels = ['Infected', 'Recovered', 'Deaths', 'Active'];

    const data = {
        labels,
        datasets: [
            {
                label: "Infected",
                data: [
                    selectedLocationData[0] && selectedLocationData[0].TotalConfirmed,
                    selectedLocationData[0] && selectedLocationData[0].TotalRecovered,
                    selectedLocationData[0] && selectedLocationData[0].TotalDeaths,
                    selectedLocationData[0] && selectedLocationData[0].TotalConfirmed - selectedLocationData[0].TotalDeaths],

                backgroundColor: ['#576BFE', '#6EFA70', '#F96A6A', '#F2E564'],
                barPercentage: 1.0,
                categoryPercentage: 1.0
            },

        ],
    };
    return (
        <>
            {status === 'loading' && <Loading />}
            {status === 'succeeded' &&
                <Col md={{ span: 10, offset: 1 }} className='mt-3'>
                    <Bar options={options} data={data} />
                </Col>}
        </>
    )
}

export default ChartBox