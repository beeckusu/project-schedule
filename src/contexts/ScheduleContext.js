import React, { createContext, useReducer } from 'react';


const ScheduleReducer = (state, action) => {

    switch (action.type) {
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
