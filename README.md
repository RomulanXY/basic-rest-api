# User Authentication REST API with CRUD Features

This repository contains a fundamental RESTful API for user authentication and management. Built using Node.js, Express, MongoDB, TypeScript, and Lodash, it offers essential endpoints for creating, updating, retrieving, and deleting user profiles.

## Table of Contents
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
  - [API Routes](#api-routes)
  - [Database Model](#database-model)
  - [Testing with Postman](#testing-with-postman)
  - [Running the API](#running-the-api)
- [Important Note](#important-note)

## Key Features:

- **User Authentication:** Secure user authentication mechanisms are implemented.
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations for user profiles.
- **Simplicity:** Focuses on core functionalities without unnecessary complexity.
- **TypeScript:** Codebase is written in TypeScript for code quality and maintainability.
- **MongoDB:** User data is stored and managed in a MongoDB database.
- **Lodash:** Efficient data manipulation and processing using Lodash.

## Getting Started:

To use this REST API, follow these steps:

### Setting Up Environment Variables:

1. Create a `.env` file in the root directory.
2. Set the following environment variables with your values (replace with actual values for production):

PORT=
MONGODB_URI=""
SECRET=""


For setting up the `MONGODB_URI` variable, you can follow the MongoDB documentation on creating a cluster and obtaining the connection URI [here](https://docs.mongodb.com/guides/cloud/connectionstring/).

### API Routes:

- `POST /auth/register`: User registration.
- `POST /auth/login`: User login.
- `GET /users` (protected): Retrieve all users.
- `DELETE /users/:id` (protected): Delete a user by ID.
- `PATCH /users/:id` (protected): Update a user by ID.

### Database Model:

- User model includes fields for `username`, `email`, and an `authentication` object containing `password`, `salt`, and `sessionToken`.
- This model is used for CRUD operations on user data.

### Testing with Postman:

You can use Postman or any other frontend helper to test the API. Here's how to structure payloads for key endpoints:

- **User Registration** (POST `/auth/register`): JSON payload with `username`, `email`, and `authentication.password`.
- **User Login** (POST `/auth/login`): JSON payload with `email` and `authentication.password`.
- **Get All Users** (GET `/users`): No payload required. Include a valid JWT in the `Authorization` header.
- **Delete User** (DELETE `/users/:id`): No payload required. Include a valid JWT in the `Authorization` header.
- **Update User** (PATCH `/users/:id`): JSON payload with the fields you want to update (e.g., `username`, `email`, or `authentication.password`). Include a valid JWT in the `Authorization` header.

### Running the API:

Start the API by running `npm start`.

## Important Note:

This repository is intended for educational and developmental purposes. It serves as a solid foundation for user authentication and CRUD operations and is ideal for kickstarting development, building prototypes, or testing projects. However, it is not recommended for production use without further enhancements:

- **Security:** Implement additional security measures and best practices to safeguard user data.
- **Performance:** Optimize code and infrastructure for efficient handling of production loads.
- **Scalability:** Evaluate the application's scalability to meet the demands of a larger user base.
- **Testing:** Conduct comprehensive testing and quality assurance to identify and resolve potential issues.

In summary, while this repository provides a valuable starting point, exercise caution and diligence when transitioning to production environments.
