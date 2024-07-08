# PenWise Journaling App Backend

## Overview

This project is the backend for the PenWise Journaling App. It handles user authentication, journal entry management, and categorization of journal entries. The backend is built using TypeScript and Express.js, with PostgreSQL as the database.

## Project Structure

The backend project is organized into several folders and files, each serving a specific purpose. Below is the file tree representation of the project:

```bash
/backend/
├── README.md
├── config
│   └── database.ts
├── controllers
│   ├── authController.ts
│   └── journalEntryController.ts
├── index.ts
├── init.sql
├── middlewares
│   └── authMiddleware.ts
├── models
│   ├── Category.ts
│   ├── JournalEntry.ts
│   └── User.ts
├── package-lock.json
├── package.json
├── routes
│   ├── auth.ts
│   └── categoryRoutes.ts
│   └── journalEntryRoutes.ts
├── tsconfig.json
└── utils
    └── jwt.ts


```


## Folder and File Descriptions

- **config**: Contains configuration files.
  - `database.ts`: Database connection and configuration.

- **controllers**: Contains the controller files that handle the application logic for different routes.
  - `authController.ts`: Handles user authentication-related operations.
  - `journalEntryController.ts`: Manages journal entries.

- **dist**: Compiled output directory.
  - `ex.ts`: Example or test file.
  - `index.ts`: Entry point of the application.

- **init.sql**: SQL initialization script for setting up the database schema.

- **middlewares**: Contains middleware files.
  - `authMiddleware.ts`: Middleware for authentication.

- **models**: Contains the data models.
  - `JournalEntry.ts`: Model for journal entries.
  - `User.ts`: Model for users.

- **routes**: Contains the route files.
  - `auth.ts`: Routes for user authentication.
  - `journalEntryRoutes.ts`: Routes for journal entry operations.

- **tsconfig.json**: TypeScript configuration file.

- **utils**: Utility functions.
  - `jwt.ts`: Functions for handling JSON Web Tokens (JWT).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version >= 16.0.0)
- PostgreSQL (version >= 9.0)

### Dependencies

```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "pg": "^8.12.0"
}
```

```json
"devDependencies": {
  "@types/bcrypt": "^5.0.2",
  "@types/dotenv": "^8.2.0",
  "@types/express": "^4.17.21",
  "@types/jsonwebtoken": "^9.0.6",
  "@types/pg": "^8.11.6",
  "nodemon": "^3.1.4",
  "typescript": "^5.5.3"
}
```

### Installation

1. Clone the repository:

```bash

    git clone https://github.com/james-mumo/PenWise-Journaling-App

    cd backend
```

2. Install dependencies:
   ```bash
   npm install

3. Set up the database

    - Create a PostgreSQL database.
    - Run the SQL script to initialize the schema:
    - Ensure the Postgress Service is up and running
    - Test the Postgres-database connection string{DATABASE_URL}, sample is as below:

   ```bash
        postgresql://postgres:123456@localhost:5432/penwise
    ```
     

4. Configure environment variables

```bash
- Create a `.env` file in the root directory and add the following environment variables (e.g., PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, DATABASE_URL).
```

## Application Availability

```bash
The application will be available at http://localhost:${PORT}.
```

## Contributing

```bash
Feel free to submit issues, fork the repository, and send pull requests! This project is a take-home assignment that I am working on independently. However, if you are interested in the application, you are welcome to fork the repository and contribute to making it better.
```

<!-- ## License -->
<!-- 
```bash
    This project is licensed under the MIT License. See the LICENSE file for details.
``` -->

