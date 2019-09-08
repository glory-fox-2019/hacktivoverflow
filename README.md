# hacktivoverflow

## Link Deploy 
http://orevascloud.s3-website-ap-southeast-1.amazonaws.com

## usage 
on server
```javascript
$ npm install
$ npm run dev
```

on client
```javascript
$ npm install
$ npm run serve
```
## REST API
All end point routes start with http://13.250.110.115
## /users end point

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/users/register`|POST|`none`|

Body :  
```
   username: String (Required)
   password: String (Required)
   email : String (Required) (Unique)
```
Success :
```
   status: 201
   message: 'You have successfully registered account'
```
error :
```
   status: 404
   message: 'failed to registered account'
```

### **Login User**

Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
```
   email: String (Required)
   password: String (Required)
```
Success :
```
   status: 200
   message : 'Login successfull'
   data: 'token'
```
error :
```
   status: 404
   message: 'email/password is wrong'
```

## /questions end point

### **Create questions**

Create new questions into the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions`|POST|`token`|
Body :
```
   title: String (Required)
   description: String (Required)
```
   
success :
```
   status : 201
   message : 'questions has been created successfully'
```
error :
```
   status: 404
   message : 'failed to create questions'
   ```

### **Find questionss**

Find all user's questions
| Route | HTTP | Headers |
|---|---|---|
|`/questions/user`|GET|`token`|
Body :
```
   none
   ```
success :
```
   status: 200
   message: 'all user's data'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find All questionss**

Find all questions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   message: 'all questionss'
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update question**

Update a question in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions/:id`|PATCH|`token`|

Body :
```
   title: String 
   description: String 
```

success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```

note : one of the body variable have to different from before 

### **Delete question**
Delete question in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```


### **upvote question**
upvote question in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions/upvote`|POST|`token`|

Body :
```
   id : String
```
success :
```
   status: 200
   message: 'upvote successfully'
```
error:
```
   status: 404
   message: 'failed to upvote data'
```

### **downvote question**
downvote question in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions/downvote`|POST|`token`|

Body :
```
   id : String
```
success :
```
   status: 200
   message: 'downvote successfully'
```
error:
```
   status: 404
   message: ' failed to downvote'
```

   ## /questions end point

### **Create questions**

Create new questions into the database
| Route | HTTP | Headers |
|---|---|---|
|`/answers`|POST|`token`|
Body :
```
   title: String (Required)
   description: String (Required)
```
success :
```
   status : 201
   message : 'questions has been created successfully'
 ```  
error :
```
   status: 404
   message : 'failed to create questions'
```

### **Find answers**

Find all user's answers
| Route | HTTP | Headers |
|---|---|---|
|`/questions`|GET|`token`|
Body :
```
   none
```
success :
```
   status: 200
   message: 'all user's data'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find All Question Answers**

Find all answers in spesific questions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/answers/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   message: 'all answers based on question ID'
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update question**

Update a answer in the database
| Route | HTTP | Headers |
|---|---|---|
|`/answers/:id`|PATCH|`token`|

Body :
```
   title: String 
   description: String 
   ```

success :
```
   status: 200
   message: 'update successfull'
```
error:
```
   status: 404
   message: 'update failed'
```
note : one of the body variable have to different from before 

### **Delete answer**
Delete user answer in the database
| Route | HTTP | Headers |
|---|---|---|
|`/answers/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```


### **upvote question**
upvote answers in the database
| Route | HTTP | Headers |
|---|---|---|
|`/questions/upvote`|POST|`token`|

Body :
```
   id : String
```
success :
```
   status: 200
   message: 'upvote successfully'
```
error:
```
   status: 404
   message: 'failed to upvote data'
```
### **downvote question**
downvote answers in the database
| Route | HTTP | Headers |
|---|---|---|
|`/answers/downvote`|POST|`token`|

Body :
```
   id : String
```
success :
```
   status: 200
   message: 'downvote successfully'
```
error:
```
   status: 404
   message: ' failed to downvote'
```

   

