# NestJS Boilerplate Package

## Inspiration

- My current company used this way to separate the business logic code and boilerplate code, but they implemented with awilix-koa.

- It is a interesting concept to me, thus i tried to recreate the packages with NestJs as it is built in with alot of features.

- After commiting some time on it , i find out that maybe type-graphql will suit the job more but i am lazy to switch to another framework. LOL

- It is my first public package and i will not be maintaing it. If you find the concept interesting and will like to fork it and publish as another package, Please do so. After you have published your package , if you like , please give me a notice or a DM. I will like to learn from it too. Thanks!!!

## FYI

- The module are dynamic loaded.
- The logs are saved into the database under the table `log`
- You can extend the BaseRepository classs with your DAO class so you can `CRUD` in your service without writing these function in your DAO class.
- To add your business logic code, You can follow the file structure below
- There is a global AWS SNS Module `AwsSNSModule` and `AwsS3Module` which can be used
  - AwsSNSModule has only publish function and the topic must be created before
  - AwsS3Module has only upload and get files function

```
  \-- src
    \users
      +-- user.controller.ts
      +-- user.dao.ts
      +-- user.dto.ts
      +-- user.entity.ts
      +-- user.module.ts
      +-- user.serivce.ts
    \common

```

## Installation

### NPM

`npm i @tonybobo/nestjs-registry `

### Yarn

`yarn add @tonybobo/nestjs-registry`

## How to use

- Create a main.ts
- Add the code below

```
require("../node_modules/@tonybobo/nestjs-registry/dist/main.js")
```

- Add code below to the package.json

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "rimraf dist && nest start && NODE_ENV=dev"
  },
```

- create a .env file
- depending on the NODE_ENV , you can create dev.env or stage.env or prod.env

```
PORT=3000
BASE_URL=http://localhost:3000

DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_NAME=tests
DATABASE_USER=sammy
DATABASE_PASSWORD=password
DATABASE_PORT=3306

COOKIE=true;
COOKIE_SECRET=123
AWS_REGION=YOUR-REGION
AWS_ACCESS_KEY_ID=YOUR-KEY
AWS_SECRET_ACCESS_KEY=YOUR-SECRET-KEY
AWS_SNS_TOPIC_ARN=YOUR-TOPIC
```

## Reference

- You can refer to this repository that i used to test this [package](https://github.com/Tonybobo/nestjs-registry-test-package)
