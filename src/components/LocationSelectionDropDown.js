import Select from 'react-select';
import 'react-dropdown/style.css';

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Loading from './general/Loading';
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
            {status === 'loading' && <Loading />}
            {status === 'succeeded' && <Col md={{ span: 4, offset: 4 }} className='mt-3'>
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