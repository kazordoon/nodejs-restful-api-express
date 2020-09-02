
# Examples

The URI that will be used as an example is http://localhost:3000

## Curl

### Users

#### Create user
```bash
curl http://localhost:3000/auth/register -H 'Content-Type: application/json' -d '{ "username": "johndoe", "password": "DKEtR7mcG9YAuEPe" }'
```

Output: 
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjE5MiwiZXhwIjoxNTgzNTgyNTkyfQ.Q7XYt2USZluN7AI2xobZadC1isc7FVBfzlTI1lLX1jI"}
```

#### Login into an account
```bash
curl http://localhost:3000/auth/login -H 'Content-Type: application/json' -d '{ "username": "johndoe", "password": "DKEtR7mcG9YAuEPe" }'
```

```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00"}
```

### courses

#### Create a new course
```bash
curl http://localhost:3000/courses -H  'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00' -d '{ "name": "C# Course", "description": "Learning from basic to advanced", "workload": "4", "total_classes": 8, "year": 2018}'
```

Output:
```json
{"data":{"type":"courses","id":"5f50214de3478f1a50e3368f","attributes":{"_id":"5f50214de3478f1a50e3368f","name":"C# Course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}},"links":{"self":"/courses/5f50214de3478f1a50e3368f"}}
```

#### Update a course
```bash
curl http://localhost:3000/courses/5f50214de3478f1a50e3368f -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00' -X PATCH -d '{ "name": "A new name for the course" }'
```

Output:
```json
{"data":{"type":"courses","attributes":{"name":"A new name for the course"}},"links":{"self":"/courses/5f50214de3478f1a50e3368f"}}
```

#### List all courses
```bash
curl http://localhost:3000/courses
```

Output:
```json
{"data":[{"type":"courses","id":"5f50214de3478f1a50e3368f","attributes":{"_id":"5f50214de3478f1a50e3368f","name":"A new name for the course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}}],"links":{"self":"/courses","first":1,"prev":null,"next":null,"last":1}}
```

#### List a specific course
```bash
curl http://localhost:3000/courses/5f50214de3478f1a50e3368f
```

Output:
```json
{"data":{"type":"courses","id":"5f50214de3478f1a50e3368f","attributes":{"_id":"5f50214de3478f1a50e3368f","name":"A new name for the course","description":"Learning from basic to advanced","workload":4,"total_classes":8,"year":2018}},"links":{"self":"/courses/5f50214de3478f1a50e3368f"}}
```

#### Delete a course
```bash
curl http://localhost:3000/courses/5f50214de3478f1a50e3368f -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjIzYzAwZjI5NDg5MmU3Yjc0ODMwZSIsImlhdCI6MTU4MzQ5NjIxOCwiZXhwIjoxNTgzNTgyNjE4fQ.9zBFuKenS6XA5ZalZJTUpeOVltovcvjku7Bjex65_00' -X DELETE
```

There's not any output
