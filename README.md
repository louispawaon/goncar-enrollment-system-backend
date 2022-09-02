The Backend Framework for Goncar Security Training Academy's Enrollment System In fullfillment for Software Engineering 2


# **REST API ROUTES**

>ENROLLMENT MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 1.1 | POST | Create Trainee Profile | ```/api/trainees```
| 1.2 | PUT | Update Trainee Profile | ```/api/trainees/:id```
| 1.3 | GET | Display Specific Trainee | ```/api/trainees/:id```
| 1.4 | POST | Create Trainee Registration | ```/api/trainees/:id/registrations/```
| 1.5 | PUT | Update Specific Trainee Registration | ```/api/trainees/:id/registrations/:regid/```
| 1.6 | GET | Display Specific Trainee Registration | ```/api/trainees/:id/registrations/:regid```
| 1.7 | DELETE | Delete/Drop Specific Trainee Registration | ```/api/trainees/:id/registrations/:regid```
| 1.8** |  | Assign Trainee to Course Batch | 
| 1.9* | GET | Trainee Masterlist  |```/api/trainees```
| 1.10* | GET | Trainee Registration Masterlist (Per Trainee) | ```/api/trainees/:id/registrations```
| 1.11* | GET | Overall Total Registrations | ```/api/trainees/registrations/total```

*1.9, 1.10, 1.11 are new Use Case IDs

**1.8 is more of an added process


>COURSE MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 2.1 | POST | Create New Course |```/api/courses```  |
| 2.2 | PUT | Update Course Details |```/api/courses/:id``` |
| 2.3 | GET | View Specific Course |```/api/courses/:id``` |
| 2.4 | POST | Create New Training Year |```/api/trainingYears```  |
| 2.5 | PUT | Update Training Year |```/api/trainingYears/:id```  |
| 2.6* | GET | Course Masterlist |```/api/courses```|
| 2.7* | GET | Training Year Masterlist |```/api/trainingYears```|
| 2.8* | GET | //All Batches Belonging Under a Specific Course |```/api/courses/:id/batches```|

*2.6 and 2.7 are new Use Case IDs

>COURSE BATCH MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 3.1 | POST | Create New Course Batch |```/api/batches```  |
| 3.2 | PUT | Update Course Batch Details |```/api/batches/:id```|
| 3.3** |  | Assign Teacher to Course Batch | |
| 3.4 | GET | View Specific Batch |```/api/batches/:id```  |
|3.5 | GET | Batch Masterlist |```/api/batches```  |

**3.3 is more of an added process

>FEES AND ACCOUNTS MANAGEMENT

To be Attached

>TRAINEE ACCOUNT MANAGEMENT

To be Attached

>EMPLOYEE MANAGEMENT 

To be Attached