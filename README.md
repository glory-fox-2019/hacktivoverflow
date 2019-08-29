# e-commerce
LINK DEPLOY: http://life-hack.ghiffariarw.com.s3-website-ap-southeast-1.amazonaws.com/
### Register :
```sh
URL: localhost:3000/users/signup
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        username: "ghiffari",
        email: "ghiffariarw@gmail.com",
        password: "123123"  
    }
Response Status : 201
Data Output :
    {
      "_id": "5d63aa1d8cda8bef219d77d4",
      "username": "ghiffari",
      "email": "ghiffari@gmail.com",
      "createdAt": "2019-08-26T09:45:02.133Z",
      "updatedAt": "2019-08-26T09:45:02.133Z",
      "__v": 0
    }
Response Status : 400 Bad Request
Output :
    "User validation failed: username: Username is required, email: Email is required, password: Password is required"

Response Status : 500
Output :
    "Internal Server Error"
```
### Login :
```sh
URL: localhost:3000/user/signin
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "ghiffari@mail.com",
        password: "123123"
    }
Response Status : 200
Data Output :
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjNhYTFkOGNkYThiZWYyMTlkNzdkNCIsIm5hbWUiOiJnaGlmZmFyaSIsImVtYWlsIjoiZ2hpZmZhcmlAZ21haWwuY29tIiwiaWF0IjoxNTY2ODEzNDA3LCJleHAiOjE1NjY4OTk4MDd9.6mwJyQufY6arNMJzk8NA5jUzvIApbwEG7ZXc_gA7Jdk",
      "username": "ghiffari",
      "id": "5d63aa1d8cda8bef219d77d4",
      "email": "ghiffari@gmail.com"
    }

Response Status : 400 Bad Request
Output :
    {
        "err": "email/password wrong!"
    }
Response Status : 500
Output :
    "Internal Server Error"
```
### Find By Id :
```sh
localhost:3000/users/5d63aa1d8cda8bef219d77d4
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
    {
        "_id": "5d63aa1d8cda8bef219d77d4",
        "username": "ghiffari",
        "email": "ghiffari@gmail.com",
        "password": "$2a$10$cNHJjGGikfTYyMY89I7cfefD3bWkUVPQuUakJpgKNCaYCjlT9yrJO",
        "createdAt": "2019-08-26T09:45:02.133Z",
        "updatedAt": "2019-08-26T09:45:02.133Z",
        "__v": 0
    }
Response Status : 500
Output :
    "Internal Server Error"
```
### list Question:
## Answer Routes
| Route                        | HTTP   | Header(s)   | Body                                                                                                               | Response                                                                                                                                                           |
|------------------------------|--------|-------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /answers/:id                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br>  500: Internal server error                                                                   |
| /answers                   | GET    | none        | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br>  500: Internal server error                                                                   |
| /answers/:id                    | PATCH   | token:user |  content: String | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error <br> 400: Validation error                                        |                                                                          |
| /answers//vote/:id/?type=...     | PATCH    | token:user  | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error
| /answers   | POST    | token:user  | QuestionId: String, content: String, UserId: String                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error
| /answers/:id/               | DELETE | token:user | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error                                                       |

## Question Routes
| Route                        | HTTP   | Header(s)   | Body                                                                                                               | Response                                                                                                                                                           |
|------------------------------|--------|-------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /questions                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: Array of object questions <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions                    | POST   | token:user |  title: String <br> description: String <br> UserId: String | **Success:** <br> 201: Object question <br> **Error:** <br> 500: Internal server error <br> 400: Validation error                                        |
| /questions/:id                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions/findBelongs                    | GET    | token:user        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions/tag/:name                   | GET    | token:user        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| questions/vote/:id                   | PATCH    | token:user        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| questions/:id                  | PATCH    | token:user        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions/:id               | DELETE | token:user | none                                                                                                               | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error                
