// Your code here
function createEmployeeRecord(details) {
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

function createEmployeeRecords(records) {
    return records.map(record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employee, dateStamp)  {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp)  {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    return (employee.timeOutEvents.find(event => {
        if(event.date === date) {
            return true
        }
    }).hour - employee.timeInEvents.find(event => {
        if(event.date === date) {
            return true
        }
    }).hour)/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee,date) * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((accumulator, currentEvent) => {
        return accumulator + wagesEarnedOnDate(employee , currentEvent.date)
    }, 0)
}

function calculatePayroll(employees) {
    return employees.reduce((accumulator, employee) => {
        return accumulator + allWagesFor(employee)
    }, 0)
}