import React from 'react'
import { Spinner, Col } from 'react-bootstrap'
function Loading() {
    return (
        <Col xs={12} className='d-flex justify-content-center'>
            <span className='me-2'>Please Wait</span>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
            <span className='ms-2'>Refresh If Data Is Not Displayed</span>
        </Col>
    )
}

export default Loading