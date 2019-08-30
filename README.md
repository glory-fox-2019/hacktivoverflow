# Askfully
A forum app similar to  https://stackoverflow.com for Portofolio on Hacktiv8 Bootcamp. Deployed on: http://askfully.luqmanzakariya.com/

## USAGE

Before using the API, make sure you install these packages on global by running this code:

    npm install -g @vue/cli
    OR
    yarn global add @vue/cli

### Usage Client
You can access the client via http://localhost:8080 (by default).
Make sure you have vue installed in your computer, then go to client folder and run these commands:

    npm run serve

## Usage Server
You can access the client via http://localhost:3000.
Make sure you have Node.js and npm installed in your computer, then go to server folder and run these commands:

    npm install
    npm start
    npm run dev

## List of User routes:
base url : http//localhost:3000/users

example :

    http//localhost:3000/users/register

| Route  | HTTP | Headers(s) | Body | Sucess Response | Error Response  | Description         |
| ------ | ---- | ---------- | - |-| ---- | ----- | ------------------- |
| `/users/register` | POST | `none` | `name (string, required), email (string, required), password (string, required)` | (201) json(_id, name, email, password (encrypted), createdAt, updatedAt, __v) | (500) json(code, message)  | Sign up with new user info |
| `/users/login` | POST | `none` | `email (string, required), password (string, required)` |  (200) json(              token, _id, name, email | (500) json(code, message), (401) json(code, message)  | Sign in and get an access token based on credentials |


## List of Questions routes:
base url : http//localhost:3000/questions

example :

    http//localhost:3000/questions/findAll

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/findAll` | GET | `none` | `none` | (200) [ json(_id, AnswerId, upvotes, downvotes, tags, title, content, UserId, createdAt, updatedAt, __v)] | (500) json(message) | Get all questions |
| `/detail/:id` | GET | `none` | `none` | (200) json(_id, AnswerId, upvotes, downvotes, tags, title, content, UserId, createdAt, updatedAt, __v) | (500) json(message) | Get question by id |
| `/tag` | POST | `none` | `none` | (200) [ json(_id, AnswerId, upvotes, downvotes, tags, title, content, UserId, createdAt, updatedAt, __v)] | (500) json(message) | Get questions by tags |
| `/create` | POST | `token` | `title`,`content`,`tags` | (200) [ json(_id, AnswerId, upvotes, downvotes, tags, title, content, UserId, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Create questions |
| `/userQuestion` | POST | `token` | `none` | (200) [ json(_id, AnswerId, upvotes, downvotes, tags, title, content, UserId, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Get user logged in quesetion |
| `/upvotes/:id` | POST | `token` | `none` | (200) json(n,nModified,ok) | (500) json(message), (403) json(message: unauthorized) | Upvote question by id |
| `/downvotes/:id` | POST | `token` | `none` | (200) json(n,nModified,ok) | ((500) json(message), (403) json(message: unauthorized) | Downvote question by id |
| `/:id` | DELETE | `token` | `none` | (200) json(ok,deletedCount,n) | (500) json(message), (403) json(message: unauthorized) | Delete question by id |
| `/:id` | PATCH | `token` | `title`,`content`,`tags` | (200) json(n,nModified,ok) | (500) json(message),(403) json(message: unauthorized) | Delete question by id |


## List of Answer routes:
base url : http//localhost:3000/answers

example :

    http//localhost:3000/answers/find/:id

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/find/:id` | GET | `token` | `none` | (200) json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v) | (500) json(message), (403) json(message: unauthorized) | Find answer by id |
| `/create/:id` | POST | `token` | `content` | (200) json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v) | (500) json(message), (403) json(message: unauthorized) | Create answer by id |
| `/upvotes/:id` | POST | `token` | `none` | (200) json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v) | (500) json(message), (403) json(message: unauthorized) | Upvote answer by id |
| `/downvotes/:id` | POST | `token` | `none` | (200) json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v) | (500) json(message), (403) json(message: unauthorized) | Downvote answer by id |
| `/:id` | DELETE | `token` | `none` | (200) json(ok,deletedCount,n) | (500) json(message), (403) json(message: unauthorized) | Delete answer by id |
| `/:id` | PATCH | `token` | `none` | (200) json(n,nModified,ok) | (500) json(message), (403) json(message: unauthorized) | Update answer by id |


## List of Tag routes:
base url : http//localhost:3000/answers

example :

    http//localhost:3000/tags/findAll

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/findAll` | GET | `token` | `none` | (200) [json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Find all tags |
| `/find/:id` | GET | `token` | `none` | (200) [json(_id, upvotes, downvotes, content, UserId, QuestionId, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Find tags by tag name |