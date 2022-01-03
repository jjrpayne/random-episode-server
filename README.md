# Random Episode Server

This is a server for my Random Episode Picker app. Its primary purpose is to protect my OMDB API key.

## Routes
Here is a list of routes for the server:

### GET /
Returns a welcome message.

### GET /get_hostname
Returns the hostname of the webapp making the request. Used to set environment variables.

### GET /get_from_omdb
Makes a request to the OMDB API using an API key provided in the .env file.
Usage is the same as making a request to the OMDB API:
https://www.omdbapi.com/
