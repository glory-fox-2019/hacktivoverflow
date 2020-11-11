# Questo (simple web mocking up Stackoverflow)

## API Documentation

All APIs using base URL:
```javascript
http://localhost:3000
```

Deployed Web URL:
[http://questo.yogautomo.com](http://questo.yogautomo.com)

## Index of Reference:
* [Screenshots]()
* [Users]()
* [Questions]()
* [Answers]()

## Screenshots
1. Homepage
![Homepage](https://i.ibb.co/XS1y8nK/Screen-Shot-2020-03-12-at-13-40-32.png)
2. Question Detail
![Question Detail](https://i.ibb.co/23SWKfR/Screen-Shot-2020-03-12-at-13-40-47.png)

## Users API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /users/signup | none | <div style="text-align: left">username: string <b>(required)</b><br>email: string <b>(required)</b><br>password: string <b>(required)</b></div> | Register new user |[SignUp]()|
| POST | /users/signin | none | <div style="text-align: left">email: string <b>(required)</b><br>password: string <b>(required)</b></div> | Login user |[SignIn]()|
| GET | /users | {JWT Token} | none | get authenticated user |[Get Authenticated User]()|
| PATCH | /users/watch-tag | {JWT Token} | none | set authenticated user's watched tags |[Set Watched Tags]()|

## Questions API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /questions | none | none | get all questions |[Get Questions]()|
| GET | /questions/:questionId | none | none | get one question |[Get a Question]()|
| POST | /questions | {JWT Token} | <div style="text-align: left">title: string <b>(required)</b><br>content: string <b>(required)</b><br>tags: array <b>(optional)</b></div> | create question |[Create Question]()|
| PUT | /questions/:questionId | {JWT Token} |  <div style="text-align: left">title: string <b>(optional)</b><br>content: string <b>(optional)</b><br>tags: array <b>(optional)</b></div> | update one question |[Update a Question]()|
| DELETE | /questions/:questionId | {JWT Token} | none | delete one question |[Delete a Question]()|
| POST | /questions/upvote/:questionId | {JWT Token} | none | upvote question |[Upvote a Question]()|
| POST | /questions/downvote/:questionId | {JWT Token} | none | downvote question |[Downvote a Question]()|

## Answers API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /answers/:questionId | none | none | get related question's answers |[Get Question's Answers]()|
| POST | /answers/:questionId | {JWT Token} | <div style="text-align: left">content: string <b>(required)</b></b></div> | create answer |[Create Answer]()|
| DELETE | /answers/:questionId/:answerId | {JWT Token} | <div style="text-align: left">content: string <b>(required)</b></b></div> | get one answer |[Create Answer]()|
| GET | /answers/find/:answerId | {JWT Token} | none | get answers |[Get Answers]()|
| PUT | /answers/:answerId | {JWT Token} | <div style="text-align: left">content: string <b>(required)</b></b></div> | update answer |[Get Answers]()|
| POST | /answers/upvote/:answerId | {JWT Token} | none | upvote answer |[Upvote an Answer]()|
| POST | /answers/downvote/:answerId | {JWT Token} | none | downvote answer |[Downvote an Answer]()|

# Request & Response Details

## Users
+ ### SignUp
  method: `POST`<br>
  endpoint: `/users/signup`
  
  #### _Request_ :
  * body: 
    ```javascript
    username: String, required
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        token: JWT Token,
        user: Object
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
          "notNull Violation: Please input your username",
          "\nnotNull Violation: Please input your email"
      ]
    }
    ```

+ ### SignIn
  method: `POST`<br>
  endpoint: `/users/signin`
  
  #### _Request_ :
  * body: 
    ```javascript
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        token: JWT Token,
        user: Object
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Wrong email / password"
    }
    ```

+ ### Get Authenticated User
  method: `GET`<br>
  endpoint: `/users`
  
  #### _Request_ :
  * body: 
    ```javascript
    none
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        username: String,
        email: String,
        password: String(hashed),
        upvotedQuestion: Array,
        downvotedQuestion: Array,
        upvotedAnswer: Array,
        downvotedAnswer: Array,
        watchedTags: Array
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Not found"
    }
    ```

+ ### Set Watched Tags
  method: `PATCH`<br>
  endpoint: `/users/watch-tag`
  
  #### _Request_ :
  * body: 
    ```javascript
    {
        tags: Array
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        username: String,
        email: String,
        password: String(hashed),
        upvotedQuestion: Array,
        downvotedQuestion: Array,
        upvotedAnswer: Array,
        downvotedAnswer: Array,
        watchedTags: Array // updated watched tags
    }
    ```

## Questions
+ ### Get All Questions
  method: `GET`<br>
  endpoint: `/questions`
  
  #### _Request_ :
  * body: 
    ```javascript
    none
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [
        {
            title: String,
            content: String,
            tags: Array,
            answers: Array,
            userId: ObjectId,
            upVotes: Array,
            downVotes: Array,
            createdAt: Date,
            updatedAt: Date
        },
        ....
    ]
    ```

+ ### Get One Question
  method: `GET`<br>
  endpoint: `/questions/:questionId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        questionId: String
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```

+ ### Create Question
  method: `GET`<br>
  endpoint: `/questions/:questionId`
  
  #### _Request_ :
  * body: 
    ```javascript
    {
        title: String <required>,
        content: String <required>,
        tags: Array <optional>
    }
    ```
  * params:
    ```javascript
    {
        questionId: String
    }
    ```
  * headers"
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 400
    ```javascript
    example:
    {
        code: 400,
        message: 'Title required'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Update Question
  method: `GET`<br>
  endpoint: `/questions/:questionId`
  
  #### _Request_ :
  * body: 
    ```javascript
    {
        title: String <optional>,
        content: String <optional>,
        tags: Array <optional>
    }
    ```
  * params:
    ```javascript
    {
        questionId: String
    }
    ```
  * headers"
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    "updated question"
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 400
    ```javascript
    example:
    {
        code: 400,
        message: 'Title required'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Delete Question
  method: `DELETE`<br>
  endpoint: `/questions/:questionId`
  
  #### _Request_ :
  * params:
    ```javascript
    {
        questionId: String
    }
    ```
  * headers"
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    "deleted question"
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    example:
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Upvote Question
  method: `POST`<br>
  endpoint: `/questions/upvote/:questionId`
  
  #### _Request_ :
  * params:
    ```javascript
    {
        questionId: String
    }
    ```
  * headers"
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    "upvoted question"
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    example:
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Upvote Question
  method: `POST`<br>
  endpoint: `/questions/downvote/:questionId`
  
  #### _Request_ :
  * params:
    ```javascript
    {
        questionId: String
    }
    ```
  * headers"
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    "downvoted question"
    {
        title: String,
        content: String,
        tags: Array,
        answers: Array,
        userId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    example:
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

## Answers
+ ### Get Related Question's Answers
  method: `GET`<br>
  endpoint: `/answers/:questionId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        questionId: String
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    [
        {
            content: String,
            userId: ObjectId,
            questionId: ObjectId,
            upVotes: Array,
            downVotes: Array,
            createdAt: Date,
            updatedAt: Date
        },
        ...
    ]
    ```

+ ### Create Answers
  method: `POST`<br>
  endpoint: `/answers/:questionId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        questionId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 400
    ```javascript
    {
        code: 400,
        message: 'Content required'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Delete Answers
  method: `DELETE`<br>
  endpoint: `/answers/:questionId/:answerId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        questionId: String,
        answerId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "deleted answer"
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Get One Answers
  method: `GET`<br>
  endpoint: `/answers/:answerId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        answerId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Update Answers
  method: `DELETE`<br>
  endpoint: `/answers/:answerId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        answerId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
  * body:
    ```javascript
    {
        content: String <required>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "updated answer"
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Upvote Answers
  method: `POST`<br>
  endpoint: `/answers/upvote/:answerId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        answerId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "upvoted answer"
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```

+ ### Downvote Answers
  method: `POST`<br>
  endpoint: `/answers/downvote/:answerId`
  
  #### _Request_ :
  * params: 
    ```javascript
    {
        answerId: String
    }
    ```
  * headers:
    ```javascript
    {
        token: <JWT Token>
    }
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    "downvoted answer"
    {
        content: String,
        userId: ObjectId,
        questionId: ObjectId,
        upVotes: Array,
        downVotes: Array,
        createdAt: Date,
        updatedAt: Date
    }
    ```
  - 404
    ```javascript
    {
        code: 404,
        message: 'Not found'
    }
    ```
  - 401
    ```javascript
    {
        code: 401,
        message: 'Unauthorized process'
    }
    ```
