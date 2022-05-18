import React from 'react'
import { Col, Card } from 'react-bootstrap';

function Header() {
    return (
        <Col md={{ span: 12, offset: 0 }} className='justify-content-center d-flex mt-2'>
            <Card style={{ width: '30rem' }} border="light">
                <Card.Img variant="top" src="/assets/covid19_bannerV1.png" />
                <Card.Body>
                    <Card.Title className='fs-5 text-center'>Global And Country Wise Cases of Corona Virus</Card.Title>
                    <Card.Text className='fs-6 text-center'>
                        (For a Particular select a Country from below)
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Header