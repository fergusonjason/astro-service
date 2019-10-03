# astro-service

These are the various implementations of my astronomical data service. They serve two purposes:

1. Figure out new backend technologies
2. Provide a service to connect to when I want to play with new frontend technologies

These services are all written in typescript and are ME*N stack applications (A removed because this
is only the backend).

Right now, there are only the following projects in here:

- Typescript with Mongodb - written in typescript accessing a mongodb data store
- dataInit - scripts to initialize the various data stores

I'll try to get one based on postgres in here in the future, which is what I would actually use in a
production environment.

This project is related to an upcoming *astro-client* repository, which will have various clients
to access this service.

Data is provided by the Vizier service.

## Server setup

This service assumes that you are running mongodb in a Docker container with port 27017 exposed. This is
not a comprehensive tutorial, but here's the general setup:

1. Install docker as appropriate for your Operating System.
2. Install Portainer from dockerhub
3. Run the Portainer image (you may want to look up how to insure it runs on system startup)
4. Within portainer, pull (relevant database) image
5. Within portainer, set up a container for (relevant database), exposing the correct port

