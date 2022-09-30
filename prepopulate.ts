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

//POPULATE HERE
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
//     courseName: "Course 1",
//     courseDescription: "Course 1 description",
//     requiredHours: 123,
//     units: 60,
//     trainingYearId: 1
// })
// populateCourse({
//     courseName: "Course 2",
//     courseDescription: "Course 2 description",
//     requiredHours: 130,
//     units: 76,
//     trainingYearId: 2
// })
// populateCourse({
//     courseName: "Course 3",
//     courseDescription: "Course 3 description",
//     requiredHours: 165,
//     units: 62,
//     trainingYearId: 1
// })

// populateRoles({
//     roleName: "Teacher"
// })
// populateRoles({
//     roleName: "Cashier"
// })
// populateRoles({
//     roleName: "Registrar"
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