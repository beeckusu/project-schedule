import React, { createContext, useReducer } from 'react';


const ScheduleReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_INDIVIDUAL':
            return {
                ...state,
                individuals: [
                    ...state.individuals,
                    {
                        id: Math.random(),
                        name: action.payload,
                        minShiftCount: 0,
                        maxShiftCount: 0,
                    },
                ],
            };
        case 'REMOVE_INDIVIDUAL':
            return {
                ...state,
                individuals: state.individuals.filter(
                    (individual) => individual.id !== action.payload
                ),
            };

        case 'CHANGE_INDIVIDUAL_NAME':
            return {
                ...state,
                individuals: state.individuals.map((individual) => {
                    if (individual.id === action.payload.id) {
                        return {
                            ...individual,
                            name: action.payload.name,
                        };
                    }
                    return individual;
                }),
            };
        
        case 'CHANGE_INDIVIDUAL_SHIFT_COUNT':
            return {
                ...state,
                individuals: state.individuals.map((individual) => {
                    if (individual.id === action.payload.id && action.payload.shiftCount >= 0) {
                        return {
                            ...individual,
                            maxShiftCount: action.payload.isMax ? action.payload.shiftCount : Math.max(individual.maxShiftCount, action.payload.shiftCount),
                            minShiftCount: !action.payload.isMax ?action.payload.shiftCount : Math.min(individual.minShiftCount, action.payload.shiftCount),

                        };
                    }
                    return individual;
                }),
            };
        
        case 'CHANGE_START_DATE':
            return {
                ...state,
                startDate: action.payload,
            };
        
        case 'CHANGE_END_DATE':
            return {
                ...state,
                endDate: action.payload,
            };

        default:
            return state;
    }
}

const ScheduleContext = createContext();

const initialState = {
    individuals: [],    // List of objects representing individuals
    startDate: null,
    endDate: null,
    schedule: [],       // List of objects representing days in the schedule
}

const ScheduleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ScheduleReducer, initialState);

    return (
        <ScheduleContext.Provider value={{ state, dispatch }}>
            {children}
        </ScheduleContext.Provider>
    );
}

export { ScheduleContext, ScheduleProvider };
