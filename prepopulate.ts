import axios from 'axios';

const deployedURI = 'http://localhost:5000';

// TRAINING YEAR
function populateTrainingYears(data) {
    axios.post(`${deployedURI}/api/trainingYears`, data)
    .then(() => console.log("CREATED Training Year"))
    .catch(error => console.log("ERROR Training Year"))
}

// COURSE
function populateCourse(data) {
    axios.post(`${deployedURI}/api/courses`, data)
    .then(() => console.log("CREATED Course"))
    .catch(error => console.log("ERROR Course"))
}

// ROLE
function populateRoles(data) {
    axios.post(`${deployedURI}/api/roles`, data)
    .then(() => console.log("CREATED Role"))
    .catch(error => console.log("ERROR Role"))
}

//EMPLOYEE
function populateEmployees(data) {
    axios.post(`${deployedURI}/api/employees`, data)
    .then(() => console.log("CREATED Employee"))
    .catch(error => console.log(error)
    )
}

//BATCH
function populateBatches(data) {
    axios.post(`${deployedURI}/api/batches`, data)
    .then(() => console.log("CREATED Batch"))
    .catch(error => console.log("ERROR Batch"))
}

// TRAINEE PROFILE
function populateTrainees(data) {
    axios.post(`${deployedURI}/api/trainees`, data)
    .then(() => console.log("CREATED Trainee"))
    .catch(error => console.log(error))
}

function populateTraineeRegistration(traineeID, data) {
    axios.post(`${deployedURI}/api/trainees/${traineeID}/registrations/`, data)
    .then(() => console.log("CREATED Registration"))
    .catch(error => console.log(error))
}

/* ===== POPULATE HERE ===== */

// REQUIRED TO POPULATE ROLES IN BACKEND
populateRoles({
    roleName: "Teacher"
})
populateRoles({
    roleName: "Cashier"
})
populateRoles({
    roleName: "Registrar"
})

// populateTrainingYears({
//     trainingYearSpan: "2019-2020"
// })
// populateTrainingYears({
//     trainingYearSpan: "2020-2021"
// })
// populateTrainingYears({
//     trainingYearSpan: "2021-2022"
// })

// populateCourse({
//     courseName: "Pre-Licensing Training Course (PLTC)",
//     courseDescription: "The Pre-Licensing Training Course is designed for individuals who had no previous formal security training or License to Exercise Security Profession (LESP) and aspire to be a security guard. This course introduces the trainee to the security services industry, its basic laws and regulations, as well as, what it takes to be a security professional.",
//     requiredHours: 123,
//     units: 60,
//     trainingYearId: 1
// })
// populateCourse({
//     courseName: "Basic Security Supervisory Course (BSSC)",
//     courseDescription: "The Basic Security Supervisory Course is designed for security professionals aspiring to become a security officer (SO). This course concentrates on training security professionals into being a leader with modules designed to improve their skills in management, plan-making, decision-making, and organization.",
//     requiredHours: 130,
//     units: 76,
//     trainingYearId: 1
// })
// populateCourse({
//     courseName: "In-Service Enhancement Security Training Course (ISESTC)",
//     courseDescription: "The In-Service Enhancement Security Training Course is the first part of the overall re-training course designed for security guards and security officers whose License to Exercise Security Profession (LESP) is up for renewal. This course enhances and updates the security professional’s knowledge of his profession.",
//     requiredHours: 165,
//     units: 62,
//     trainingYearId: 1
// })
// populateCourse({
//     courseName: "Refresher Training Course (RTC)",
//     courseDescription: "The Refresher Training Course is the second part of the overall re-training course that provides basic awareness of security related issues that can potentially affect responsibilities within the purview of their employment. It will improve observation, detection and reporting capabilities while enhancing coordination capability with other emergency response professionals.",
//     requiredHours: 100,
//     units: 60,
//     trainingYearId: 1
// })

// populateEmployees({
//     firstName: "Cyril",
//     middleName: "Malinao",
//     lastName: "Olanolan",
//     birthDay: "2001-11-11T00:00:00.000Z",
//     sex: "Male",
//     emailAdd: "olanolancyrilm@gmail.com",
//     cpNum: "09456789012",
//     employeeStatus: "Active",
//     dateHired: "2022-09-24T00:00:00.000Z",
//     roleId: 1,
//     address: "Marapangi",
//     maritalStatus: "Single"
// })

// populateEmployees({
//     firstName: "Louis Miguel",
//     middleName: "Jaboc",
//     lastName: "Pawaon",
//     birthDay: "2001-10-16T00:00:00.000Z",
//     sex: "Male",
//     emailAdd: "lmjpawaon@addu.edu.ph",
//     cpNum: "09987654321",
//     employeeStatus: "Active",
//     dateHired: "2022-09-24T00:00:00.000Z",
//     roleId: 1,
//     address: "IWHA",
//     maritalStatus: "Single"
// })

// populateEmployees({
//     firstName: "Euan",
//     lastName: "Abalos",
//     birthDay: "2001-12-12T00:00:00.000Z",
//     sex: "Male",
//     emailAdd: "abalose@addu.edu.ph",
//     cpNum: "09123456789",
//     employeeStatus: "Active",
//     dateHired: "2022-09-24T00:00:00.000Z",
//     roleId: 2,
//     address: "Davao",
//     maritalStatus: "Single"
// })

// populateBatches({
//     laNumber:"123",
//     batchName:"Batch 1",
//     startDate: "2019-10-11T00:00:00.000Z",
//     endDate: "2020-11-11T00:00:00.000Z",
//     maxStudents: 30,
//     courseId:1,
//     employeeId: 2
// })

// populateBatches({
//     laNumber:"456",
//     batchName:"Batch 2",
//     startDate: "2021-11-11T00:00:00.000Z",
//     endDate: "2022-11-11T00:00:00.000Z",
//     maxStudents: 30,
//     courseId:2,
//     employeeId: 1
// })

// populateBatches({
//     laNumber:"789",
//     batchName:"Batch 3",
//     startDate: "2020-11-11T00:00:00.000Z",
//     endDate: "2021-11-11T00:00:00.000Z",
//     maxStudents: 30,
//     courseId:1,
//     employeeId: 3
// })

// populateTrainees({
//     "firstName": "Cyril",
//     "middleName": "Malinao",
//     "lastName": "Olanolan",
//     "birthDay": "2001-12-12T00:00:00.000Z",
//     "sex": "Male",
//     "address": "Toril",
//     "emailAdd": "olanolancyrilm@gmail.com",
//     "cpNum": "09782345678",
//     "educationalAttainment": "Undergraduate",
//     "yearGrad": "2022"
// })

// populateTrainees({
//     "firstName": "Julienne",
//     "middleName": "Andrea",
//     "lastName": "Panes",
//     "birthDay": "2001-12-12T00:00:00.000Z",
//     "sex": "Female",
//     "address": "Toril",
//     "emailAdd": "idk@gmail.com",
//     "cpNum": "09782345678",
//     "educationalAttainment": "Undergraduate",
//     "yearGrad": "2020"
// })

// populateTrainees({
//     "firstName": "Voldemort",
//     "middleName": "Harry",
//     "lastName": "Potter",
//     "birthDay": "2001-12-12T00:00:00.000Z",
//     "sex": "Male",
//     "address": "Toril",
//     "emailAdd": "asdasd@gmail.com",
//     "cpNum": "09782345678",
//     "educationalAttainment": "Undergraduate",
//     "yearGrad": "2020"
// })

// for (let i=1; i <= 6; i++) {
//     populateTraineeRegistration(2, {
//         "batchId": 1,
//         "SSSNum": "123",
//         "TINNum": "456",
//         "registrationStatus": "Dropped",
//         "dateEnrolled": "2001-12-12T00:00:00.000Z",
//         "data.SGLicense": "123123123",
//         "data.expiryDate": "567678"
//     })
// }