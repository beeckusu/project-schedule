import { useState, useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { ScheduleContext } from '../contexts/ScheduleContext';
import './Calendar.css';


const Calendar = ({ onSelectDate, selectMultiple = false, initialSelection = null, selectedClass = 'primary' }) => {

    const getInitialCalendarDays = (dates) => {
        dates = dates.filter((date) => {
            return date.getUTCFullYear() === calendarDate.getUTCFullYear() && date.getUTCMonth() === calendarDate.getUTCMonth();
        }).map((date) => {
            return date.getUTCDate();
        });
        return dates;
    }

    const { state } = useContext(ScheduleContext);

    const [calendarDate, setCalendarDate] = useState(state.startDate);

    let initialSelectedCalendarDays = initialSelection ? initialSelection : [];
    initialSelectedCalendarDays = getInitialCalendarDays(initialSelectedCalendarDays);
    const [selectedDates, setSelectedDates] = useState(initialSelectedCalendarDays);


    const handleSelectDate = (day, isSelected) => {
        if (selectMultiple) {
            if (!isSelected) {
                setSelectedDates([...selectedDates, day]);
            } else {
                setSelectedDates(selectedDates.filter((date) => date !== day));
            }
        } else {
            setSelectedDates([day]);
        }
        
        onSelectDate(new Date(calendarDate.getUTCFullYear(), calendarDate.getUTCMonth(), day), isSelected);
    };
    const handleChangeMonth = (direction) => {
        if (direction > 0) {
            setCalendarDate(new Date(calendarDate.getUTCFullYear(), calendarDate.getUTCMonth() + 1, 1));
        } else {
            setCalendarDate(new Date(calendarDate.getUTCFullYear(), calendarDate.getUTCMonth() - 1, 1));
        }
        setSelectedDates(getInitialCalendarDays(initialSelection));
    }


    let startDay = (calendarDate.getUTCDay() - calendarDate.getUTCDate() + 1) % 7;
    if (startDay < 0) {
        startDay += 7;
    }
    let daysInMonth = new Date(calendarDate.getUTCFullYear(), calendarDate.getUTCMonth() + 1, 0).getDate();

    let calendar = [];

    let week = [];
    for (let i = 0; i < startDay; i++) {
        week.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        week.push(i);
        if (week.length === 7) {
            calendar.push(week);
            week = [];
        }
    }

    if (week.length > 0 && week.length < 7) {
        for (let i = week.length; i < 7; i++) {
            week.push(null);
        }
        calendar.push(week);
    }


    return (
        <Container>
            <h1>{calendarDate.toLocaleString('default', { month: 'long' })} {calendarDate.getUTCFullYear()}</h1>
            <Table>
                <tr>
                    <td><Button onClick={(e) => { handleChangeMonth(-1) }}>&lt;</Button></td>
                    <td><Button onClick={(e) => { handleChangeMonth(1) }}>&gt;</Button></td>
                </tr>
            </Table>
            <Table className='calendar'>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, index) => (
                                <td className='day-cell' key={index}>
                                    {day === null ? null :
                                        <Button
                                            variant={selectedDates.includes(day) ? selectedClass : 'secondary'}
                                            onClick={() => {
                                                handleSelectDate(day, selectedDates.includes(day));
                                            }}
                                        >
                                            {day}
                                        </Button>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Calendar;