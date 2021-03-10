# Antarctica Task

## DEMO
http://35.154.15.160

## Tech Stack
- Nodejs
- Sequelize (MySQL)
- JWT

## Run in local
`npm install`

### Update DB Credentials
`app/config/db.js`

### run

`nodemon server.js` 

or

`node server.js`

run at
`http://localhost:3000`


## API's

### Registration API
    /users
Method: `POST`

#### Request Body
    {
        "firstName": String,
        "lastName": String,
        "email": String,
        "organization": String,
        "password": String
    }
##### Example 
    {
        "firstName": "Aashish",
        "lastName": "Chakravarty",
        "email": "asdf@asdf.com",
        "organization": "Abc",
        "password": "asdf"
    }
### Response 
    {
        "status": boolean,
        "message": String,
        "data": {
                "employeeID": number,
                "firstName": String,
                "lastName": String,
                "email": String,
                "organizationId": number,
                "organizationName": String
            }
    }
##### Example 
    {
        "status": true,
        "message": "user created",
        "data": {
            "employeeID": 5,
            "firstName": "Aashish",
            "lastName": "Chakravarty",
            "email": "asdf@asdf.com",
            "organizationId": 1,
            "organizationName": "Abc"
        }
    }

### Login API
    /users/login
Method: `POST`

#### Request Body
    {
        "email": String,
        "password": String
    }
##### Example 
    {
        "email": "asdf@asdf.com",
        "password": "asdf"
    }
### Response 
    {
        "status": boolean,
        "message": String,
        "data": {
                "employeeId": number,
                "firstName": String,
                "lastName": String,
                "email": String,
                "employee": {
                    "organizationId": number,
                    "organizationName": String
                },
                token: String
            }
    }
##### Example 
    {
        "status": true,
        "message": "Successfully login",
        "data": {
            "employeeId": 5,
            "firstName": "Aashish",
            "lastName": "Chakravarty",
            "email": "asdf@asdf.com",
            "employee": {
                "organizationId": 1,
                "organizationName": "Abc"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAYXNkZmFhLmNvbSIsImlhdCI6MTYxNTM0ODc1NywiZXhwIjoxNjQ2ODg0NzU3fQ.PbOTYBTG4MVpOSlF_k4XXtKZPyWH01cHZAwdI9FfJmE"
        }
    }

### Get Users API
    /empoyees
Method: `GET`

#### Header
    Authorization: token
##### Example
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAYXNkZmEuY29tIiwiaWF0IjoxNjE1MzQ3NDc0LCJleHAiOjE2NDY4ODM0NzR9.cEb7FkmrUFdw9DeWLHIQGTborWvagK10RPvOpGm_OAo

#### Query String
##### For Searching EmpoyeeId/firstName/lastName
`search=<search_keywords_for_employeeId_or_firstName_or_lastName>`
##### Example 
`search=Aashish`

##### For Searching EmpoyeeId/firstName/lastName
`order=<orderBY-employeeId/organizationName/firstName/lastName/email>`
##### Example 
`order=organizationName`

##### For Pagination
`limit=<number_of_users>`

`skip=<skip_users>`
##### Example 
`limit=10`

`skip=2`


    Note: if no query parameters are available then all users will get.

### Response 
    {
        "status": boolean,
        "message": String,
        "data": [
            {
                "employeeId": number,
                "firstName": String,
                "lastName": String,
                "email": String,
                "employee": {
                    "organizationId": number,
                    "organizationName": String
                }
            }
        ]
    }
##### Example 
    {
    "status": true,
    "message": "Successfully Fetched",
    "data": [
        {
            "employeeId": 1,
            "firstName": "Aashish",
            "lastName": "Chakravarty",
            "email": "asdf@asdf.com",
            "employee": {
                "organizationId": 1,
                "organizationName": "Abc"
            }
        },
        {
            "employeeId": 3,
            "firstName": "Aashish",
            "lastName": "Chakravarty",
            "email": "asdf@asdfa.com",
            "employee": {
                "organizationId": 1,
                "organizationName": "Abc"
            }
        },
        {
            "employeeId": 5,
            "firstName": "Aashish",
            "lastName": "Chakravarty",
            "email": "asdf@asdfaa.com",
            "employee": {
                "organizationId": 1,
                "organizationName": "Abc"
            }
        }
    ]
}
