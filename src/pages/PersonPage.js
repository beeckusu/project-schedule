import React, { useContext, useState } from 'react';
import { ScheduleContext } from '../contexts/ScheduleContext';
import { Button, Table } from 'react-bootstrap';

const PersonRow = ({ individual }) => {
    const { dispatch } = useContext(ScheduleContext);

    const handleRemoveIndividual = (id) => {
        dispatch({ type: 'REMOVE_INDIVIDUAL', payload: id });
    };

    const setIndividualName = (name) => {
        dispatch({ type: 'CHANGE_INDIVIDUAL_NAME', payload: { id: individual.id, name } });
    };

    const setIndividualShiftCount = (shiftCount, isMax = true) => {
        dispatch({ type: 'CHANGE_INDIVIDUAL_SHIFT_COUNT', payload: { id: individual.id, shiftCount, isMax } });
    };


    return (
        <tr>
            <td>
                <input
                    type="text"
                    value={individual.name}
                    onChange={(e) => setIndividualName(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={individual.minShiftCount}
                    onChange={(e) => setIndividualShiftCount(e.target.value, false)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={individual.maxShiftCount}
                    onChange={(e) => setIndividualShiftCount(e.target.value)}
                />
            </td>
            <td>
                <Button onClick={() => handleRemoveIndividual(individual.id)}>Remove</Button>
            </td>
        </tr>
    );
};

const PersonPage = () => {
    const { state, dispatch } = useContext(ScheduleContext);
    const { individuals } = state;
    const [newIndividual, setNewIndividual] = useState('');

    const handleAddIndividual = () => {
        if (newIndividual.trim() !== '') {
            dispatch({ type: 'ADD_INDIVIDUAL', payload: newIndividual });
            setNewIndividual('');
        }
    };


    return (
        <div>
            <h1>Person Page</h1>
            <Table>
                <thead>
                    <th>Name</th>
                    <th>Min Shifts</th>
                    <th>Max Shifts</th>
                    <th></th>
                </thead>
                {individuals.map((individual) => (
                    <PersonRow
                        key={individual.id}
                        individual={individual}
                    />
                ))}
            </Table>
            <input
                type="text"
                value={newIndividual}
                onChange={(e) => setNewIndividual(e.target.value)}
            />
            <Button onClick={handleAddIndividual}>Add</Button>
        </div>
    );
};

export default PersonPage;
