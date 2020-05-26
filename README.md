# cerb-accounts-auth
Accounts management for REST.

## Features
* Create and manage users
* Create sessions (JWT)
* Database: MongoDB Atlas

## Schema Model (Mongoose)
`account.model.js` is used to create mongoose schema for account collection. 
``` JavaScript
const accountSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    studentId: {type: String, require: true},
    studentName: {type: String, require: true},
    role: {type: String, require: true}, // To control access
    },
    { timestamps: true }
  );
```
## Install
```
npm install
```

## Config
`.env` is used to manage environment variables and need to be created manually.
```
PORT={port}
NODE_ENV=development
ATLAS_URI={Mongodb atlas uri}
VERSION=1.0.0
secret={your-256-bit-secret}
increaseTime={increase seconds}
```

## Usage
```
npm start
```
### Login
The url of login `POST` request is `{{schema}}://{{host}}/oauth2/token`. The `Content-Type` in the header of this request needs to be altered to `application/x-www-form-urlencoded`. The `grant_type` of OAuth is `password` in this example. Thus, the http body is `grant_type=password&username={username}&password={password}`. As the user finishes login, the `access_token` will return.

### Accounts management
The person whose role is `admin` can implement different funtions to manage accounts, like `add`, `put`, or `delete`. 