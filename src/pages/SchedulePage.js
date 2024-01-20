import React, { useContext } from 'react';
import { ScheduleContext } from '../contexts/ScheduleContext';
import generate_schedule from '../logic/Scheduler';

const SchedulePage = () => {

    const { state, dispatch } = useContext(ScheduleContext);
    let { individuals, schedule, startDate, endDate } = state;

    const handleOnSubmit = (e) => {

        let days = [];

        let current = new Date(startDate);
        let end = new Date(endDate);

        while (current <= end) {
            days.push({'date': new Date(current)});
            current.setDate(current.getDate() + 1);
        }
        

        schedule = generate_schedule(individuals, days);
        dispatch({ type: 'SET_SCHEDULE', schedule });
        console.log(schedule);
    };

    return (
        <div>
            {schedule.map((day) => (
                <div key={day.day}>
                    <span>{day.day}: </span>
                    <span>{day.person}</span>
                </div>
            ))}
            <button onClick={handleOnSubmit}>Submit</button>
        </div>
    );
};

export default SchedulePage;
