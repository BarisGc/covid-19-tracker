import Select from 'react-select';
import 'react-dropdown/style.css';

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { fetchCovidData, changeSelectedLocation } from "../redux/covid19DataSlice";
import { Col } from 'react-bootstrap';

function LocationSelectionDropDown() {
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

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    const options = dataList.map((data) => {
        return {
            value: data.Slug,
            label: data.Country,
        }
    });
    options.unshift({
        value: 'global',
        label: 'Global',
    })
    options.pop(dataList[dataList.length - 1])

    console.log("options", options)
    console.log("dataList", dataList)

    const handleSelectedLocation = (selectedValue) => {
        dispatch(changeSelectedLocation(selectedValue));
    }
    return (
        <>
            {/* {status === 'loading' && <div xs={12} className='d-flex justify-content-center'><Loading /></div>} */}
            {status === 'succeeded' && <Col md={{ span: 4, offset: 4 }}>
                <Select
                    className={''}
                    name="selectedLocation"
                    value={selectedLocation}
                    onChange={handleSelectedLocation}
                    options={options}
                    autoFocus
                    isSearchable={true}
                    placeholder={'Select a Location'}
                />
            </Col>}

        </>
    )
}

export default LocationSelectionDropDown