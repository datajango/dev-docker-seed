# dev-docker-seed

[dev-docker-seed](https://github.com/datajango/dev-docker-seed)

by Anthony Leotta (the datajango)

This demo keeps growing, it started as a simple idea: "How can you create Node.Js back-ends using Typescript?"  The answer is: NestJS.   Along the way, I realized that the preferred way to develop back-ends is to do it locally on whatever your OS of choice is.  I running at the time of this writting a mess of OSes including : MacOS Mojava 10.14.2, Windows 10 Pro, Linux Ubuntu 16.04, 17.10 and 18.04. I need a way to develop equally as well on all my platforms.

My "must have" features are:

* 100% containerized - I install NOTHING locally.
* Ultra fast container reconfiguration
* Interactive Debugging
* Live Code Watching and rebuilds
* Emmet -- bow thy head to the awesome power of Emmet ---
* Linting
* Code completion
* Preffered IDE is Visual Code Studio
* Choice of using any database on this list: MySQL / MariaDB / Postgres / SQLite / Microsoft SQL Server / Oracle, mongodb
* Choice of using redis
* Support ES6, ES7, ES8
* Support TypeScript (Obviously the entire point of this exercise)
* Include a test email server
* Browser based SQL Database Manager - I install NOTHING.
* Browser based Mongo Database Manager - I install NOTHING.
* SSL https for testing
* Domain Name aliasing for testing
* Unit tests

I tried Vagrant and Virtual Box but quickly rejected it because it forced me to rebuild my images from scratch every time.  I adopted Docker and Docker Compose as a way to quickly build up a fully containerized developmnet environment.  Once I started down the Docker path, setting up a fully featured development envrionment became so easy that I was able include features I hold only dreamed about.

Make no mistake: Docker is the greatest thing to ever haoppen to software development.

## Running

```
docker-compose build
docker-compose up -d
```

|    Name   | Command|State|Ports|
|-----------|--------|-----|-----|
|adminer-c  |entrypoint.sh docker-php-e ...|   Up  |    0.0.0.0:8080->8080/tcp|
|maildev    |bin/maildev --web 80 --smtp 25|   Up  |    25/tcp, 0.0.0.0:1080->80/tcp|
|mysql-c    |docker-entrypoint.sh mysqld   |   Up  |    0.0.0.0:3336->3306/tcp, 33060/tcp|
|php-c      |docker-php-entrypoint php-fpm |   Up  |    9000/tcp|
|simple-c   |npm start                     |   Up  |    0.0.0.0:4300->4300/tcp|
|web-c      |nginx -g daemon off;          |   Up  |    0.0.0.0:80->80/tcp|

## Standard JavaScript Node.js 

The following describes the a node.js server project written in JavaScript.

### Nodemon 

12/13/2018 - I had to add a nodemon.json configuration in order to get nodemon working. It was then that I also realized that the node_modules folder can be either in the image or shared using a volume.  This is somewhat surprising to me because it changes the way I think about npm install and containers in general.  Running 'npm install' in a Dockerfile against a volume, in effect is the same as running 'npm install' on the local machine.  What I did was change my volume to point to the 'src' folder under simple-nodejs-server.

nodemon.json:
```
{
    "restartable": "rs",
    "verbose": true,
    "delay": "500ms",
    "watch": [
      "src/",
      "node_modules/"
    ],
    "ext": "js",
    "args": [
      "--inspect=9229"
    ]
  }
```

### Step debugging in MS Code Studio

Start node with debugging turned on

* --inspect tells Node that we want to run our app in debug mode.
* by adding -brk we also make sure that the app stops at the first line, so we have enough time to open up the inspector
* nadding =0.0.0.0 opens up the debugger to connections from any IP.

```
node --inspect-brk=0.0.0.0
```

In MS Code Studio, add a debug configuration:
```
{
  "name": "Docker: Attach to Node",
  "type": "node",
  "request": "attach",
  "port": 9229,
  "address": "localhost",
  "localRoot": "${workspaceFolder}",
  "remoteRoot": "/",
  "protocol": "inspector"
}
```

## Terminal for simple-nodejs-server

```
docker-compose exec simple-nodejs-server bash
```

## Testing

### Phase 1

To see that all the various components are running, execute curl at the command line. If all the server respond, moveteh next next phase.

Main HTML/PHP Website
```
curl -i localhost:80
```

MailDev Website
```
curl -i localhost:1080
```

Adminer Website
```
curl -i localhost:8080
```

Simple Node.Js Server
```
curl -i localhost:4300
```

### Phase 2

* Test mysql at the command line
```
docker-compose exec db /bin/bash
```

* This command will run the mysql client and return the version of the currently running server.
```
docker exec -i mysql-c mysql -uroot -pmysql  <<< "select version();"
```

* dump the mysql database without having to use a password
  * gzipped
```
docker-compose exec db mysqldump nestdemo | gzip > db/backups/nestdemo.sql.gz
```
  * plain
```
docker-compose exec db mysqldump nestdemo | cat > db/backups/nestdemo.sql
```


## Steps to Create this ProjectSetup

Dependencies

```
    npm init
    npm i typescript -g
    npm i typescript --save-dev
    tsc --init or ./node_modules/.bin/tsc --init
```

Let’s add just two more options to that base configuration tsconfig.json:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "dist",
    "sourceMap": true
  }
}
```
## Docker

The dockedr-compose environment includes :

* mysql
  * [mysql](https://docs.docker.com/samples/library/mysql/#-via-docker-stack-deploy-or-docker-compose)
* adminer
  * [Adminer](https://hub.docker.com/_/adminer/)
  * ![Adminer](./docs/adminer.png)
* Maildev Client
  * For sending email
  * ![maildev](./docs/maildev.png)
* nginx
* php-fpm

## Resources

* [An Exhaustive Guide to Writing Dockerfiles for Node.js Web Apps](https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4)
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
* [npm-package.json](https://docs.npmjs.com/files/package.json)
* [Docker Tips : Development With Nodemon](https://medium.com/lucjuggery/docker-in-development-with-nodemon-d500366e74df)
* [Setup Node.js, Apache and an nginx reverse-proxy with Docker](https://medium.com/@francoisromain/setup-node-js-apache-nginx-reverse-proxy-with-docker-1f5a5cb3e71e)
* [Building Your First Node App Using Docker
](https://www.javascriptjanuary.com/blog/building-your-first-node-app-using-docker)
* [Nest framework TypeScript starter](https://github.com/nestjs/typescript-starter)
* [NestJS Docs](https://docs.nestjs.com/)
* [nodemon utility](https://nodemon.io/)
* [Docker](https://docs.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/compose-file/)
* [MySQL in Development](https://serversforhackers.com/c/mysql-in-dev-docker)

## To Cleanup

* Stop all containers
```
docker stop $(docker ps -a -q)
```
* Delete all containers
```
docker rm -f $(docker ps -a -q)
```
* Delete all images
```
docker rmi -f $(docker images -q)
```
* Delete all volumes
```
docker volume rm $(docker volume ls -q)
```

* All commands together to make easier cut-n-paste
```
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)
docker volume rm $(docker volume ls -q)
```
