# Multi-Tenant Auth API

A robust multi-tenant authentication system built with Express.js and Mongoose. Features JWT authentication, Role-Based Access Control (RBAC), API Key management, and Audit logging.

## Features

- **Multi-tenancy**: Data isolation by Organization.
- **Authentication**: JWT-based auth with secure password hashing (bcrypt).
- **Authorization**: Role-based access control (User, Manager, Admin).
- **API Keys**: Generate, rotate, and revoke API keys for programmatic access.
- **Audit Logging**: Comprehensive logging of security events (login, register, API key usage).

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd multitenant-auth
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` with your configuration (see below).

## Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Port to run the server on | `4000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/multitenant` |
| `JWT_SECRET` | Secret key for signing JWTs | `replace_this_in_prod` |
| `JWT_EXPIRES_IN` | JWT expiration time | `1h` |

## Running the Application

### Development Mode
Runs the server with `nodemon` for hot-reloading.
```bash
npm run dev
```

### Production Mode
Runs the server using `node`.
```bash
npm start
```

## Running Tests

Currently, no automated tests are implemented. To run the test script (placeholder):
```bash
npm test
```

## API Usage Guide

### Authentication

#### Register
Create a new user and organization (if it doesn't exist).

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "organization": "MyOrg"
    }
    ```

#### Login
Authenticate and receive a JWT.

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "organization": "MyOrg"
    }
    ```
- **Response**:
    ```json
    {
      "token": "eyJhbG...",
      "user": { ... }
    }
    ```

### User Management

**Headers**: Requires `Authorization: Bearer <token>`

#### List Users
Retrieve all users in the organization.

- **URL**: `/api/users`
- **Method**: `GET`
- **Query Params**: None

#### Get User
Retrieve a specific user by ID.

- **URL**: `/api/users/:id`
- **Method**: `GET`

#### Create User
Create a new user in the organization (Admin only).

- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "email": "newuser@example.com",
      "password": "password123",
      "role": "user"
    }
    ```

#### Update User
Update a user's details (Admin/Manager).

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Body**:
    ```json
    {
      "role": "manager"
    }
    ```

#### Delete User
Remove a user from the organization (Admin only).

- **URL**: `/api/users/:id`
- **Method**: `DELETE`

### API Keys

**Headers**: Requires `Authorization: Bearer <token>`

#### Generate Key
Generate a new API key for the current organization.

- **URL**: `/api/apikeys`
- **Method**: `POST`
- **Response**:
    ```json
    {
      "apiKeyId": "...",
      "apiKey": "plain_text_key_shown_once"
    }
    ```

#### Rotate Key
Revoke an existing key and generate a new one.

- **URL**: `/api/apikeys/rotate/:id`
- **Method**: `POST`

#### Revoke Key
Revoke an API key.

- **URL**: `/api/apikeys/revoke/:id`
- **Method**: `POST`

### Audit Logs

**Headers**: Requires `Authorization: Bearer <token>` (Admin only)

#### Query Logs
Retrieve audit logs for the organization.

- **URL**: `/api/audit`
- **Method**: `GET`
- **Query Params**:
    - `type`: Filter by event type (e.g., `login`, `apikey.use`)
    - `success`: Filter by success status (`true`/`false`)
