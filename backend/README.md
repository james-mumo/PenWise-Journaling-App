

# Express, Typescript with Postgres Backend

---


<div align="center">

```bash
    This is the backend service for the React-Native Frontend 
    built with Express.Js, Typescript and Postgres DB
```

</div>

## Table of Contents

- [Backend Prerequisites](#backend-prerequisites)
- [Backend Setup & Installation](#backend-setup--installation)
- [Migration and Database Initialization](#migration-and-database-initialization)
- [Application Availability](#application-availability)
- [Backend Project Directory Structure](#backend-project-directory-structure)
- [Backend Tests](#backend-tests)
- [Contribution](#contribution)


## Backend Prerequisites

Before running and intsalling the project's backend service, ensure you have the following installed.

| Binaries      | Version    |
| ------------- | ---------- |
| Node.js       | >= 18.9.1  |
| npm           | >= 9.2.0   |
| TypeScript    | >= 4.0.0   |
| Ngrok         | >= 3.8.0   |



## Backend Setup & Installation

1. Clone the repository:

```bash

    git clone https://github.com/james-mumo/PenWise-Journaling-App

    cd backend
```

2. Install dependencies:

```bash
    npm install
```

3. Configure Environment Variables:

    -   In the root directory of your project, create a file named .env & add the following variables:

```bash
    # Backend server port
    PORT=""

    # (can be generated securely using crypto.randomBytes(64).toString('hex'))
    JWT_ACCESS_SECRET=""
    JWT_REFRESH_SECRET=""

    # PostgreSQL connection URL
    DATABASE_URL=postgres://postgres:123456@localhost:5432/penwise

```


3. Migration and Database Initialization

```bash 
    - Run the SQL script named {init.sql} to initialize the schema and seed any default
     data you might need

    - Ensure the PostgreSQL service is up and running.

```


## Application Availability

```bash
    The application will be available at http://localhost:${PORT}.

    To ensure the backend url is exposed, secure and able to be run through the Expo-Go on
    IOS or Android:

    - Expose the backend url with the following command using {Ngrok}
        
```

```bash
    ngrok http http://localhost:${PORT}
```


## Backend Project Directory Structure

The backend project is organized into several folders and files, each serving a specific purpose. Below is the file tree representation of the project:

```bash

backend/
├── config/
│   └── database.ts
├── controllers/
│   ├── authController.ts
│   ├── categoryController.ts
│   └── journalEntryController.ts
├── dist/
│   ├── config/
│   ├── controllers/
│   ├── index.js
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── types/
│   └── utils/
├── middlewares/
│   └── authMiddleware.ts
├── models/
│   ├── Category.ts
│   ├── JournalEntry.ts
│   └── User.ts
├── routes/
│   ├── auth.ts
│   ├── categoryRoutes.ts
│   └── journalEntryRoutes.ts
│── types/
│    └── index.ts
├── README.md
├── index.ts
├── package-lock.json
├── tsconfig.json
├── env.example
├── init.sql
└── package.json


```


## Backend Tests
```bash
    # for eslint testing run
    npm run lint


    # for jest testing
    npm test

```



## Contribution

    ```bash

        Feel free to submit issues, fork the repository, and send pull requests!
        This project is a take-home assignment that I am working on independently.
        However, if you are interested in the application, you are welcome to fork
        the repository and contribute to making it better as per your wish.

    ```

