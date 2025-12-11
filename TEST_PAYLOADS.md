# API Test Payloads

Here are the JSON request bodies and `curl` commands to test the API endpoints.

## Authentication

### Register
**POST** `/api/auth/register`

```json
{
  "email": "admin@example.com",
  "password": "securepassword123",
  "organization": "TechCorp"
}
```

**Curl:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "securepassword123", "organization": "TechCorp"}'
```

### Login
**POST** `/api/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "securepassword123",
  "organization": "TechCorp"
}
```

**Curl:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "securepassword123", "organization": "TechCorp"}'
```

> **Note:** Copy the `token` from the login response for subsequent requests.

## User Management
**Headers:** `Authorization: Bearer <YOUR_TOKEN>`

### Create User (Admin Only)
**POST** `/api/users`

```json
{
  "email": "employee@example.com",
  "password": "employee123",
  "role": "user"
}
```

**Curl:**
```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"email": "employee@example.com", "password": "employee123", "role": "user"}'
```

### Update User
**PUT** `/api/users/<USER_ID>`

```json
{
  "role": "manager"
}
```

**Curl:**
```bash
curl -X PUT http://localhost:4000/api/users/<USER_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"role": "manager"}'
```

## API Keys
**Headers:** `Authorization: Bearer <YOUR_TOKEN>`

### Generate Key
**POST** `/api/apikeys`

**Curl:**
```bash
curl -X POST http://localhost:4000/api/apikeys \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Rotate Key
**POST** `/api/apikeys/rotate/<KEY_ID>`

**Curl:**
```bash
curl -X POST http://localhost:4000/api/apikeys/rotate/<KEY_ID> \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Revoke Key
**POST** `/api/apikeys/revoke/<KEY_ID>`

**Curl:**
```bash
curl -X POST http://localhost:4000/api/apikeys/revoke/<KEY_ID> \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

## Audit Logs (Admin Only)
**Headers:** `Authorization: Bearer <YOUR_TOKEN>`

### Query Logs
**GET** `/api/audit?type=login&success=true`

**Curl:**
```bash
curl -X GET "http://localhost:4000/api/audit?type=login&success=true" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```
