## User Authentication

### 1. Register User

- **HTTP Method:** POST
- **URL:** `/api/auth/register`
- **Description:** Creates a new user account.
- **Request Body:**
  
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```

- **Response:**

    ```json
    {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
        "username": "string",
        "email": "string"
    }
    }
    ```

### 2. Login User
- **HTTP Method:** POST
- **URL:** `/api/auth/login`
- **Description:** Logs in an existing user.
- **Request Body:**

    ```json
    {
    "email": "string",
    "password": "string"
    }

    ```

- **Response:**

    ```json
    {
    "accessToken": "string",
    "refreshToken": "string"
    }
    ```

### 3. Refresh Token
- **HTTP Method:** POST
- **URL:** `/api/auth/token`
- **Description:** Refreshes the access token using a valid refresh token.
- **Request Body:**

    ```json
    {
    "token": "string"
    }
    ```

- **Response:**

    ```json
    {
    "accessToken": "string"
    }
    ```

### 4. Get User Details
- **HTTP Method:** GET
- **URL:** `/api/auth/me`
- **Description:** Retrieves details of the authenticated user.

- **Response:**

    ```json
    {
    "username": "string",
    "email": "string"
    }
    ```

### 5. Update User Details
- **HTTP Method:** PUT
- **URL:** `/api/auth/update`
- **Description:** Updates user details such as email, username, or password.
- **Request Body:**

    ```json
    {
    "currentPassword": "string",
    "newPassword": "string",
    "email": "string",
    "username": "string"
    }
    ```

- **Response:**

    ```json
    {
    "accessToken": "string",
    "refreshToken": "string"
    }
    ```

## Categories

### 1. Create Category

- **HTTP Method:** POST
- **URL:** `/api/category-entries`
- **Description:** Creates a new category for organizing journal entries.
- **Request Body:**

    ```json
    {
    "name": "string",
    "color": "string",
    "isEditable": true
    }
    ```

- **Response:**

    ```json
    {
    "name": "string",
    "color": "string",
    "isEditable": true,
    "userId": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```


### 2. Get All Categories

- **HTTP Method:** GET
- **URL:** `/api/category-entries`
- **Description:** Retrieves all categories for the authenticated user.


- **Response:**

    ```json
    [
    {
        "name": "string",
        "color": "string",
        "isEditable": true,
        "userId": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    ]
    ```

### 3. Get Category by ID
- **HTTP Method:** GET
- **URL:** `/api/category-entries/:id`
- **Description:** Retrieves a specific category by ID.


- **Response:**

    ```json
    {
    "name": "string",
    "color": "string",
    "isEditable": true,
    "userId": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```

### 4. Update Category

- **HTTP Method:** PUT
- **URL:** `/api/category-entries/:id`
- **Description:** Updates a category's name, color, and editability by ID.
- **Request Body:**

    ```json
    {
    "name": "string",
    "color": "string",
    "isEditable": true
    }
    ```

- **Response:**

    ```json
    {
    "name": "string",
    "color": "string",
    "isEditable": true,
    "userId": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```

### 5. Delete Category
- **HTTP Method:** DELETE
- **URL:** `/api/category-entries/:id`
- **Description:** Deletes a category by ID.
- **Parameters:** `id` (integer): ID of the category to delete.

- **Response:**

    ```json
    {
      "message": "Category deleted successfully"
     }
    ```


## Journal Entries

### 1. Create Journal Entry
- **HTTP Method:** POST
- **URL:** `/api/journal-entries`
- **Description:** Creates a new journal entry.
- **Request Body:**

    ```json
    {
    "title": "string",
    "content": "string",
    "category_id": "string",
    "date": "string"
    }
    ```

- **Response:**

    ```json
    {
    "title": "string",
    "content": "string",
    "categoryId": "string",
    "userId": "string",
    "date": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```

### 2. Get All Journal Entries
- **HTTP Method:** GET
- **URL:** `/api/journal-entries`
- **Description:** Retrieves all journal entries for the authenticated user.


- **Response:**

    ```json
    [
    {
        "title": "string",
        "content": "string",
        "categoryId": "string",
        "userId": "string",
        "date": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ]
    ```


### 3. Get Journal Entry by ID
- **HTTP Method:** GET
- **URL:** `/api/journal-entries/:id`
- **Description:** Retrieves a specific journal entry by ID.

- **Response:**

    ```json
    {
    "title": "string",
    "content": "string",
    "categoryId": "string",
    "userId": "string",
    "date": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```

### 4. Update Journal Entry
- **HTTP Method:** PUT
- **URL:** `/api/journal-entries/:id`
- **Description:** Updates a journal entry by ID.
- **Request Body:**

    ```json
    {
    "title": "string",
    "content": "string",
    "categoryId": "string",
    "date": "string"
    }
    ```

- **Response:**

    ```json
    {
    "title": "string",
    "content": "string",
    "categoryId": "string",
    "userId": "string",
    "date": "string",
    "createdAt": "string",
    "updatedAt": "string"
    }
    ```
### 5. Delete Journal Entry
- **HTTP Method:** DELETE
- **URL:** `/api/journal-entries/:id`
- **Description:** Deletes a journal entry by ID.
- **Parameters:**:id (integer): ID of the journal entry to delete.

- **Response:**
    ```json
    {
    "message": "Journal entry item deleted successfully"
    }   
    ```


