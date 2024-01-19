import React, { useContext } from 'react';
import { Form, Table } from 'react-bootstrap';
import { ScheduleContext } from '../contexts/ScheduleContext';

const ScheduleOptionsPage = () => {

    const { dispatch } = useContext(ScheduleContext);

    const handleStartDateChange = (date) => {
        dispatch({ type: 'CHANGE_START_DATE', payload: date })
    };
    const handleEndDateChange = (date) => {
        dispatch({ type: 'CHANGE_END_DATE', payload: date })
    }

    return (
        <Form>
            <h1>Schedule Options</h1>
            <Table>
                <tr>
                    <td><Form.Label><b>Start Date</b></Form.Label></td>
                    <td><Form.Control type='date' onChange={(e) => handleStartDateChange(e.target.value)} /></td>
                </tr>
                <tr>
                    <td><Form.Label><b>End Date</b></Form.Label></td>
                    <td><Form.Control type='date' onChange={(e) => handleEndDateChange(e.target.value)} /></td>
                </tr>
            </Table>
        </Form>
    );
};

export default ScheduleOptionsPage;
