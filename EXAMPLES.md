
# Examples

The URI that will be used as an example is http://localhost:3000

## Curl

### Users

#### Create user
`curl http://localhost:3000/auth/register -H "Content-Type: application/json" -X POST -d "{ \"username\": \"johndoe\", \"password\": \"DKEtR7mcG9YAuEPe\" }"`

Output: 
```JSON
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjE5MiwiZXhwIjoxNTgzNTgyNTkyfQ.Q7XYt2USZluN7AI2xobZadC1isc7FVBfzlTI1lLX1jI"}
```

#### Login into an account
`curl http://localhost:3000/auth/login -H "Content-Type: application/json" -X POST -d "{ \"username\": \"johndoe\", \"password\": \"DKEtR7mcG9YAuEPe\" }"`

```JSON
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00"}
```

### courses

#### Create a new course
`curl http://localhost:3000/courses -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00" -X POST -d "{ \"name\": \"C# Course\", \"description\": \"Learning from basic to advanced\", \"workload\": \"4\", \"total_classes\": 8, \"year\": 2018}"`

Output:
```JSON
{"_id":"5e623c84f294892e7b74830f","name":"C# Course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}
```

#### Update a course
`curl http://localhost:3000/courses/5e623c84f294892e7b74830f -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00" -X PATCH d "{ \"name\": \"A new name for the course\" }"`

Output:
```JSON
{"_id":"5e623c84f294892e7b74830f","name":"A new name for the course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}
```

#### List all courses
`curl http://localhost:3000/courses`

Output:
```JSON
[{"_id":"5e623c84f294892e7b74830f","name":"A new name for the course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}]
```

#### List a course
`curl http://localhost:3000/courses/5e623c84f294892e7b74830f`

Output:
```JSON
{"_id":"5e623c84f294892e7b74830f","name":"A new name for the course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}
```

#### Delete a course
`curl http://localhost:3000/courses/5e623c84f294892e7b74830f -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00" -X DELETE`

There's not any output
