const generate_schedule = (people, days) => {

    validate_schedule(people, days);

    let schedule = [];
    let shift_counts = {};
    people.forEach(person => {
        shift_counts[person.id] = 0;
    });

    return generate_schedule_helper(people, days, schedule, shift_counts);

}

const generate_schedule_helper = (people, days, schedule, shift_counts) => {

    if (days.length === 0) {
        return schedule;
    }

    let day = days[0];
    let remaining_days = days.slice(1);

    let available_people = people.filter(person => {
        return can_assign_shift(person, day);
    });

    let assigned = false;
    for (let i = 0; i < available_people.length; i++) {
 
        let person = available_people[i];
        if (shift_counts[person.id] < person.maxShiftCount) {
            schedule.push({ person: person.id, day: day });
            shift_counts[person.id]++;
            assigned = true;

            let result = generate_schedule_helper(people, remaining_days, schedule, shift_counts);

            if (result) {
                return result;
            }

            schedule.pop();
            shift_counts[person.id]--;

        }
    }

    if (!assigned) {
        return [];
    }

}



const validate_schedule = (people, days) => {

    let min_shifts = 0;
    let max_shifts = 0;
    people.forEach(person => {
        min_shifts += person.minShiftCount;
        max_shifts += person.maxShiftCount;
    });

    if (min_shifts > days.length) {
        throw "Not enough days to schedule all shifts";
    }
    if (max_shifts < days.length) {
        throw "Too many days to schedule all shifts";
    }
}

const can_assign_shift = (person, day) => {
    return true;
}

export default generate_schedule;