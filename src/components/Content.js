import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCovidData } from "../redux/covid19DataSlice";
import { Col, Card, Row } from 'react-bootstrap';
import Loading from './general/Loading';
import moment from 'moment';
import { useCountUp } from "use-count-up";
import Odometer from 'react-odometerjs';
import "odometer/themes/odometer-theme-default.css";
var numeral = require('numeral');

function Content() {
    // Global States & Selectors
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid19Data.status);
    const dataList = useSelector((state) => state.covid19Data.dataList);
    const selectedLocation = useSelector((state) => state.covid19Data.selectedLocation);

    // Use-Count-Up for Number Animations

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(7894);
    const [duration, setDuration] = useState(2);
    const [decimalPlaces, setDdecimalPlaces] = useState(0);
    const [easing, setEasing] = useState("easeOutCubic");
    const [thousandsSeparator, setThousandsSeparator] = useState("");
    const [decimalSeparator, setDecimalSeparator] = useState("");
    const { value, reset } = useCountUp({
        isCounting: true,
        start,
        end,
        duration,
        easing,
        decimalPlaces,
        thousandsSeparator,
        decimalSeparator
    });

    //Get Api Data
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCovidData());
        }
    }, [dispatch, status])

    const selectedLocationData = dataList.filter((data) => {
        return data.Slug == selectedLocation.value
    })
    if (selectedLocationData[0]) console.log("test", typeof (Number(numeral(selectedLocationData[0].TotalConfirmed).format('0,0'))))

    return (
        <>
            {status === 'loading' && <Loading />}
            {status === 'succeeded' && <Col md={{ span: 10, offset: 1 }}>
                <Row xs={2} md={4} className="g-4 mb-3">
                    <Col className='contentCards'>
                        <Card border="light">
                            <Card.Body className='infectedCardBody'>
                                <Card.Title className='mb-2 fs-6 fw-bolder lh-base'>Infected</Card.Title>
                                <Card.Text className='mb-2 fs-5 fw-semibold lh-base'>
                                    <Odometer value={selectedLocationData[0].TotalConfirmed} format="(.ddd)" />
                                </Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Last Updated at :`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('ddd MMM DD YYYY')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('HH:mm:ss')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Number of infect cases of`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`COVID-19`}</Card.Text>
                                {selectedLocationData[0].Country != 'Global' ? <Card.Text className='fs-6  lh-1'>{`${selectedLocationData[0].Country}`}</Card.Text> : ''}
                            </Card.Body>
                            <Card.Footer className='infectedCardFooter'>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className='contentCards'>
                        <Card border="light">
                            <Card.Body className='recoveredCardBody'>
                                <Card.Title className='mb-2 fs-6 fw-bolder lh-base'>Recovered</Card.Title>
                                <Card.Text className='mb-2 fs-5 fw-semibold lh-base'>
                                    <Odometer value={selectedLocationData[0].TotalRecovered ? selectedLocationData[0].TotalRecovered : 0} format="(.ddd)" />
                                </Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Last Updated at :`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('ddd MMM DD YYYY')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('HH:mm:ss')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Number of recoveries from`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`COVID-19`}</Card.Text>
                                {selectedLocationData[0].Country != 'Global' ? <Card.Text className='fs-6  lh-1'>{`${selectedLocationData[0].Country}`}</Card.Text> : ''}
                            </Card.Body>
                            <Card.Footer className='recoveredCardFooter'>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className='contentCards'>
                        <Card border="light">
                            <Card.Body className='deathsCardBody'>
                                <Card.Title className='mb-2 fs-6 fw-bolder lh-base'>Deaths</Card.Title>
                                <Card.Text className='mb-2 fs-5 fw-semibold lh-base'>
                                    <Odometer value={selectedLocationData[0].TotalDeaths} format="(.ddd)" />
                                </Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Last Updated at :`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('ddd MMM DD YYYY')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('HH:mm:ss')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Number of deaths caused by`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`COVID-19`}</Card.Text>
                                {selectedLocationData[0].Country != 'Global' ? <Card.Text className='fs-6  lh-1'>{`${selectedLocationData[0].Country}`}</Card.Text> : ''}
                            </Card.Body>
                            <Card.Footer className='deathsCardFooter'>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className='contentCards'>
                        <Card border="light">
                            <Card.Body className='activeCardBody'>
                                <Card.Title className='mb-2 fs-6 fw-bolder lh-base'>Active</Card.Title>
                                <Card.Text className='mb-2 fs-5 fw-semibold lh-base'>
                                    <Odometer value={selectedLocationData[0].TotalConfirmed - selectedLocationData[0].TotalDeaths} format="(.ddd)" />
                                </Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Last Updated at :`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('ddd MMM DD YYYY')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1 text-muted'>{`${moment(selectedLocationData[0].Date).format('HH:mm:ss')}`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`Number of active cases of`}</Card.Text>
                                <Card.Text className='mb-2 fs-6  lh-1'>{`COVID-19`}</Card.Text>
                                {selectedLocationData[0].Country != 'Global' ? <Card.Text className='fs-6  lh-1'>{`${selectedLocationData[0].Country}`}</Card.Text> : ''}
                            </Card.Body>
                            <Card.Footer className='activeCardFooter'>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Col>
            }
        </>
    )
}

export default Content