import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCovidData } from "../redux/covid19DataSlice";
import { Col, Card, Row } from 'react-bootstrap';

function Content() {
    // Global States & Selectors
    const dispatch = useDispatch();
    const status = useSelector((state) => state.covid19Data.status);
    const dataList = useSelector((state) => state.covid19Data.dataList);
    const selectedLocation = useSelector((state) => state.covid19Data.selectedLocation);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCovidData());
        }
    }, [dispatch, status])

    const selectedLocationData = dataList.filter((data) => {

        return data.Slug == selectedLocation.value
    })
    console.log("selectedLocationData", selectedLocationData)



    return (
        <Col md={{ span: 8, offset: 2 }}>
            <Row xs={2} md={4} className="g-4">
                <Col>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last </small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last </small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last </small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}

export default Content