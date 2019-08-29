# hacktivoverflow

link deploy server : http://3.15.230.206/ <br>
link deploy client : http://hacktivoverflow.mromiario.com.s3-website-ap-southeast-1.amazonaws.com/5d6799a115b90c7d027f47cd#


# hacktivoverflow API

Routes
---
Access : http://3.15.230.206/api

Bellows are routes that used in the sever.

- base routes Question url : http://3.15.230.206/api/questions

    - GET : /
        - description : get all questions
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
                    },
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d65e497f2b4e5fe3ae05b01",
                        "title": "why life so easy",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-28T02:19:03.143Z",
                        "updatedAt": "2019-08-28T02:19:03.143Z",
                        "__v": 0
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
    - GET : /:id
        - description : Get one question
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
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
    - GET : /list/myquestion
        - description : Get question of logged user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
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
        - description : create new question
        - body : 
            ```
            {
                title : String required,
                description : String,
                upvotes: [ObjectId User],
                downvotes: [ObjecrId User],
                User:  ObjectId,
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 201
           
                ``` 
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
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
        - description : update data of question
        - body : data that may want to be updated
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId Question
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is updated"
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
                
    - DELETE /:id
        - description : delete question
        - body : none
        - params : ObjectId Question
        - Headers : JWT Token
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
    - PATCH : /upvotes/:id
        - description :  add upvotes
        - body : 
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId Question
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "votes counted"
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
                    "message": "You can only vote once
                }
                ```
     - PATCH : /downvotes/:id
        - description :  add downvotes
        - body : 
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId Question
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "votes counted"
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
                    "message": "You can only vote once
                }
                ```

        
- base routes Answer url : http://3.15.230.206/api/answers

    - GET : /all/:id
        - description : get answer of a question
        - body : none
        - Headers : none
        - params : ObjectId Question
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "QuestionId" : "abxnasmnasmnxxsbmn",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
                    },
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d65e497f2b4e5fe3ae05b01",
                        "title": "why life so easy",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "QuestionId" : "abxnasmnasmnxxsbmNn",
                        "created_at": "2019-08-28T02:19:03.143Z",
                        "updatedAt": "2019-08-28T02:19:03.143Z",
                        "__v": 0
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
    - GET : /:id
        - description : Get answer
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "QuestionId" : "abxnasmnasmnxxsbmNn",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
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
        - description : create new answer
        - body : 
            ```
            {
                title : String required,
                description : String,
                User:  ObjectId,
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 201
           
                ``` 
                    {
                        "upvotes": [],
                        "downvotes": [],
                        "_id": "5d643c510d8b0ac3a1e766a8",
                        "title": "why javascript is easy to use in web dev?",
                        "description": "i am recently asking to myslef bla bla",
                        "User": "5d63b8ea4da010bfc301be89",
                        "created_at": "2019-08-26T20:08:49.492Z",
                        "updatedAt": "2019-08-26T20:08:49.492Z",
                        "__v": 0
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
        - description : update data of answe
        - body : data that may want to be updated
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId answer
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is updated"
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
                
    - DELETE /:id
        - description : delete answer
        - body : none
        - params : ObjectId Question
        - Headers : JWT Token
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
    - PATCH : /upvotes/:id
        - description :  add upvotes
        - body : 
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId Question
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "votes counted"
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
                    "message": "You can only vote once
                }
                ```
     - PATCH : /downvotes/:id
        - description :  add downvotes
        - body : 
            ```
            {
                title : String required,
                description : String
            }
            ```
        - params : ObjectId Question
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "votes counted"
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
                    "message": "You can only vote once
                }
                ```



- base routes USERS url : http://3.15.230.206/api/users

    - POST : /register
        - description : create a new user
        - body : 
            ```
                { 
                    name : String,
                    email : String,
                    password : String,
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
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
        - description : login to the system
        - body : 
            ```
                { 
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu",
                    "UserId" : "bsxkbhsacbusacbj"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 404
                ```
                {"message" : "invalid username/password"}
                ```




Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ nodemon app.js
```