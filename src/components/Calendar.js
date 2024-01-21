import { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import './Calendar.css';


const Calendar = ({ date, onSelectDate }) => {

    const [selectedDate, setSelectedDate] = useState(date);

    const handleSelectDate = (day) => {
        setSelectedDate(day);
        onSelectDate(new Date(date.getUTCFullYear(), date.getUTCMonth(), day));
    };

    let startDay = (date.getUTCDay() - date.getUTCDate() + 1) % 7;
    if (startDay < 0) {
        startDay += 7;
    }
    let daysInMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getDate();

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
                                            variant={day === selectedDate ? 'primary' : 'secondary'}
                                            onClick={() => {
                                                handleSelectDate(day);
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