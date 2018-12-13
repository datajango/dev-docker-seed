# simple-node-server

* build docker image
```
docker build -t simple-node-server .
```

* start docker image
```
docker run --name simple-njs -d --rm -v $(pwd)/app:/src/app -v $(pwd)/public:/src/public -p 4300:4300 simple-node-server
```
* see running containers
```
docker ps
```

* login inside the container using bash
```
docker exec -it simple-njs /bin/bash
```

* stop docker image
```
docker stop simple-njs
```

## Patterns

* Run in Development Mode
* Run in Production Mode
* Pass port number in
* Pass parameters in
* reload automatically 
    * nodemon

