const weekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function returnMonth(date) {
    const dateObj = new Date(date);
    const month = monthNames[dateObj.getMonth()];
    return month;
}

function returnDay(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    return day;
}

function returnWeekday(date) {
    const dateObj = new Date(date);
    const weekday = weekdayArr[dateObj.getDay()];
    return weekday;
}

export { returnMonth, returnDay, returnWeekday };