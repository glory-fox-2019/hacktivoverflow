# API DOCUMENTATION hacktivoverflow

## User Routes

### /user/login

**URL** : `/user/login`<br>
**Method** : `POST`<br>
**Auth Required** : `none`<br>
**Permision Required** : `none`<br>

**Data** <br>

Name | Type | Require | Description 
-----|------|-------- | -----------
email| `String` | `YES`| Email User
password| `String` | `YES` | Password User

**Success Response**
```json
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNThhYzQ3ZjhjNDA3MjFlYTY1ZDliZiIsImVtYWlsIjoiZmF1emlAbWFpbC5jb20iLCJpYXQiOjE1NjYwOTI0NzF9.tH8_kvcwpYbjHC93Uj7KQiaaW430R-HD_5fnwQYTs2U",
    "data": {
        "_id": "5d63b7e7df78b7627816f4f4",
        "username": "fauzi",
        "email": "fauzi@gmail.com",
        "__v": 0
    }
}
```

### /user/register

**URL** : `/user/register`<br>
**Method** : `POST`<br>
**Auth Required** : `none`<br>
**Permision Required** : `none`<br>

**Data** <br>

Name | Type | require | Description
-----|------|--------- | ----------
email | `String` |  `YES` | Email User
password | `String` | `YES` | Password User 
username | `String` | `YES` | username User

```json
{
    "_id": "5d6792d89f291e15b3034057",
    "username": "fauzi",
    "email": "lolox@gmail.com",
    "password": "$2a$10$NBfnyqI2j181SdCwYLT.beFcP9gxTFTWkJf/o6AHAHA9j3A4F6JiO",
    "__v": 0
}
```

## Question Route 

### Create Question
**URL** : `/question/create`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
title | `String` |  `YES` | Title Question
description | `String` | `YES` | Description Question


**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token from login


```json
{
    "answer": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d6795c09f291e15b3034058",
    "title": "How to finish my portfolio instantly",
    "description": "What is Lorem Ipsum?\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n",
    "owner": "5d63b7e7df78b7627816f4f4",
    "createdAt": "2019-08-29T09:07:12.167Z",
    "updatedAt": "2019-08-29T09:07:12.167Z",
    "__v": 0   
}
```


### Update Question
**URL** : `/question/update/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
title | `String` |  `NO` | Title Question
description | `String` | `NO` | Description Question

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token From Login

```json
{
    "answer": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d6795c09f291e15b3034058",
    "title": "How to finish my portfolio instantly",
    "description": "Awesome",
    "owner": "5d63b7e7df78b7627816f4f4",
    "createdAt": "2019-08-29T09:07:12.167Z",
    "updatedAt": "2019-08-29T09:10:39.836Z",
    "__v": 0
}
```

### Delete Question 
**URL** : `/question/delete/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token From Login

```json
{
    "message": "Successfully deleted!"
}
```

### Vote Question
**URL** : `/question/votes/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `none`<br>

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
votetype | `String` | `YES` | Value Must be `upvotes` or `downvotes`

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token From Login


## Answer

### Create Answer
**URL** : `/answer/create/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `none`<br>

**Params** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
id | `String` | `YES` | ID Question

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
description | `String` | `YES` | Description Answer

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token from login

```json
{
    "upvotes": [],
    "downvotes": [],
    "_id": "5d67b26c9f291e15b3034059",
    "description": "solved thanks",
    "question": "5d65ae9ac0b9970d699fc4f2",
    "owner": "5d63b7e7df78b7627816f4f4",
    "createdAt": "2019-08-29T11:09:32.508Z",
    "updatedAt": "2019-08-29T11:09:32.508Z",
    "__v": 0
}
```


### Update Answer

**URL** : `/answer/update/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>

**Params** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
id | `String` | `YES` | ID Answer

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
description | `String` | `YES` | Description Answer

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token from login

```json
{
    "upvotes": [],
    "downvotes": [],
    "_id": "5d67b26c9f291e15b3034059",
    "description": "solved thanks",
    "question": "5d65ae9ac0b9970d699fc4f2",
    "owner": "5d63b7e7df78b7627816f4f4",
    "createdAt": "2019-08-29T11:09:32.508Z",
    "updatedAt": "2019-08-29T11:09:32.508Z",
    "__v": 0
}
```

### Vote Answer
**URL** : `/answer/votes/:id`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `none`<br>

**Params** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
id | `String` | `YES` | ID Answer

**Data** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
votetype | `String` | `YES` | Value Must be `upvotes` or `downvotes`

**Header** <br>

Name | Type | require | Description
-----| ------ | --------- | ----------
token | `String` | `YES` | Token from login

```json
{
    "upvotes": [
        "5d63b7e7df78b7627816f4f4"
    ],
    "downvotes": [],
    "_id": "5d6709db77ab1f34cd6f06d8",
    "description": "BROOOOS",
    "question": "5d63b889e51cd863899b87eb",
    "owner": "5d63b7e7df78b7627816f4f4",
    "createdAt": "2019-08-28T23:10:19.989Z",
    "updatedAt": "2019-08-29T11:12:06.391Z",
    "__v": 0
}
```