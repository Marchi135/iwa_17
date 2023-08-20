const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const createArray = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
}

const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5);
    const result = [];

    for (const weekIndex of weeks) {
        const days = createArray(7);
        result.push({
            week: weekIndex + 1,
            days: days,
        });

        for (const dayIndex of days) {
            const day = dayIndex + 1 + weekIndex * 7 - startDay;
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days[dayIndex] = {
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            }
        }
    }

    return result;
}

const addCell = (existing, classString, value) => {
    const result = `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

    return result;
}

const createHtml = (data) => {
    let result = '';

    for (const { week, days } of data) {
        let inner = '';
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7; // Assuming 1 is Sunday and 7 is Saturday
            const isAlternate = week % 2 === 0;

            let classString = 'table__cell';

            if (isToday) classString += ` table__cell_today`; // Highlight today in blue
            if (isWeekend) classString += ` table__cell_weekend`;
            if (isAlternate) classString += ` table__cell_alternate`;

            inner = addCell(inner, classString, value);
        }

        result += `
            <tr>${inner}</tr>
        `;
    }

    return result;
}



const current = new Date();
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

const data = createData();
document.querySelector('[data-content]').innerHTML = createHtml(data);
