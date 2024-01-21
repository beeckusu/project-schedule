import React, { useContext, useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import { ScheduleContext } from '../contexts/ScheduleContext';
import Calendar from '../components/Calendar';

const SelectedDateOptions = ({ date }) => {

    const { state, dispatch } = useContext(ScheduleContext);
    const [shiftCount, setShiftCount] = useState(0);
    const dateOptions = state.schedule.find((dateOptions) => dateOptions.date.getTime() === date.getTime());

    const handleOnSetShiftCount = () => {

        dispatch({ type: 'SET_DATE_SHIFT_COUNT', payload: { date, shiftCount } });
    }

    return (
        <Table>
            <tr>
                <td><Form.Label><b>Date</b></Form.Label></td>
                <td><Form.Control type='text' value={date.toISOString().split('T')[0]} disabled /></td>
            </tr>
            <tr>
                <td><Form.Label><b>Current Count</b></Form.Label></td>
                <td><Form.Control type='text' value={dateOptions ? dateOptions.options.shiftCount : 0} disabled /></td>
            </tr>
            <tr>
                <td><Form.Label><b>Set Shift Count</b></Form.Label></td>
                <td><Form.Control type='number' min="0"
                    defaultValue={dateOptions ? dateOptions.options.shiftCount : 0}
                    onChange={(e) => setShiftCount(e.target.value)} /></td>
                    <td><Button onClick={
                        () => handleOnSetShiftCount()
                    }>Set</Button></td>
            </tr>
        </Table>
    );
}

const ScheduleOptionsPage = () => {

    const { state, dispatch } = useContext(ScheduleContext);
    const [allShiftCount, setAllShiftCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(state.startDate);

    const handleStartDateChange = (date) => {
        dispatch({ type: 'CHANGE_START_DATE', payload: date });
    };
    const handleEndDateChange = (date) => {
        dispatch({ type: 'CHANGE_END_DATE', payload: date });
    }
    const handleOnSetAllShifts = (shiftCount) => {
        dispatch({ type: 'SET_GLOBAL_SCHEDULE_SHIFT_COUNT', payload: parseInt(shiftCount) });
    };


    return (
        <Form>
            <h1>Schedule Options</h1>
            <Table>
                <tr>
                    <td><Form.Label><b>Start Date</b></Form.Label></td>
                    <td><Form.Control type='date' defaultValue={state.startDate.toISOString().split('T')[0]} onChange={(e) => handleStartDateChange(e.target.value)} /></td>
                </tr>
                <tr>
                    <td><Form.Label><b>End Date</b></Form.Label></td>
                    <td><Form.Control type='date' defaultValue={state.endDate.toISOString().split('T')[0]} onChange={(e) => handleEndDateChange(e.target.value)} /></td>
                </tr>
                <tr>
                    <td><Form.Label><b>Set Daily Shift Count</b></Form.Label></td>
                    <td><Form.Control type='number' min="0" onChange={(e) => setAllShiftCount(e.target.value)} /></td>
                    <td><Button onClick={(e) => handleOnSetAllShifts(allShiftCount)}>Update</Button></td>
                </tr>
            </Table>
            <Calendar date={state.startDate} onSelectDate={(e) => { setSelectedDate(e) }} />
            <SelectedDateOptions date={selectedDate} />
        </Form>
    );
};

export default ScheduleOptionsPage;
