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
                            minShiftCount: !action.payload.isMax ? action.payload.shiftCount : Math.min(individual.minShiftCount, action.payload.shiftCount),

                        };
                    }
                    return individual;
                }),
            };

        case 'CHANGE_START_DATE':
            return {
                ...state,
                startDate: new Date(action.payload),
            };

        case 'CHANGE_END_DATE':
            return {
                ...state,
                endDate: new Date(action.payload),
            };

        case 'ADD_DATE_CONDITION':
            return {
                ...state,
                individuals: state.individuals.map((individual) => {
                    if (individual.id === action.payload.individualId) {
                        return {
                            ...individual,
                            dateConditions: [
                                ...individual.dateConditions,
                                {
                                    id: Math.random(),
                                    condition: action.payload.condition,
                                },
                            ],
                        };
                    }
                    return individual;
                }),
            };
        
        case 'REMOVE_DATE_CONDITION':
            return {
                ...state,
                individuals: state.individuals.map((individual) => {
                    if (individual.id === action.payload.individualId) {
                        return {
                            ...individual,
                            dateConditions: individual.dateConditions.filter(
                                (condition) => condition.id !== action.payload.conditionId
                            ),
                        };
                    }
                    return individual;
                }),
            };
        
        case 'SET_GLOBAL_SCHEDULE_SHIFT_COUNT':
            return {
                ...state,
                schedule: state.schedule.map((day) => {
                    return {
                        ...day,
                        options: {
                            ...day.options,
                            shiftCount: action.payload,
                        },
                    };
                }),
            };
        
        case 'SET_DATE_SHIFT_COUNT':

            return {
                ...state,
                schedule: state.schedule.map((day) => {
                    if (day.date.getTime() === action.payload.date.getTime()) {
                        return {
                            ...day,
                            options: {
                                ...day.options,
                                shiftCount: action.payload.shiftCount,
                            },
                        };
                    }
                    return day;
                }),
            };

        default:
            return state;
    }
}

const ScheduleContext = createContext();


const generateInitialSchedule = (startDate, endDate) => {
    const schedule = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        schedule.push({
            assigned: [],
            date: new Date(currentDate),
            options: { shiftCount: 0 },
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedule;
};

const initialState = {
    individuals: [
        /**List of objects representing individuals of the form:
         * {
         *  id: int,
         *  name: string,
         *  minShiftCount: int,
         *  maxShiftCount: int,
         *  dateConditions: array of objects of form:
         *    {
         *      id: int,
         *      condition: function of form (date) => boolean
         *    }
         * }
         */
    ],
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    schedule: generateInitialSchedule(new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
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
