# hacktivoverflow

# E-commerce API

Routes
---
Access deploy :  http://andicloud.s3-website-ap-southeast-1.amazonaws.com/

### product

- base routes Question : http://localhost:3000/api/question

    - GET : /
        - description: Get all question
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - GET : /:id
        - description : Get question by id
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - GET : /owner/:id
        - description : Get question by owner
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - POST : /
        - description : Create question
        - body : yes
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

    - PATCH : /:id
        - description : Update qestion
        - body : yes
        - params : id
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    
    - DELETE : /:id
        - description : Delete Question
        - body : none
        - Headers : yes
        - Params : id
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                  "userId":"5d590f86177f4e9993faf440",
                  "title":"title question",
                  "tas":"shoes",
                  "upVote":"1",
                  "downVote":"10",
                  "content":"lorem ipsum dolor",
                  "answer":['user_id'],
                  "created_at":"2019-29-18T08:42:46.543Z","
                  updatedAt":"2019-29-18T08:42:51.334Z",
                  "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
                
    - PATCH : /vote
        - description : vote and unvote question
        - params : questionID
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
### Answer

  - base routes USER url : http://localhost:3000/api/answer

    - GET /:id
        - description : get answer base on id question
        - body : none
        - params : question id
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is deleted"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

    - POST : /
        - description : create a new user
        - body : 
            ```
                { 
                    question : your content question,
                }
            ```
        - Headers : yes
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   
                  "_id":"5d6745cce3a36669ea9160a8",
                    "upVote":"array",
                    "downVote":"array",
                    "content":"your content comment",
                    "userId":5d65fb17d3f50137468543dc",
                    "questionId":"5d66c1ca4528ed2626adf580",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

    - PATCH : /:id
        - description : update answer
        - body : none
        - params : answer id
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "message": "update success"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    
    - DELETE : /:id
        - description : delete answer
        - body : none
        - params : answer id
        - Headers : yes
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "message": "delete success"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```

### User

  - base routes USER url : http://localhost:3000/api/user

    - POST /register
        - description : register account
        - body : yes
        - params : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"budi",
                    "email":budio@gmail.com",
                    "password":"$2a$10$KElSSENK14IoN4zsyY",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - POST : /login
        - description : login user
        - body : yes "email and password"
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"budi",
                    "email":budio@gmail.com",
                    "password":"$2a$10$KElSSENK14IoN4zsyY",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ 'npm init -y'
    $ 'npm install'
    $ 'nodemon app.js' for server
    $ 'npm run serve' for clint
```

