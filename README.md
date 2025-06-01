# Quiz Application

## Overview
This is a simple Quiz Application built using TypeScript, Express, and Docker. It provides a RESTful API that allows users to:

- Create and interact with quizzes

- Submit answers

- Retrieve results

The backend is powered by Node.js, with all business logic and data managed in memory, making it lightweight and ideal for prototyping or small-scale use.

The application is containerized using Docker, enabling easy deployment and consistent development environments.

## Prerequisites
To run the application, ensure that the following tools are installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Running the Service

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/parimalIngole/quiz-application.git
cd quiz-application
npm install
npm run build
```

## Swagger API Documentation and details

This project uses **Swagger** to generate and serve interactive API documentation, following the **OpenAPI 3.0** specification.

Swagger provides a clean, web-based interface that allows developers and testers to:

- Explore all available API endpoints
- View detailed request and response formats
- Try out API calls directly from the browser
- Understand required parameters, status codes, and error messages

### Accessing Swagger Documentation

The Swagger UI is available in the development environment at the following URL:

🔗 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

> ✅ Ensure the server is running before accessing the documentation in your browser.

This interface allows you to interact with the API endpoints, view request/response schemas, and test API functionality directly from your browser.
