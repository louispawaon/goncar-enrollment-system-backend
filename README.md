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
| 1.12* | GET | Max Registration Number Currently | ```/api/trainees/registrations/max```
| 1.13* | GET | Overall Total Trainees | ```/api/trainees/all/total```
| 1.14* | GET | Max Trainee ID Currently | ```/api/trainees/all/max```
| 1.15* | DELETE | Delete Trainee | ```/api/trainees/:id```

*1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15 are new Use Case IDs

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
| 2.8* | GET | Training Year Specific |```/api/trainingYears/:id```|
| 2.9* | DELETE | Delete Training Year |```/api/trainingYears/:id```|
| 2.10* | GET | Return Total Courses |```/api/courses/all/total```|
| 2.11* | GET | Return Highest CourseID Currently |```/api/courses/all/max```|
| 2.12* | DELETE | Delete Specific Course |```/api/courses/:id```|

*2.6, 2.7, 2.8, 2.9, 2.10, 2.11 are new Use Case IDs

>COURSE BATCH MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 3.1 | POST | Create New Course Batch |```/api/batches```  |
| 3.2 | PUT | Update Course Batch Details |```/api/batches/:id```|
| 3.3** |  | Assign Teacher to Course Batch | |
| 3.4 | GET | View Specific Batch |```/api/batches/:id```  |
|3.5 | GET | Batch Masterlist |```/api/batches```  |
| 3.6* | GET | Group Batches by Course |```/api/courses/batches/grouped```|
| 3.7* | GET | Return Highest Batch ID Currently |```/api/batches/all/max```|

**3.3 is more of an added process

*3.6, 3.7 are new Use Case IDs

>FINANCE MODULE 

>FEES AND ACCOUNTS MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 4.1 | POST | Add payable |```/api/payables```  |
| 4.2 | PUT | Edit payable |```/api/payables/:id```|
| 4.3 | GET |  View list of payables |```/api/payables/:id``` |


>TRAINEE ACCOUNT MANAGEMENT

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 5.1 | POST | Create new payment  |```/api/transactions```  |
| 5.2 | GET | View account details |```/api/transactions/:id```|


>EMPLOYEE MANAGEMENT 

| USE CASE ID | HTTP METHOD | Description | Route |
| ------------| ----------- | ----------- |----------|
| 6.1 | GET | Display employee profile |```/api/employees:id```  |
| 6.2 | POST | Create new employee profile |```/api/employees```|
| 6.3 | POST | Assign employee role | ```/api/employees/:id/roles``` |
| 6.4 | PUT | Update employee profile |```/api/employees/:id```  |
| 6.5 | PUT | Update employee role | ```/api/employees/:id``` |
| 6.6 | GET | Display employee masterlist | ```/api/employees``` |
| 6.7 | POST | Add role | ```/api/roles``` |
| 6.8 | GET | View all roles | ```/api/roles``` |
| 6.9 | PUT | Update specific role | ```/api/roles/:id``` |
| 6.10 | DELETE | Delete specific role | ```/api/roles/:id``` |
| 6.11 | GET | Max employee ID| ```/api/employees/all/max``` |