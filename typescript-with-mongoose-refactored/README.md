# typescript-with-mongoose-refactored

(NOTE: The previous version had a few issues, and wasn't completely compatible with the way
various client framesworks wanted to do paging. I decided to spend a few hours cleaning
up the old version, and fixing the mistakes I had previously made.)

This project creates a node/express REST service providing access to the a mongodb datastore representing
several astronomical catalogs. It is organized as an n-tier application, but only uses a controller
layer and a repository layer as there really isn't much backend business logic (which is intended to be
do in the client).

## Running the service

The first time you run the service, you will need to run the following command:

```
npm install
```

To run the service, run the following commands from the service root directory:

```
npm run build
npm run start
```

This service runs on port 3333, rather than the default port 3000 express runs on. Certain client
frameworks (looking at you, React) wanted to run their default service on port 3000, and since
this project is Dockerized, it was easier to change the default port for this service than change
it in all the client implementations.

I have not yet implemented nodemon for hot updating.

## Docker

This service can be build into a Docker container for convenience. Use the following command to
create the container:

```
npm run dockerize
```
