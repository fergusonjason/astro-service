# typescript with mongoose

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

I have not yet implemented nodemon for hot updating.