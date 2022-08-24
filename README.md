The Backend Framework for Goncar Security Training Academy's Enrollment System In fullfillment for Software Engineering 2


# **REST API ROUTES**

>ENROLLMENT MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 1.1 | POST | Create Trainee Profile | ```/dashboard/trainees/add```
| 1.2 | PUT | Update Trainee Profile | ```/dashboard/trainees/edit/{id}/```
| 1.3 | GET | Display Specific Trainee | ```/dashboard/trainees/{id}```
| 1.4 | POST | Create Trainee Registration | ```/dashboard/trainees/{id}/registration/add```
| 1.5 | PUT | Update Specific Trainee Registration | ```/dashboard/trainees/{id}/registration/edit/{id}```
| 1.6 | GET | Display Specific Trainee Registration | ```/dashboard/trainees/{id}/registration/{id}```
| 1.7 | DELETE | Delete/Drop Specific Trainee Registration | ```/dashboard/trainees/{id}/registration/delete/{id}```
| 1.8** |  | Assign Trainee to Course Batch | 
| 1.9* | GET | Trainee Masterlist  |```/dashboard/trainees```


*1.9 is a new Use Case ID

**1.8 is more of an added process


>COURSE MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 2.1 | POST | Create New Course |```/dashboard/administrative/courses/add```  |
| 2.2 | PUT | Update Course Details |```/dashboard/administrative/courses/edit/{id}``` |
| 2.3 | GET | View Specific Course |```/dashboard/administrative/courses/``` |
| 2.4 | POST | Create New Training Year |```/dashboard/administrative/trainingyr/add```  |
| 2.5 | PUT | Update Training Year |```/dashboard/administrative/trainingyr/edit/{id}```  |
| 2.6* | GET | Course Masterlist |```/dashboard/administrative/courses/```|

*2.6 is a new Use Case ID


>COURSE BATCH MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 3.1 | POST | Create New Course |```/dashboard/classbatch/add```  |
| 3.2 | PUT | Update Course Details |```/dashboard/classbatch/edit/{id}```|
| 3.3** |  | Assign Teacher to Course Batch | |
| 3.4 | GET | View Specific Batch |```/dashboard/classbatch/{id}```  |
|3.5 | GET | Batch Masterlist |```/dashboard/classbatch/```  |

**3.3 is more of an added process

>FEES AND ACCOUNTS MANAGEMENT

TBA

>TRAINEE ACCOUNT MANAGEMENT

TBA

>EMPLOYEE MANAGEMENT 