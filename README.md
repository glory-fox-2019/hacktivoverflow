# Hacktiv Overflow

Exercise project

All the endpoints API can be access from:
```jacascript
http://localhost:3000
```

* [User](#users)
  * [Sign Up](#sign-up)
  * [Sign In](#sign-in)
* [Question](#question)
  * [Create](#create)
  * [Find All](#find-all)
  * [Find One](#find-one)
* [Another Error](#another-error)


## Users
+ ### Sign Up
  Method : `POST`<br>
  Endpoint : `/user/signup`

  #### _Request_ :
  * body:
    ```javascript
    {
      fullname: String(required),
      username: String(required),
      email: String(required),
      password: String(required)
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
        "Must have fullname",
        "Email not valid",
      ]
    }
    ```

+ ### Sign In
  Method : `POST`<br>
  Endpoint : `/user/signin`

  #### _Request_ :
  * body:
    ```javascript
    {
      email: String(required),
      password: String(required),
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 404
    ```javascript
    {
      code: 404,
      message: "Wrong username / password",
    }
    ```

## Question
+ ### Create
  Method : `POST`<br>
  Endpoint : `/question`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * body:
    ```javascript
    {
      title: String(required),
      text: String(required),
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    { "message": "Created!" }
    ```
  - 404
    ```javascript
    {
      "code": 400,
      "message": [
        "Title required for question!",
        "Text required for question!"
      ]
    }
    ```
+ ### Get All
  Method : `GET`<br>
  Endpoint : `/question`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    {
      "votes": {
        "up": [],
        "down": []
      },
      "comments": [],
      "answers": [],
      "_id": "5d636d1fa8e6fb2777131b04",
      "title": "q pertama cuy",
      "text": "gua nanya gimana caranya kalo begini?",
      "createdAt": "2019-08-26T05:24:47.276Z",
      "updatedAt": "2019-08-26T05:24:47.276Z"
    },
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided"
    }
    ```







## Another Error
  + Our mistake report this error
  ```javascript
  {
    code: 500,
    message: 'internal server error'
  }
  ```