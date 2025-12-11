# API Routes - Pet Health Tracker

## 📋 Listado de Endpoints

### Autenticación

- 🔵 **POST /api/auth/register** - Registrar nuevo usuario
- 🔵 **POST /api/auth/login** - Iniciar sesión de usuario
- 🔵 **POST /api/auth/logout** - Cerrar sesión de usuario
- 🔵 **POST /api/auth/forgot-password** - Solicitar recuperación de contraseña
- 🟠 **PUT /api/auth/reset-password** - Restablecer contraseña con token
- 🟢 **GET /api/auth/currentUser** - Obtener usuario autenticado actual

### Mascotas

- 🔵 **POST /api/pets** - Crear una nueva mascota
- 🟢 **GET /api/pets** - Listar todas las mascotas del usuario
- 🟢 **GET /api/pets/:id** - Obtener mascota específica por ID
- 🟠 **PUT /api/pets** - Actualizar información de mascota
- 🔴 **DELETE /api/pets/:id** - Eliminar mascota por ID

### Eventos

- 🔵 **POST /api/pets/:id/events** - Crear evento para una mascota específica
- 🟢 **GET /api/pets/:id/events** - Listar eventos de una mascota específica

### Recordatorios

- 🔵 **POST /api/reminders** - Crear recordatorio para un evento
- 🟢 **GET /api/reminders/:eventId** - Listar recordatorios de un evento específico
- 🔴 **DELETE /api/reminders/:id** - Eliminar recordatorio específico por ID
- 🔴 **DELETE /api/reminders/event/:eventId** - Eliminar todos los recordatorios de un evento

### Documentación

- 🟢 **GET /api/doc** - Documentación Swagger de la API

---

## 📝 Detalles de Endpoints

### Autenticación

#### 🔵 POST /api/auth/register

**Descripción:** Registra un nuevo usuario en el sistema.

**Request Headers:**

```
Content-Type: application/json
Accept: application/json
```

**Request Body:**

```json
{
  "email": "r.guzmanap@gmail.com",
  "password": "contrasena123"
}
```

**Campos del Request:**

- `email` (string, requerido): Email válido del usuario
- `password` (string, requerido): Contraseña del usuario (mínimo 6 caracteres)

**Responses:**

**✅ 201 Created** - Usuario registrado exitosamente

```
Status: 201 Created
Content-Type: text/html; charset=utf-8
```

```text
User registered.
```

Nota: La respuesta es texto plano, no JSON.

**❌ 400 Bad Request** - Datos inválidos

```json
{
  "message": "Invalid email format"
}
```

o

```json
{
  "message": "User already exists"
}
```

**❌ 400 Bad Request** - Error de validación Zod

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "email": ["Invalid email address"]
    }
  }
}
```

o múltiples errores:

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "email": ["Invalid email address"],
      "password": ["Too small: expected string to have >=6 characters"]
    }
  }
}
```

---

#### 🔵 POST /api/auth/login

**Descripción:** Inicia sesión y retorna los datos del usuario con token en cookie.

**Request Headers:**

```
Content-Type: application/json
Accept: application/json
```

**Request Body:**

```json
{
  "email": "r.guzmanap@gmail.com",
  "password": "123456"
}
```

**Campos del Request:**

- `email` (string, requerido): Email del usuario registrado
- `password` (string, requerido): Contraseña del usuario

**Responses:**

**✅ 200 OK** - Sesión iniciada exitosamente

```
Status: 200 OK
Content-Type: application/json
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Lax; Max-Age=86400
```

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "r.guzmanap@gmail.com",
  "createdAt": "2025-12-11T03:07:45.685Z",
  "updatedAt": "2025-12-11T03:07:45.685Z"
}
```

**Campos de la Response:**

- `id` (string): UUID del usuario
- `email` (string): Email del usuario
- `createdAt` (string): Fecha de creación de la cuenta
- `updatedAt` (string): Fecha de última actualización

**Cookie configurada:**

- `token`: JWT token
- `HttpOnly`: true (no accesible desde JavaScript)
- `Secure`: true (solo en producción)
- `SameSite`: "none" en producción, "lax" en desarrollo
- `Max-Age`: 86400 segundos (24 horas)

**❌ 404 Not Found** - Usuario no encontrado o contraseña incorrecta

```json
{
  "message": "User not found."
}
```

o

```json
{
  "message": "Incorrect password."
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**Notas:**

- El token se almacena en una cookie HttpOnly
- Rate limiting progresivo aplicado
- El token expira en 24 horas

---

#### 🔵 POST /api/auth/logout

**Descripción:** Cierra la sesión del usuario eliminando la cookie del token.

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Responses:**

**✅ 200 OK** - Sesión cerrada exitosamente

```
Status: 200 OK
Content-Type: application/json
Set-Cookie: token=; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT
```

```json
{
  "message": "Logged out"
}
```

**❌ 500 Internal Server Error** - Error al cerrar sesión

```json
{
  "message": "Internal server error"
}
```

---

#### 🔵 POST /api/auth/forgot-password

**Descripción:** Envía un correo electrónico con token para recuperar contraseña.

**Request Headers:**

```
Content-Type: application/json
Accept: application/json
```

**Request Body:**

```json
{
  "email": "r.guzmanap@gmail.com"
}
```

**Campos del Request:**

- `email` (string, requerido): Email del usuario registrado

**Responses:**

**✅ 200 OK** - Correo enviado exitosamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Recovery password email sent to r.guzmanap@gmail.com"
}
```

**❌ 400 Bad Request** - Error de validación

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "email": ["Invalid email address"]
    }
  }
}
```

**❌ 404 Not Found** - Usuario no encontrado

```json
{
  "message": "User not found"
}
```

**Notas:**

- El token en el email expira después de un tiempo determinado
- El email contiene un enlace con el token para resetear la contraseña

---

#### 🟠 PUT /api/auth/reset-password

**Descripción:** Restablece la contraseña usando el token recibido por correo.

**Request Headers:**

```
Content-Type: application/json
Accept: application/json
```

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImV4cGlyZXMiOnRydWUsImlhdCI6MTczMzkyNDQwMCwiZXhwIjoxNzMzOTI4MDAwfQ.signature",
  "newPassword": "nuevaContraseña123"
}
```

**Campos del Request:**

- `token` (string, requerido): Token JWT recibido por email
- `newPassword` (string, requerido): Nueva contraseña (mínimo 6 caracteres)

**Responses:**

**✅ 200 OK** - Contraseña actualizada exitosamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Password updated"
}
```

**❌ 400 Bad Request** - Error de validación

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "newPassword": ["Too small: expected string to have >=6 characters"]
    }
  }
}
```

o si falta el token:

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "token": ["Invalid input: expected string, received undefined"]
    }
  }
}
```

**❌ 401 Unauthorized** - Token inválido o expirado

```json
{
  "message": "Invalid or expired token"
}
```

**❌ 404 Not Found** - Usuario no encontrado

```json
{
  "message": "User not found"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**Notas:**

- Rate limiting progresivo aplicado
- El token tiene una expiración limitada

---

#### 🟢 GET /api/auth/currentUser

**Descripción:** Obtiene la información del usuario autenticado actualmente.

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

```
(ninguno)
```

**Request Body:**

```
(vacío)
```

**Responses:**

**✅ 200 OK** - Usuario encontrado

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "r.guzmanap@gmail.com",
  "iat": 1733924400,
  "exp": 1734010800
}
```

**Campos de la Response:**

- `id` (string): UUID del usuario
- `email` (string): Email del usuario
- `iat` (number): Timestamp de cuando se emitió el token
- `exp` (number): Timestamp de cuando expira el token

**❌ 401 Unauthorized** - No hay token

```
Status: 401 Unauthorized
Content-Type: application/json
```

```json
{
  "message": "No token"
}
```

**❌ 401 Unauthorized** - Token inválido o expirado

```json
{
  "message": "Invalid token"
}
```

o

```json
{
  "message": "Token expired"
}
```

---

### Mascotas

**Nota:** Todos los endpoints de mascotas requieren autenticación (token en cookie) y tienen rate limiting.

#### 🔵 POST /api/pets

**Descripción:** Crea una nueva mascota asociada al usuario autenticado.

**Request Headers:**

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body (multipart/form-data):**

```
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

Firulais
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="species"

Perro
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="breed"

Labrador
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="age"

3
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="weight"

25.5
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="photoUrl"; filename="firulais.jpg"
Content-Type: image/jpeg

<binary data>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Campos del Request:**

- `name` (string, requerido): Nombre de la mascota
- `species` (string, requerido): Especie (ej: "Perro", "Gato")
- `breed` (string, requerido): Raza
- `age` (number, requerido): Edad en años
- `weight` (number, requerido): Peso en kilogramos
- `photoUrl` (file, requerido): Archivo de imagen (JPEG, PNG, GIF, WebP)

**Responses:**

**✅ 201 Created** - Mascota creada exitosamente

```
Status: 201 Created
Content-Type: application/json
```

```json
{
  "message": "Su mascota fue registrada con exito.",
  "data": {
    "id": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Firulais",
    "species": "Perro",
    "breed": "Labrador",
    "age": 3,
    "weight": 25.5,
    "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733924400/pets/firulais_abc123.jpg",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  }
}
```

**❌ 400 Bad Request** - Nombre duplicado

```json
{
  "message": "Ya tienes una mascota registrada con ese nombre."
}
```

**❌ 400 Bad Request** - Error de validación

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "age": ["Expected number, received string"]
    }
  }
}
```

o si faltan múltiples campos:

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "name": ["Invalid input: expected string, received undefined"],
      "species": ["Invalid input: expected string, received undefined"],
      "age": ["Expected number, received string"]
    }
  }
}
```

**❌ 400 Bad Request** - Archivo de imagen inválido

```json
{
  "message": "Invalid image file format. Only JPEG, PNG, GIF, WebP are allowed."
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 413 Payload Too Large** - Archivo demasiado grande

```json
{
  "message": "File size exceeds the limit"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**Notas:**

- La imagen se sube a Cloudinary automáticamente
- El nombre debe ser único por usuario
- Tamaño máximo de archivo: generalmente 10MB
- Formatos soportados: JPEG, PNG, GIF, WebP
- Rate limiting aplicado

---

#### 🟢 GET /api/pets

**Descripción:** Lista todas las mascotas del usuario autenticado.

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

```
(ninguno)
```

**Request Body:**

```
(vacío)
```

**Responses:**

**✅ 200 OK** - Lista de mascotas encontradas

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Listado de mascotas encontradas",
  "data": [
    {
      "id": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Firulais",
      "species": "Perro",
      "breed": "Labrador",
      "age": 3,
      "weight": 25.5,
      "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733924400/pets/firulais_abc123.jpg",
      "createdAt": "2025-12-11T10:00:00.000Z",
      "updatedAt": "2025-12-11T10:00:00.000Z"
    },
    {
      "id": "b4e6c3d2-8e7f-5a9b-c8d4-2f3e4a5b6c7d",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Michi",
      "species": "Gato",
      "breed": "Siamés",
      "age": 2,
      "weight": 4.5,
      "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733837800/pets/michi_def456.jpg",
      "createdAt": "2025-12-10T15:30:00.000Z",
      "updatedAt": "2025-12-10T15:30:00.000Z"
    }
  ]
}
```

**Campos de cada mascota:**

- `id` (string): UUID de la mascota
- `userId` (string): UUID del propietario
- `name` (string): Nombre de la mascota
- `species` (string): Especie
- `breed` (string): Raza
- `age` (number): Edad en años
- `weight` (number): Peso en kilogramos
- `photoUrl` (string): URL de la foto en Cloudinary
- `createdAt` (string): Fecha de creación ISO 8601
- `updatedAt` (string): Fecha de última actualización ISO 8601

**❌ 400 Bad Request** - Sin mascotas registradas

```json
{
  "message": "No tiene mascotas registradas"
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

---

#### 🟢 GET /api/pets/:id

**Descripción:** Obtiene información de una mascota específica por su ID.

**Parámetros de URL:**

- `id` (string, requerido): UUID de la mascota

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c
```

**Responses:**

**✅ 200 OK** - Mascota encontrada

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Mascota Encontrada con exito",
  "data": {
    "id": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Firulais",
    "species": "Perro",
    "breed": "Labrador",
    "age": 3,
    "weight": 25.5,
    "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733924400/pets/firulais_abc123.jpg",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  }
}
```

**❌ 400 Bad Request** - Falta el parámetro id

```json
{
  "message": "Falta el parámetro id."
}
```

**❌ 404 Not Found** - Mascota no existe

```json
{
  "message": "La mascota no existe."
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

---

#### 🟠 PUT /api/pets

**Descripción:** Actualiza la información de una mascota existente.

**Request Headers:**

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `id` (string, requerido): UUID de la mascota a actualizar

**Request Body (multipart/form-data):**

```
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

Firulais Actualizado
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="species"

Perro
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="breed"

Labrador Retriever
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="age"

4
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="weight"

26.0
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="photoUrl"; filename="firulais_nuevo.jpg"
Content-Type: image/jpeg

<binary data>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Campos del Request:**

- `name` (string, requerido): Nombre actualizado
- `species` (string, requerido): Especie actualizada
- `breed` (string, requerido): Raza actualizada
- `age` (number, requerido): Edad actualizada
- `weight` (number, requerido): Peso actualizado
- `photoUrl` (file, opcional): Nueva imagen

**Ejemplo de Request:**

```
PUT /api/pets?id=a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c
```

**Responses:**

**✅ 200 OK** - Mascota actualizada correctamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Mascota actualizada correctamente",
  "data": {
    "id": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Firulais Actualizado",
    "species": "Perro",
    "breed": "Labrador Retriever",
    "age": 4,
    "weight": 26.0,
    "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733931600/pets/firulais_nuevo_xyz789.jpg",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T12:00:00.000Z"
  }
}
```

**❌ 400 Bad Request** - Falta parámetro o datos inválidos

```json
{
  "message": "No existe la mascota."
}
```

o

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "age": ["Expected number, received string"]
    }
  }
}
```

**❌ 404 Not Found** - Mascota no existe

```json
{
  "message": "La mascota no existe."
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 413 Payload Too Large** - Imagen demasiado grande

```json
{
  "message": "File size exceeds the limit"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**Notas:**

- Si se proporciona nueva imagen, se sube a Cloudinary y reemplaza la anterior
- Todos los campos son requeridos en el body
- El ID se pasa como query parameter
- Rate limiting aplicado

---

#### 🔴 DELETE /api/pets/:id

**Descripción:** Elimina una mascota y todos sus eventos y recordatorios asociados.

**Parámetros de URL:**

- `id` (string, requerido): UUID de la mascota

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
DELETE /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c
```

**Responses:**

**✅ 200 OK** - Mascota eliminada exitosamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Mascota Eliminada",
  "data": {
    "id": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Firulais",
    "species": "Perro",
    "breed": "Labrador",
    "age": 3,
    "weight": 25.5,
    "photoUrl": "https://res.cloudinary.com/demo/image/upload/v1733924400/pets/firulais_abc123.jpg",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  }
}
```

**❌ 400 Bad Request** - Falta el parámetro id

```json
{
  "message": "Falta el parámetro id."
}
```

**❌ 404 Not Found** - Mascota no existe o ya fue eliminada

```json
{
  "message": "La mascota no existe o ya fue eliminada."
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**❌ 500 Internal Server Error** - Error al eliminar

```json
{
  "message": "Error deleting pet"
}
```

**Notas:**

- **Eliminación en cascada**: todos los eventos y recordatorios asociados también se eliminan automáticamente
- La operación es irreversible
- Rate limiting aplicado

---

### Eventos

**Nota:** Todos los endpoints de eventos requieren autenticación y tienen rate limiting.

#### 🔵 POST /api/pets/:id/events

**Descripción:** Crea un nuevo evento para una mascota específica.

**Parámetros de URL:**

- `id` (string, requerido): UUID de la mascota

**Request Headers:**

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body (multipart/form-data):**

```
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="date"

2025-12-15T14:30:00.000Z
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

Vacuna antirrábica anual
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="type"

VACCINE
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="attachmentUrl"; filename="receta_veterinaria.pdf"
Content-Type: application/pdf

<binary data>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Campos del Request:**

- `date` (string, requerido): Fecha del evento en formato ISO 8601
- `description` (string, requerido): Descripción del evento
- `type` (string, requerido): Tipo de evento (ver valores válidos abajo)
- `attachmentUrl` (file, opcional): Documento adjunto (PDF, imagen, etc.)

**Tipos de eventos válidos:**

- `VET_VISIT`: Visita veterinaria
- `FEEDING`: Alimentación
- `VACCINE`: Vacunación

**Ejemplo de Request:**

```
POST /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events
```

**Responses:**

**✅ 201 Created** - Evento creado exitosamente

```
Status: 201 Created
Content-Type: application/json
```

```json
{
  "menssage": "Evento registrado con exito.",
  "data": {
    "id": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
    "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "type": "VACCINE",
    "description": "Vacuna antirrábica anual",
    "date": "2025-12-15T14:30:00.000Z",
    "attachmentUrl": "https://res.cloudinary.com/demo/raw/upload/v1733924400/events/receta_abc123.pdf",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  }
}
```

**❌ 400 Bad Request** - Falta el parámetro id

```json
{
  "message": "Falta el parámetro id"
}
```

**❌ 400 Bad Request** - Error de validación

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "type": ["Invalid enum value. Expected 'VET_VISIT' | 'FEEDING' | 'VACCINE', received 'INVALID_TYPE'"]
    }
  }
}
```

**❌ 400 Bad Request** - Fecha inválida

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "date": ["Invalid date"]
    }
  }
}
```

o múltiples errores (campos faltantes):

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "date": ["Invalid input: expected string, received undefined"],
      "description": ["Invalid input: expected string, received undefined"],
      "type": ["Invalid input: expected string, received undefined"]
    }
  }
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 404 Not Found** - Mascota no encontrada

```json
{
  "message": "Pet not found"
}
```

**❌ 413 Payload Too Large** - Archivo demasiado grande

```json
{
  "message": "File size exceeds the limit"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

**❌ 500 Internal Server Error** - Error al crear evento

```json
{
  "message": "Error creating event"
}
```

**Notas:**

- Los archivos adjuntos se suben a Cloudinary automáticamente
- El campo `attachmentUrl` es opcional
- Soporta documentos PDF, imágenes, etc.
- Rate limiting aplicado
- La fecha debe estar en formato ISO 8601

---

#### 🟢 GET /api/pets/:id/events

**Descripción:** Lista todos los eventos de una mascota específica, con filtrado opcional por tipo.

**Parámetros de URL:**

- `id` (string, requerido): UUID de la mascota

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `type` (string, opcional): Filtrar por tipo de evento
  - Valores permitidos: `VET_VISIT`, `FEEDING`, `VACCINE`

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events?type=VACCINE
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events?type=VET_VISIT
```

**Responses:**

**✅ 200 OK** - Lista de eventos encontrados

```
Status: 200 OK
Content-Type: application/json
```

**Sin filtro (todos los eventos):**

```json
{
  "menssage": "Eventos de su Mascota.",
  "data": [
    {
      "id": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
      "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
      "type": "VACCINE",
      "description": "Vacuna antirrábica anual",
      "date": "2025-12-15T14:30:00.000Z",
      "attachmentUrl": "https://res.cloudinary.com/demo/raw/upload/v1733924400/events/receta_abc123.pdf",
      "createdAt": "2025-12-11T10:00:00.000Z",
      "updatedAt": "2025-12-11T10:00:00.000Z"
    },
    {
      "id": "d6e8f0a2-4b6c-8d0e-2f4a-6b8c0d2e4f6a",
      "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
      "type": "VET_VISIT",
      "description": "Chequeo general",
      "date": "2025-12-01T09:00:00.000Z",
      "attachmentUrl": "",
      "createdAt": "2025-11-28T12:00:00.000Z",
      "updatedAt": "2025-11-28T12:00:00.000Z"
    },
    {
      "id": "e7f9a1b3-5c7d-9e1f-3a5b-7c9d1e3f5a7b",
      "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
      "type": "FEEDING",
      "description": "Cambio a alimento premium",
      "date": "2025-11-20T08:00:00.000Z",
      "attachmentUrl": "",
      "createdAt": "2025-11-20T08:00:00.000Z",
      "updatedAt": "2025-11-20T08:00:00.000Z"
    }
  ]
}
```

**Con filtro (type=VACCINE):**

```json
{
  "menssage": "Eventos de su Mascota.",
  "data": [
    {
      "id": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
      "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
      "type": "VACCINE",
      "description": "Vacuna antirrábica anual",
      "date": "2025-12-15T14:30:00.000Z",
      "attachmentUrl": "https://res.cloudinary.com/demo/raw/upload/v1733924400/events/receta_abc123.pdf",
      "createdAt": "2025-12-11T10:00:00.000Z",
      "updatedAt": "2025-12-11T10:00:00.000Z"
    }
  ]
}
```

**Campos de cada evento:**

- `id` (string): UUID del evento
- `petId` (string): UUID de la mascota
- `type` (string): Tipo de evento (VET_VISIT | FEEDING | VACCINE)
- `description` (string): Descripción del evento
- `date` (string): Fecha del evento en formato ISO 8601
- `attachmentUrl` (string): URL del documento adjunto (vacío si no hay)
- `createdAt` (string): Fecha de creación ISO 8601
- `updatedAt` (string): Fecha de última actualización ISO 8601

**❌ 400 Bad Request** - Falta el parámetro id

```json
{
  "message": "Falta el parámetro id"
}
```

**❌ 400 Bad Request** - Tipo de evento inválido

```json
{
  "message": "Invalid event type. Must be VET_VISIT, FEEDING, or VACCINE"
}
```

**❌ 404 Not Found** - No hay eventos registrados

```json
{
  "message": "No hay eventos registrados."
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 404 Not Found** - Mascota no encontrada

```json
{
  "message": "Pet not found"
}
```

**❌ 429 Too Many Requests** - Rate limit excedido

```json
{
  "message": "Too many requests, please try again later"
}
```

---

### Recordatorios

**Nota:** Todos los endpoints de recordatorios requieren autenticación.

#### 🔵 POST /api/reminders

**Descripción:** Crea un recordatorio para un evento específico y programa el envío de email.

**Request Headers:**

```
Content-Type: application/json
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
  "triggerTime": "2025-12-14T14:30:00.000Z",
  "message": "No olvides llevar a Firulais al veterinario mañana",
  "eventUrl": "https://app.ejemplo.com/events/c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f"
}
```

**Campos del Request:**

- `eventId` (string, requerido): UUID del evento
- `triggerTime` (string, requerido): Fecha y hora para enviar el recordatorio (formato ISO 8601)
- `message` (string, opcional): Mensaje personalizado del recordatorio
- `eventUrl` (string, opcional): URL del evento en la aplicación

**Responses:**

**✅ 201 Created** - Recordatorio creado y programado

```
Status: 201 Created
Content-Type: application/json
```

```json
{
  "id": "f8a0b2c4-6d8e-0a2c-4e6a-8c0d2e4f6a8b",
  "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
  "triggerTime": "2025-12-14T14:30:00.000Z",
  "status": "PENDING",
  "createdAt": "2025-12-11T10:00:00.000Z",
  "updatedAt": "2025-12-11T10:00:00.000Z",
  "event": {
    "id": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
    "petId": "a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c",
    "type": "VET_VISIT",
    "description": "Chequeo general",
    "date": "2025-12-15T14:30:00.000Z",
    "attachmentUrl": "",
    "createdAt": "2025-12-10T10:00:00.000Z",
    "updatedAt": "2025-12-10T10:00:00.000Z"
  }
}
```

**Campos de la Response:**

- `id` (string): UUID del recordatorio
- `eventId` (string): UUID del evento asociado
- `triggerTime` (string): Fecha/hora programada para el recordatorio
- `status` (string): Estado del recordatorio (PENDING | SENT | FAILED)
- `createdAt` (string): Fecha de creación
- `updatedAt` (string): Fecha de última actualización
- `event` (object): Objeto completo del evento asociado

**❌ 400 Bad Request** - Error de validación (falta eventId)

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "eventId": ["Invalid input: expected string, received undefined"]
    }
  }
}
```

o si está vacío:

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "eventId": ["String must contain at least 1 character(s)"]
    }
  }
}
```

**❌ 400 Bad Request** - Fecha inválida

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "triggerTime": ["Invalid date"]
    }
  }
}
```

o múltiples errores (campos faltantes):

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "eventId": ["Invalid input: expected string, received undefined"],
      "triggerTime": ["Invalid input: expected string, received undefined"]
    }
  }
}
```

**❌ 400 Bad Request** - triggerTime en el pasado

```json
{
  "message": "triggerTime must be in the future"
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 404 Not Found** - Evento no encontrado

```json
{
  "message": "Event not found"
}
```

**❌ 500 Internal Server Error** - Error al programar email

```json
{
  "message": "Error scheduling reminder email"
}
```

**Notas:**

- El email se programa automáticamente para enviarse en `triggerTime`
- El recordatorio debe estar en el futuro
- El asunto del email se genera según el tipo de evento:
  - `VET_VISIT`: "Recordatorio de visita veterinaria"
  - `FEEDING`: "Recordatorio de alimentación"
  - `VACCINE`: "Recordatorio de vacunación"
- El email contiene: mensaje personalizado, fecha del evento, y URL del evento (si se proporcionó)

---

#### 🟢 GET /api/reminders/:eventId

**Descripción:** Lista todos los recordatorios de un evento específico.

**Parámetros de URL:**

- `eventId` (string, requerido): UUID del evento

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
GET /api/reminders/c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f
```

**Responses:**

**✅ 200 OK** - Lista de recordatorios

```
Status: 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": "f8a0b2c4-6d8e-0a2c-4e6a-8c0d2e4f6a8b",
    "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
    "triggerTime": "2025-12-14T14:30:00.000Z",
    "status": "PENDING",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  },
  {
    "id": "a1b3c5d7-9e1f-3a5b-7c9d-1e3f5a7b9c1d",
    "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
    "triggerTime": "2025-12-13T09:00:00.000Z",
    "status": "SENT",
    "createdAt": "2025-12-10T15:00:00.000Z",
    "updatedAt": "2025-12-13T09:00:05.000Z"
  },
  {
    "id": "b2c4d6e8-0f2a-4b6c-8d0e-2f4a6b8c0d2e",
    "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
    "triggerTime": "2025-12-12T20:00:00.000Z",
    "status": "FAILED",
    "createdAt": "2025-12-10T10:00:00.000Z",
    "updatedAt": "2025-12-12T20:00:10.000Z"
  }
]
```

**Campos de cada recordatorio:**

- `id` (string): UUID del recordatorio
- `eventId` (string): UUID del evento
- `triggerTime` (string): Fecha/hora programada ISO 8601
- `status` (string): Estado del recordatorio
  - `PENDING`: Pendiente de envío
  - `SENT`: Enviado exitosamente
  - `FAILED`: Falló el envío
- `createdAt` (string): Fecha de creación
- `updatedAt` (string): Fecha de última actualización

**✅ 200 OK** - Sin recordatorios (array vacío)

```json
[]
```

**Nota:** Si el evento no tiene recordatorios, devuelve un array vacío (no es un error).

**❌ 400 Bad Request** - eventId es requerido

```json
{
  "message": "eventId is required"
}
```

**❌ 400 Bad Request** - eventId inválido (formato incorrecto)

```json
{
  "message": "Invalid UUID format"
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**Nota:** Este endpoint NO devuelve 404 si el evento no existe; simplemente devuelve un array vacío `[]`.

---

#### 🔴 DELETE /api/reminders/:id

**Descripción:** Elimina un recordatorio específico por su ID y cancela el email programado.

**Parámetros de URL:**

- `id` (string, requerido): UUID del recordatorio

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
DELETE /api/reminders/f8a0b2c4-6d8e-0a2c-4e6a-8c0d2e4f6a8b
```

**Responses:**

**✅ 200 OK** - Recordatorio eliminado exitosamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Reminder deleted successfully"
}
```

**❌ 400 Bad Request** - id es requerido

```json
{
  "message": "id is required"
}
```

**❌ 400 Bad Request** - UUID inválido

```json
{
  "message": "Invalid UUID format"
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 404 Not Found** - Recordatorio no encontrado

```json
{
  "message": "Reminder not found"
}
```

**❌ 500 Internal Server Error** - Error al eliminar

```json
{
  "message": "Error deleting reminder"
}
```

**Notas:**

- Si el recordatorio estaba programado (status PENDING), se cancela el email automáticamente
- Los recordatorios ya enviados (status SENT) pueden eliminarse del registro

---

#### 🔴 DELETE /api/reminders/event/:eventId

**Descripción:** Elimina todos los recordatorios asociados a un evento específico y cancela todos los emails programados.

**Parámetros de URL:**

- `eventId` (string, requerido): UUID del evento

**Request Headers:**

```
Accept: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```
(vacío)
```

**Ejemplo de Request:**

```
DELETE /api/reminders/event/c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f
```

**Responses:**

**✅ 200 OK** - Recordatorios eliminados exitosamente

```
Status: 200 OK
Content-Type: application/json
```

```json
{
  "message": "Event's reminders deleted successfully"
}
```

**❌ 400 Bad Request** - eventId es requerido

```json
{
  "message": "eventId is required"
}
```

**❌ 400 Bad Request** - UUID inválido

```json
{
  "message": "Invalid UUID format"
}
```

**❌ 401 Unauthorized** - No autenticado

```json
{
  "message": "Unauthorized"
}
```

**❌ 404 Not Found** - Evento no encontrado

```json
{
  "message": "Event not found"
}
```

**❌ 500 Internal Server Error** - Error al eliminar

```json
{
  "message": "Error deleting event reminders"
}
```

**Notas:**

- Elimina **todos** los recordatorios asociados al evento
- Cancela todos los emails programados pendientes (status PENDING)
- Útil cuando se elimina un evento y se quieren limpiar sus recordatorios
- Si no hay recordatorios asociados, retorna 200 OK igual

---

### Documentación

#### 🟢 GET /api/doc

**Descripción:** Interfaz Swagger UI para explorar y probar la API interactivamente.

**Request Headers:**

```
Accept: text/html
```

**Request Body:**

```
(vacío)
```

**Query Parameters:**

```
(ninguno)
```

**Responses:**

**✅ 200 OK** - Página HTML con documentación Swagger

```
Status: 200 OK
Content-Type: text/html; charset=utf-8
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Pet Health Tracker API - Swagger UI</title>
    ...
  </head>
  <body>
    <!-- Swagger UI Interface -->
  </body>
</html>
```

**Notas:**

- Proporciona interfaz interactiva para probar los endpoints
- Incluye esquemas de request/response completos
- Permite autenticación (cookies automáticas o Bearer token)
- Documentación generada desde OpenAPI/Swagger specs
- No requiere autenticación para ver la documentación

---

## 🔐 Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT almacenado en cookie HttpOnly.

**Flujo de autenticación:**

1. **Registro**: `POST /api/auth/register` con email y password
2. **Login**: `POST /api/auth/login` con credenciales
3. El servidor genera un JWT y lo almacena en una cookie HttpOnly llamada `token`
4. El navegador envía automáticamente esta cookie en todos los requests subsecuentes
5. **Logout**: `POST /api/auth/logout` para limpiar la cookie

**Estructura del JWT Token:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "r.guzmanap@gmail.com",
  "iat": 1733924400,
  "exp": 1734010800
}
```

**Configuración de Cookie:**

```
Set-Cookie: token=<jwt-token>; HttpOnly; Secure; SameSite=None; Max-Age=86400; Path=/
```

**Atributos de la cookie:**

- `HttpOnly`: true - No accesible desde JavaScript (previene XSS)
- `Secure`: true en producción - Solo HTTPS
- `SameSite`: "none" en producción, "lax" en desarrollo
- `Max-Age`: 86400 segundos (24 horas)
- `Path`: / - Disponible en toda la aplicación

**Headers de autenticación en requests:**

```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoidXN1YXJpb0BlamVtcGxvLmNvbSIsImlhdCI6MTczMzkyNDQwMCwiZXhwIjoxNzM0MDEwODAwfQ.signature
```

**Respuestas de error de autenticación:**

**401 Unauthorized - Sin token:**

```json
{
  "message": "No token"
}
```

**401 Unauthorized - Token inválido:**

```json
{
  "message": "Invalid token"
}
```

**401 Unauthorized - Token expirado:**

```json
{
  "message": "Token expired"
}
```

**Endpoints públicos (no requieren autenticación):**

- 🔵 POST /api/auth/register
- 🔵 POST /api/auth/login
- 🔵 POST /api/auth/forgot-password
- 🟠 PUT /api/auth/reset-password
- 🟢 GET /api/doc

**Endpoints protegidos (requieren autenticación):**

- 🟢 GET /api/auth/currentUser
- 🔵 POST /api/auth/logout
- Todos los endpoints de `/api/pets` (5 endpoints)
- Todos los endpoints de `/api/pets/:id/events` (2 endpoints)
- Todos los endpoints de `/api/reminders` (4 endpoints)

**Total:** 6 públicos, 12 protegidos

---

## ⚡ Rate Limiting

Los siguientes endpoints tienen **rate limiting progresivo** para prevenir abuso y ataques de fuerza bruta.

**Endpoints con Rate Limiting:**

**Alta restricción (autenticación crítica):**

- 🔵 POST /api/auth/login
- 🟠 PUT /api/auth/reset-password

**Restricción moderada:**

- 🔵 POST /api/pets
- 🟢 GET /api/pets
- 🟢 GET /api/pets/:id
- 🟠 PUT /api/pets
- 🔴 DELETE /api/pets/:id
- 🔵 POST /api/pets/:id/events
- 🟢 GET /api/pets/:id/events

**Configuración típica:**

- **Límite inicial**: 5-10 requests por minuto
- **Progresivo**: Si se excede, aumenta el tiempo de espera exponencialmente
- **Identificación**: Por IP y/o usuario autenticado

**Response cuando se excede el límite:**

```
Status: 429 Too Many Requests
Content-Type: application/json
Retry-After: 60
```

```json
{
  "message": "Too many requests, please try again later"
}
```

**Headers de respuesta:**

```
Retry-After: 60
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1733924460
```

**Nota:** Los endpoints de recordatorios (`/api/reminders`) NO tienen rate limiting aplicado explícitamente según el código.

---

## 📤 Formatos de Upload

Todos los archivos se suben mediante `multipart/form-data` y se almacenan en **Cloudinary**.

### Imágenes de mascotas

**Endpoints:**

- 🔵 POST /api/pets
- 🟠 PUT /api/pets

**Configuración:**

- **Campo**: `photoUrl`
- **Content-Type**: `multipart/form-data`
- **Formatos soportados**: JPEG, JPG, PNG, GIF, WebP
- **Tamaño máximo**: ~10 MB (configurable)
- **Procesamiento**: Upload automático a Cloudinary
- **Response**: URL completa de Cloudinary

**Ejemplo de campo en multipart:**

```
Content-Disposition: form-data; name="photoUrl"; filename="mi-mascota.jpg"
Content-Type: image/jpeg

<binary data>
```

**URL resultante:**

```
https://res.cloudinary.com/demo/image/upload/v1733924400/pets/firulais_abc123.jpg
```

**Errores comunes:**

```json
{
  "message": "Invalid image file format. Only JPEG, PNG, GIF, WebP are allowed."
}
```

```json
{
  "message": "File size exceeds the limit"
}
```

### Documentos adjuntos de eventos

**Endpoint:**

- 🔵 POST /api/pets/:id/events

**Configuración:**

- **Campo**: `attachmentUrl` (opcional)
- **Content-Type**: `multipart/form-data`
- **Formatos soportados**: PDF, imágenes (JPEG, PNG, GIF, WebP), documentos
- **Tamaño máximo**: ~10 MB (configurable)
- **Procesamiento**: Upload automático a Cloudinary
- **Response**: URL completa de Cloudinary

**Ejemplo de campo en multipart:**

```
Content-Disposition: form-data; name="attachmentUrl"; filename="receta_veterinaria.pdf"
Content-Type: application/pdf

<binary data>
```

**URL resultante:**

```
https://res.cloudinary.com/demo/raw/upload/v1733924400/events/receta_abc123.pdf
```

**Nota:** Si no se proporciona archivo, el campo `attachmentUrl` quedará como string vacío `""`.

---

## 🌐 Base URL

```
Desarrollo local: http://localhost:3000
Producción: https://api.ejemplo.com (configurar según despliegue)
```

**Puerto por defecto:** 3000 (configurable via `PORT` en `.env`)

**Ejemplo de URL completa:**

```
http://localhost:3000/api/pets
http://localhost:3000/api/auth/login
```

## 🔄 CORS (Cross-Origin Resource Sharing)

La API tiene CORS habilitado para permitir requests desde diferentes orígenes.

**Configuración actual:**

```javascript
app.use(cors());
```

**Headers CORS en responses:**

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Cookie, Authorization
Access-Control-Allow-Credentials: true
```

**Preflight requests (OPTIONS):**
El servidor responde automáticamente a requests OPTIONS para validación CORS.

**Nota para producción:** Configurar orígenes específicos en lugar de `*` para mayor seguridad:

```javascript
app.use(
  cors({
    origin: "https://tuapp.com",
    credentials: true,
  })
);
```

## 🔍 Content-Type Headers

**Para requests JSON:**

```
Content-Type: application/json
```

**Para uploads (multipart):**

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```

**Accept header recomendado:**

```
Accept: application/json
```

## 🐛 Manejo de Errores

Todos los errores siguen un formato consistente:

**Estructura básica (errores de negocio):**

```json
{
  "message": "Descripción del error"
}
```

**Con detalles de validación (Zod):**

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "campo": ["Descripción específica del error"]
    }
  }
}
```

**Ejemplo con múltiples errores de validación:**

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "email": ["Invalid email address"],
      "password": ["Too small: expected string to have >=6 characters"],
      "name": ["Invalid input: expected string, received undefined"]
    }
  }
}
```

**Nota importante sobre campos requeridos:**

- Cuando un campo requerido falta completamente: `"Invalid input: expected string, received undefined"`
- Cuando un campo requerido está vacío: `"String must contain at least 1 character(s)"`
- Cuando un campo tiene tipo incorrecto: `"Expected number, received string"`

**Middleware de error global:**

- Captura todos los errores no manejados
- Formatea respuestas de error consistentemente
- Oculta detalles internos en producción
- Registra errores para debugging

---

## 📊 Códigos de Estado HTTP

### Códigos de Éxito (2xx)

**200 OK**

- Solicitud exitosa (GET, PUT, DELETE)
- La respuesta contiene datos solicitados o confirmación de acción
- Ejemplo: Lista de mascotas, mascota actualizada, recurso eliminado

**201 Created**

- Recurso creado exitosamente (POST)
- La respuesta contiene el nuevo recurso con su ID
- Ejemplo: Nueva mascota creada, nuevo evento registrado, recordatorio creado

### Códigos de Error del Cliente (4xx)

**400 Bad Request**

- Datos inválidos o mal formateados
- Error de validación Zod
- Falta campo requerido
- Tipo de dato incorrecto
- UUID inválido

**Ejemplos de respuestas 400:**

Error de validación Zod:

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "email": ["Invalid email address"]
    }
  }
}
```

Error de negocio:

```json
{
  "message": "Ya tienes una mascota registrada con ese nombre."
}
```

**401 Unauthorized**

- No hay token de autenticación
- Token inválido o expirado
- Cookie no presente
- JWT malformado

**Ejemplos de respuestas 401:**

```json
{
  "message": "No token"
}
```

```json
{
  "message": "Unauthorized"
}
```

**404 Not Found**

- Recurso solicitado no existe
- ID no encontrado en base de datos
- Usuario, mascota, evento o recordatorio inexistente

**Ejemplos de respuestas 404:**

```json
{
  "message": "La mascota no existe."
}
```

```json
{
  "message": "Event not found"
}
```

**413 Payload Too Large**

- Archivo subido excede el tamaño máximo permitido
- Típicamente para imágenes >10MB

```json
{
  "message": "File size exceeds the limit"
}
```

**429 Too Many Requests**

- Se excedió el límite de rate limiting
- Demasiados intentos en corto tiempo
- Header `Retry-After` indica cuándo reintentar

```json
{
  "message": "Too many requests, please try again later"
}
```

### Códigos de Error del Servidor (5xx)

**500 Internal Server Error**

- Error inesperado del servidor
- Problema en la base de datos
- Error en servicio externo (Cloudinary, email)
- Bug en el código

**Ejemplos de respuestas 500:**

```json
{
  "message": "Internal server error"
}
```

```json
{
  "message": "Error creating event"
}
```

### Resumen de uso por endpoint

| Status | Autenticación    | Mascotas            | Eventos | Recordatorios  |
| ------ | ---------------- | ------------------- | ------- | -------------- |
| 200    | ✅ GET current   | ✅ GET, PUT, DELETE | ✅ GET  | ✅ GET, DELETE |
| 201    | ✅ POST register | ✅ POST             | ✅ POST | ✅ POST        |
| 400    | ✅               | ✅                  | ✅      | ✅             |
| 401    | ✅               | ✅                  | ✅      | ✅             |
| 404    | ✅               | ✅                  | ✅      | ✅             |
| 413    | ❌               | ✅                  | ✅      | ❌             |
| 429    | ✅ login, reset  | ✅                  | ✅      | ❌             |
| 500    | ✅               | ✅                  | ✅      | ✅             |

---

## 🔄 Flujos de Trabajo Comunes

### 1. Registro e inicio de sesión de usuario

```bash
# Paso 1: Registrar nuevo usuario
POST /api/auth/register
Content-Type: application/json

{
  "email": "r.guzmanap@gmail.com",
  "password": "miPassword123"
}

# Respuesta: 201 Created

# Paso 2: Iniciar sesión
POST /api/auth/login
Content-Type: application/json

{
  "email": "r.guzmanap@gmail.com",
  "password": "miPassword123"
}

# Respuesta: 200 OK + Cookie token establecida
# La cookie se envía automáticamente en requests subsecuentes
```

### 2. Crear mascota con foto

```bash
# Usuario debe estar autenticado (cookie token presente)
POST /api/pets
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

name=Firulais
species=Perro
breed=Labrador
age=3
weight=25.5
photoUrl=<archivo-imagen.jpg>

# Respuesta: 201 Created con datos de la mascota y URL de Cloudinary
```

### 3. Listar todas las mascotas del usuario

```bash
GET /api/pets
Cookie: token=<jwt-token>

# Respuesta: 200 OK con array de mascotas
```

### 4. Crear evento veterinario para una mascota

```bash
# Paso 1: Obtener ID de la mascota (si no lo tienes)
GET /api/pets
Cookie: token=<jwt-token>

# Respuesta: Array de mascotas con sus IDs

# Paso 2: Crear evento
POST /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

date=2025-12-15T14:30:00.000Z
description=Vacuna antirrábica anual
type=VACCINE
attachmentUrl=<archivo-receta.pdf>

# Respuesta: 201 Created con datos del evento
```

### 5. Crear recordatorio para un evento

```bash
# Paso 1: Ya tienes el eventId del paso anterior
POST /api/reminders
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "eventId": "c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f",
  "triggerTime": "2025-12-14T14:30:00.000Z",
  "message": "No olvides llevar a Firulais al veterinario mañana",
  "eventUrl": "https://app.ejemplo.com/events/c5d7e9f1-3a5b-7c9d-1e3f-5a7b9c1d3e5f"
}

# Respuesta: 201 Created + Email programado
```

### 6. Consultar eventos de una mascota con filtro

```bash
# Todos los eventos
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events
Cookie: token=<jwt-token>

# Solo vacunas
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events?type=VACCINE
Cookie: token=<jwt-token>

# Solo visitas veterinarias
GET /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c/events?type=VET_VISIT
Cookie: token=<jwt-token>

# Respuesta: 200 OK con eventos filtrados
```

### 7. Recuperación de contraseña

```bash
# Paso 1: Solicitar recuperación
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "r.guzmanap@gmail.com"
}

# Respuesta: 200 OK
# El usuario recibe email con token

# Paso 2: Resetear contraseña con el token recibido
PUT /api/auth/reset-password
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "nuevaPassword456"
}

# Respuesta: 200 OK
```

### 8. Actualizar información de mascota

```bash
PUT /api/pets?id=a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

name=Firulais Senior
species=Perro
breed=Labrador
age=4
weight=26.0
photoUrl=<nueva-imagen.jpg>

# Respuesta: 200 OK con datos actualizados
```

### 9. Eliminar mascota (elimina todo asociado)

```bash
DELETE /api/pets/a3f5b2c1-9d8e-4f6a-b7c3-1e2d3f4a5b6c
Cookie: token=<jwt-token>

# Respuesta: 200 OK
# Nota: Elimina en cascada todos los eventos y recordatorios
```

### 10. Cerrar sesión

```bash
POST /api/auth/logout
Cookie: token=<jwt-token>

# Respuesta: 200 OK
# La cookie token es eliminada
```

---

## 📚 Recursos Adicionales

**Documentación interactiva:**

- Swagger UI: `http://localhost:3000/api/doc`

**Tecnologías utilizadas:**

- **Framework:** Express.js
- **Base de datos:** PostgreSQL con Prisma ORM
- **Autenticación:** JWT (jsonwebtoken)
- **Storage:** Cloudinary
- **Email:** Servicio de email programado
- **Validación:** Zod
- **Rate Limiting:** Progressive rate limiter
- **Security:** Helmet, CORS, CSRF protection (comentado)

**Variables de entorno requeridas:**

```env
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASS=...
NODE_ENV=development|production
```

---

## 📝 Notas Finales

1. **Cookies vs Headers:** Esta API usa cookies HttpOnly para tokens JWT. Si necesitas usar Authorization headers, se debe modificar el middleware de autenticación.

2. **CSRF Protection:** Actualmente comentado en el código. Para producción, considerar habilitarlo.

3. **Validación:** Todos los inputs son validados con Zod schemas antes de procesarse.

4. **Timestamps:** Todas las fechas están en formato ISO 8601 UTC.

5. **UUIDs:** Todos los IDs son UUIDs v4.

6. **Cascade Delete:** Eliminar una mascota elimina automáticamente todos sus eventos y recordatorios.

7. **Email Scheduling:** Los recordatorios programan emails usando un worker/scheduler. Si el servidor se reinicia, verificar que los trabajos programados persistan.

8. **Cloudinary:** Las imágenes y documentos se almacenan permanentemente en Cloudinary. Considerar políticas de limpieza.

9. **Rate Limiting:** Es progresivo y basado en IP. Para producción, considerar identificación por usuario autenticado también.

10. **Testing:** La API incluye tests unitarios con Vitest (ver archivos `*.test.ts`).

---

**Última actualización:** Diciembre 11, 2025  
**Versión API:** 1.0.0  
**Contacto:** [Agregar información de contacto del equipo]
