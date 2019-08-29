# HACKTIV OVERFLOW


**1. Create user**
Method : **POST**
Endpoint `/user/register` 

Request body :
```
{
	username : string,
	email: string
	password : string
}
```
Response : 
```
status : 201 Ok
{
  "_id": "5d67a58a3160435d019e7fa4",
  "username": "josprima",
  "email": "josprima.ids@gmail.com",
  "password": "$2a$10$mzO77wl9QfF7HhzhQHuodOXcgUI6eegCbp5lVQYd5ARQbxxlrqa36",
  "__v": 0
}
```

**2. Login user**
Method : **POST**
Endpoint `/user/login` 

Request body :
```
{
	email: string
	password : string
}
```
Response : 
```
status : 200 Ok
{
  "message": "success signin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc3ByaW1hIiwiZW1haWwiOiJqb3NwcmltYS5pZEBnbWFpbC5jb20iLCJpYXQiOjE1NjcwNzM3MzZ9.Tkjx7gfq_SVsJrXqgf5RxZdWzyiei6pr1KQrm8DHLqQ",
  "user": {
    "_id": "5d677f488f964a568037978c",
    "username": "josprima",
    "email": "josprima.id@gmail.com",
    "password": "$2a$10$rOy9U110yTgaTj6neUV3deDphp8HUegrVxtJCJBnv9SmZ4VQ6DyGm",
    "__v": 0
  }
```

**3. Create Question**
Method : **POST**
Endpoint `/question/create` 

Request body :
```
{
	title: string
	content : string
}
```
Request header :
```
{
	token: string
}
```
Response : 
```
status : 200 Ok
{
  "question": {
    "upVote": [],
    "downVote": [],
    "answer": [],
    "_id": "5d67a61b3160435d019e7fa5",
    "title": "How to be a software engineerrr kwkwkkwkwkkwkw",
    "content": "How to be a software engineerrr",
    "user": "5d677f488f964a568037978c",
    "createdAt": "2019-08-29T10:16:59.288Z",
    "updatedAt": "2019-08-29T10:16:59.288Z",
    "__v": 0
  }
}
```
**4. Get All Questions**
Method : **GET**
Endpoint `/question` 

Response : 
```
status : 200 Ok
[
  {
    "upVote": [
      {
        "_id": "5d677f488f964a568037978c",
        "username": "josprima"
      },
      {
        "_id": "5d677f488f964a568037978c",
        "username": "josprima"
      }
    ],
    "downVote": [],
    "answer": [
      "5d677fd18f964a568037978e",
      "5d678504edde82590a862f89",
      "5d678598edde82590a862f8b"
    ],
    "_id": "5d677f798f964a568037978d",
    "title": "How to be a software engineer",
    "content": "Hello everyone, i want to be a software engineerrrrrrrr",
    "user": {
      "_id": "5d677f488f964a568037978c",
      "username": "josprima",
      "email": "josprima.id@gmail.com"
    },
    "createdAt": "2019-08-29T07:32:09.075Z",
    "updatedAt": "2019-08-29T08:33:07.710Z",
    "__v": 0
  },
  {
    "upVote": [
      {
        "_id": "5d677f488f964a568037978c",
        "username": "josprima"
      },
      {
        "_id": "5d677f488f964a568037978c",
        "username": "josprima"
      },
      {
        "_id": "5d677f488f964a568037978c",
        "username": "josprima"
      }
    ],
    "downVote": [],
    "answer": [],
    "_id": "5d6785cfedde82590a862f8c",
    "title": "How to cook rice",
    "content": "Hello every one, i want to cook rice, how can i make it possible ?",
    "user": {
      "_id": "5d678580edde82590a862f8a",
      "username": "danang",
      "email": "danang@gmail.com"
    },
    "createdAt": "2019-08-29T07:59:11.907Z",
    "updatedAt": "2019-08-29T08:33:15.074Z",
    "__v": 0
  },
  {
    "upVote": [],
    "downVote": [],
    "answer": [],
    "_id": "5d67a61b3160435d019e7fa5",
    "title": "How to be a software engineerrr kwkwkkwkwkkwkw",
    "content": "How to be a software engineerrr",
    "user": {
      "_id": "5d677f488f964a568037978c",
      "username": "josprima",
      "email": "josprima.id@gmail.com"
    },
    "createdAt": "2019-08-29T10:16:59.288Z",
    "updatedAt": "2019-08-29T10:16:59.288Z",
    "__v": 0
  }
]
```

**5. Create Answer**
Method : **POST**
Endpoint `/answer/create` 

Request body :
```
{
	content: string
	question : ObjectId
}
```
Request header :
```
{
	token: string
}
```
Response : 
```
status : 200 Ok
{
  "upVote": [
    "5d677f488f964a568037978c",
    "5d677f488f964a568037978c",
    "5d677f488f964a568037978c"
  ],
  "downVote": [],
  "answer": [],
  "_id": "5d6785cfedde82590a862f8c",
  "title": "How to cook rice",
  "content": "Hello every one, i want to cook rice, how can i make it possible ?",
  "user": "5d678580edde82590a862f8a",
  "createdAt": "2019-08-29T07:59:11.907Z",
  "updatedAt": "2019-08-29T08:33:15.074Z",
  "__v": 0
}
```