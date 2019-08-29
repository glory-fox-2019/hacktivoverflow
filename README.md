# HACKTIV OVERFLOW

##Link deploy 
<br>
[hacktiv-overflow.adielpratama.com](http://hacktiv-overflow.adielpratama.com "Hacktiv Overflow")

## Installation
run this command before use this application :)

```javascript
npm i

npm run dev
```

## Environment
PORT= your port

SECRET_PASSWORD= secret password for jwt


uri=your mongo db collection url 
<br>
## This table below is routes of User:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/user` | POST | `Body` <br>username: String <br>password:String<br>email:String | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | create User
`/user/signIn` | POST | `Body`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`404` Not Found | manual Login 


## This table below is routes of question:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/question` | GET | `Headers` <br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get all question
`/question/userQuestion` | GET | `Headers` <br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get all user's question
`/question/:id` | GET | `Headers` <br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get one of question
`/question/:id` | PUT | `Headers`<br>token: `String`<br>`Body`<br>title: `String`<br>description: `String`<br> | **Success**<br>`201` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | update one of question
`/question/:id` | POST | `Headers`<br>token: `String`<br> `Params`<br>id: `String`<br> `Body`<br> vote: `String`| **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | vote one of question
`/question` | POST | `Headers` <br>token: `String`<br>`Body`<br>title: `String`<br>description: `String`<br> | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create question
`/question/:id` | DELETE | `Headers`<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete one Of question

## This table below is routes of Answer:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/answer` | POST | `Headers` <br>token: `String`<br>`Body`<br>title: `String`<br>description: `String`<br>question: `STRING questionID` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create answer
`/answer/:id` | POST | `Headers` <br>token: `String`<br>`Params`<br>id: `String`<br> `Body`<br>vote: `upvote/downvote`<br> | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Vote answer
`/answer/:id` | PUT | `Headers`<br>token: `String`<br>`Body`<br>title: `String`<br>description: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | update user answer

## /question response
```javascript
//in GET response, you will get array, 
// in POST response, you will get object of new question

/**
 * GET ALL question  
 * 
 * */
[
  {
    "upvotes": [
      "5d6779f58945384ff6b6e701"
    ],
    "downvotes": [],
    "answer": [
      {
        "upvotes": [
          "5d6779f58945384ff6b6e701"
        ],
        "downvotes": [],
        "totalvotes": 1,
        "_id": "5d6781885d50ea0d6bbd46fa",
        "title": "Sory salah lagi",
        "description": "Test lagi<br>",
        "question": "5d677bff8945384ff6b6e702",
        "user": {
          "_id": "5d6779f58945384ff6b6e701",
          "username": "Bayu",
          "email": "Bayu@mail.com"
        },
        "createdAt": "2019-08-29T07:40:56.980Z",
        "updatedAt": "2019-08-29T07:47:19.723Z"
      }
    ],
    "totalvotes": 1,
    "_id": "5d677bff8945384ff6b6e702",
    "user": {
      "_id": "5d6779f58945384ff6b6e701",
      "username": "Bayu",
      "email": "Bayu@mail.com"
    },
    "title": "Test baru",
    "description": "Lorem ipsum",
    "createdAt": "2019-08-29T07:17:19.850Z",
    "updatedAt": "2019-08-29T07:44:13.261Z"
  },
]
/**
 * CREATE question
 * 
 * */
{
  "upvotes": [],
  "downvotes": [],
  "answer": [],
  "totalvotes": 0,
  "_id": "5d679fc071585a3e83c40955",
  "user": "5d660b710093e75a9c1ec45b",
  "title": "Machine learning with HTML",
  "description": "Joke hehe",
  "createdAt": "2019-08-29T09:49:52.036Z",
  "updatedAt": "2019-08-29T09:49:52.036Z"
}
/**
 * update question (new data) 
 * 
 * */
{
  "upvotes": [],
  "downvotes": [],
  "answer": [],
  "_id": "5d65f387848a512545f0e73a",
  "user": "5d65edb7bf9140176069e91d",
  "title": "How to make website ?",
  "description": "With Wix.com",
  "createdAt": "2019-08-28T03:22:48.000Z",
  "updatedAt": "2019-08-28T04:11:01.282Z"
}
/**
 * DELETE QUESTION
 * 
 * */
{
  "ok": 1,
  "n": 1,
  "deletedCount": 1
}
/**
 * Vote QUESTION
 * 
 * */
{
  "upvotes": [
    "5d6779f58945384ff6b6e701"
  ],
  "downvotes": [
    "5d65edb7bf9140176069e91d"
  ],
  "answer": [
    "5d6781885d50ea0d6bbd46fa"
  ],
  "totalvotes": 0,
  "_id": "5d677bff8945384ff6b6e702",
  "user": "5d6779f58945384ff6b6e701",
  "title": "Test baru",
  "description": "Lorem ipsum",
  "createdAt": "2019-08-29T07:17:19.850Z",
  "updatedAt": "2019-08-29T07:44:13.261Z"
}
```
## /answer response
```javascript

/**
 *  create Answer
 **/
{
  "upvotes": [],
  "downvotes": [],
  "totalvotes": 0,
  "_id": "5d66ad248f61902439c1187b",
  "title": "How to loop",
  "description": "Lorem ipsum",
  "question": "5d6616f9e582ea6f9b8e4691",
  "user": "5d65edb7bf9140176069e91d",
  "createdAt": "2019-08-28T16:34:44.133Z",
  "updatedAt": "2019-08-28T16:34:44.133Z"
}
/**
 *  vote Answer
 **/
{
  "upvotes": [],
  "downvotes": [
    "5d660b710093e75a9c1ec45b",
    "5d65edb7bf9140176069e91d"
  ],
  "totalvotes": -1,
  "_id": "5d661c085085f67ca699c4c7",
  "title": "What is promises ?",
  "description": "an async handler method",
  "question": "5d6616f9e582ea6f9b8e4691",
  "user": "5d660b710093e75a9c1ec45b",
  "createdAt": "2019-08-28T06:15:36.304Z",
  "updatedAt": "2019-08-28T16:54:15.044Z"
}

```
## END 