# hacktivoverflow

## GETTING STARTED
All end point routes start with http://34.87.27.57
run npm install 
fill out env template

## `/users` end point
### **Register New User**
Register new user to the database

| Route | HTTP | Header(s) |
|---|---|---|
|`/users/register`|POST|`none`|

Body : 

    name: String (Required)
    password: String (Required)
    email : String (Required) (Unique)

Success : 

    status: 201
    data: {
        "_id": "5d68aa2956cee80f9f4ad57d",
        "name": "test",
        "email": "test@mail.com",
        "password": "$2a$10$XJ3mekF2gydr4tyRqdjVqOunhWyB/mxtLbJnvfM98/FX5Pm1A4dpu",
        "createdAt": "2019-08-30T04:46:33.110Z",
        "updatedAt": "2019-08-30T04:46:33.110Z"
        }

error : 

    status: 404
    message: 'data not found'


### **Login User**
Login with user info

| Route | HTTP | Header(s) |
|---|---|---|
|`/users/login`|POST|`none`|

Body : 

    email: String (Required)
    password: String (Required)

Success : 

    status: 200
    message : 'Login Successful'
    data: {
        "token":               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhhYTI5NTZjZWU4MGY5ZjRhZDU3ZCIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTY3MTQwNDg0fQ.GKU3XvHtLNqKfJyS5MFVSUF6QhIUsYtbbyvsi5kaKLs",
        "user": {
            "_id": "5d68aa2956cee80f9f4ad57d",
            "name": "test",
            "email": "test@mail.com",
            "password": "$2a$10$XJ3mekF2gydr4tyRqdjVqOunhWyB/mxtLbJnvfM98/FX5Pm1A4dpu",
            "createdAt": "2019-08-30T04:46:33.110Z",
            "updatedAt": "2019-08-30T04:46:33.110Z"
            }
        }

error :

    status: 404
    message: 'data not found'


## `/questions` end point
### **Create Question**
Create new question

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions`|POST|`token`|

Body: 

    title: String (Required)
    content: String (Required)

Success: 
    status: 201
    {
        "upVote": [],
        "downVote": [],
        "_id": "5d662f20b986b32f228c95f3",
        "title": "pertanyaan 2",
        "content": "sudah bisa belum?",
        "userId": "5d63ab4cd46ee52a1793386c",
        "createdAt": "2019-08-28T07:37:04.726Z",
        "updatedAt": "2019-08-28T07:37:04.726Z"
    }

error: 

    status: 404
    message: 'data not found'

### **Find all Questions**
Find all questions in the database

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions`|GET|`token`|

body: 

    none

success :

    status: 200
    data : [
            {
            "upVote": [],
            "downVote": [],
            "_id": "5d67891ac260c31a7a40f350",
            "title": "pertanyaan",
            "content": "asdasdasd",
            "userId": {
            "_id": "5d675f50fd8a3e141cd8f6f7",
                "name": "miracle",
                "email": "miracle@mail.com",
                "password": "$2a$10$xbzfEsfTIzGIR4Vv46XpZeZSoiJbizk8PiwGIAt5Olx13NsOGlBZu",
                "createdAt": "2019-08-29T05:14:56.198Z",
                "updatedAt": "2019-08-29T05:14:56.198Z"
             },
            "createdAt": "2019-08-29T08:13:14.260Z",
            "updatedAt": "2019-08-29T09:02:28.268Z"
            },
            ...
          ]

error: 

    status: 404
    message: 'data not found'

### **Find questions by User ID**
Find all questions by one user ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions/:id`|GET|`token`|

body: 

    none

success: 

    status: 200
    data: [
            {
            "upVote": [],
            "downVote": [],
            "_id": "5d67891ac260c31a7a40f350",
            "title": "pertanyaan",
            "content": "asdasdasd",
            "userId": {
            "_id": "5d675f50fd8a3e141cd8f6f7",
                "name": "miracle",
                "email": "miracle@mail.com",
                "password": "$2a$10$xbzfEsfTIzGIR4Vv46XpZeZSoiJbizk8PiwGIAt5Olx13NsOGlBZu",
                "createdAt": "2019-08-29T05:14:56.198Z",
                "updatedAt": "2019-08-29T05:14:56.198Z"
             },
            "createdAt": "2019-08-29T08:13:14.260Z",
            "updatedAt": "2019-08-29T09:02:28.268Z"
            },
            ...
          ]

error: 

    status: 404
    message: 'data not found'

### **Update Question**
Update question by question ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions/:id`|PATCH|`token`|

body: 

    title: String
    content: String

success: 

    status: 200
    {
        "upVote": [],
        "downVote": [],
        "_id": "5d662f20b986b32f228c95f3",
        "title": "pertanyaan 2",
        "content": "sudah bisa belum?",
        "userId": "5d63ab4cd46ee52a1793386c",
        "createdAt": "2019-08-28T07:37:04.726Z",
        "updatedAt": "2019-08-28T07:37:04.726Z"
    }

error: 

    status: 404
    message: 'data not found'

### **Delete Question**
Delete question by question ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions/:id`|DELETE|`token`|

body: 

    none

success:

    status: 200
    message: "Question deleted"

error: 

    status: 404
    message: 'data not found'

### **Upvote Question**
Upvote question by question ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions/:id/upvote`|PATCH|`token`|

body: 

    none

success:

`if user not upvote yet`
        status: 200
        message: "add upvote"

`if user already downvoted`

        status: 200
        message: "removed down vote"

`if user already upvoted`

        status: 200
        message: "already upvote"

error: 

    status: 404
    message: 'data not found'


### **Downvote Question**
Downvote question by question ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/questions/:id/downvote`|PATCH|`token`|

body:

    none

success: 

`if user not downvote yet`
        status: 200
        message: "add downvote"

`if user already upvoted`

        status: 200
        message: "removed upvote"

`if user already downvoted`

        status: 200
        message: "already downvote"

error: 

    status: 404
    message: 'data not found'



## `answers` end point
### **Create Answer**
Create Answer based on question ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id`|POST|`token`|

body: 

    content: String (Required)

success: 

    status: 201
    data: {
         "upVote": [],
        "downVote": [],
        "_id": "5d68afaf56cee80f9f4ad57e",
        "content": "ini caranya gini loh ",
        "questionId": "5d662f20b986b32f228c95f3",
        "userId": "5d63ab4cd46ee52a1793386c",
        "createdAt": "2019-08-30T05:10:07.942Z",
        "updatedAt": "2019-08-30T05:10:07.942Z"
        }

error: 

    status: 404
    message: 'data not found'

### **Get all Answer by Question ID**
Get all answers based on question ID
| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id`|GET|`token`|

body: 

    none

success: 

    status: 200
    data: [
        {
            "upVote": [],
            "downVote": [],
            "_id": "5d68afaf56cee80f9f4ad57e",
            "content": "ini caranya gini loh ",
            "questionId": "5d662f20b986b32f228c95f3",
            "userId": {
                "_id": "5d63ab4cd46ee52a1793386c",
                "name": "billy",
                "email": "billy@mail.com",
                "password": "$2a$10$wPh/n.q16agNnpjtm6goJOxcX7l8LA6hp5DcjZvlCcv81J8PsjYt6",
                "createdAt": "2019-08-26T09:50:04.202Z",
                "updatedAt": "2019-08-26T09:50:04.202Z"
                },
            "createdAt": "2019-08-30T05:10:07.942Z",
            "updatedAt": "2019-08-30T05:10:07.942Z"
            },
            ...
        ]

error: 

    status: 404
    message: 'data not found'   


## **Get One answer**
Get one answer based on answer ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id/one`|GET|`token`|

body: 

    none

success: 

    status: 201
    data: {
        "upVote": [],
        "downVote": [],
        "_id": "5d68afaf56cee80f9f4ad57e",
        "content": "ini caranya gini loh ",
        "questionId": "5d662f20b986b32f228c95f3",
        "userId": {
            "_id": "5d63ab4cd46ee52a1793386c",
            "name": "billy",
            "email": "billy@mail.com",
            "password": "$2a$10$wPh/n.q16agNnpjtm6goJOxcX7l8LA6hp5DcjZvlCcv81J8PsjYt6",
            "createdAt": "2019-08-26T09:50:04.202Z",
            "updatedAt": "2019-08-26T09:50:04.202Z"
        },
        "createdAt": "2019-08-30T05:10:07.942Z",
        "updatedAt": "2019-08-30T05:10:07.942Z"
        }   

error: 

    status: 404
    message: 'data not found'   

## **Update Answer**
Update one answer based on answer ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id`|PATCH|`token`|

body: 

    content: String

success:

    status: 200
    data: {
        "upVote": [],
        "downVote": [],
        "_id": "5d68afaf56cee80f9f4ad57e",
        "content": "jawaban baru terupdate",
        "questionId": "5d662f20b986b32f228c95f3",
        "userId": "5d63ab4cd46ee52a1793386c",
        "createdAt": "2019-08-30T05:10:07.942Z",
        "updatedAt": "2019-08-30T05:17:29.464Z"
        }

error: 

    status: 404
    message: 'data not found'   

## **Delete Answer**
Delete one Answer based on answer ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id`|DELETE|`token`|

success: 

    status: 200
    message: "Answer Deleted"

error: 

    status: 404
    message: 'data not found'   


## **Upvote Answer**
Upvote answer based on Answer ID

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id/upvote`|PATCH|`token`|

body: 

    none

success:

`if user not upvote yet`
        status: 200
        message: "add upvote"

`if user already downvoted`

        status: 200
        message: "removed down vote"

`if user already upvoted`

        status: 200
        message: "already upvote"

error: 

    status: 404
    message: 'data not found'

## **Downvote Answer**

| Route | HTTP | Header(s) |
|---|---|---|
|`/answers/:id/downvote`|PATCH|`token`|

success: 

`if user not downvote yet`
        status: 200
        message: "add downvote"

`if user already upvoted`

        status: 200
        message: "removed upvote"

`if user already downvoted`

        status: 200
        message: "already downvote"

error: 

    status: 404
    message: 'data not found'