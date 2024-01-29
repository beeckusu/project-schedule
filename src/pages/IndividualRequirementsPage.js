import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { ScheduleContext } from '../contexts/ScheduleContext';
import Calendar from '../components/Calendar';

const IndividualRequirementsPage = ({ individual, showModal, onClose }) => {

    const { dispatch } = useContext(ScheduleContext);

    const handleDateSelection = (date, remove = false) => {
        if (remove) {
            dispatch({ type: 'REMOVE_INDIVIDUAL_UNAVAILABLE_DATE', payload: { id: individual.id, date } });
        }
        else {
            dispatch({ type: 'ADD_INDIVIDUAL_UNAVAILABLE_DATE', payload: { id: individual.id, date } });
        }
    };

    return (
        <Modal show={showModal} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{individual.name} - Preferences</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Calendar onSelectDate={handleDateSelection} selectMultiple={true} isToggle={true} initialSelection={individual.unavailableDates}/>
            </Modal.Body>
            <Modal.Footer>
                <ul>
                    {individual.unavailableDates.map((date) => {
                        return <li>{date.toISOString().split('T')[0]}</li>
                    })}
                </ul>
            </Modal.Footer>
        </Modal>

    );

}

export default IndividualRequirementsPage;