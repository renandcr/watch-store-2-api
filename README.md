<h1 align="center">Watch Store API</h1>
<h2 align="center">
  <img alt="Watch Store" src="src/assets/readme/images/logo.png" style="border-radius: 6px"/>
</h2>

### Project description

⌚Watch Store - is a multi-featured e-commerce website. The project consists of two parts, a node.js API and an interface developed in React. [Access the interface repository here](https://github.com/renandcr/watch-store-design).

<br>

![npm](https://img.shields.io/npm/v/yarn?label=yarn&logoColor=red)
![Debian](https://img.shields.io/badge/Ubuntu-20.04-brightgreen)
![GitHub repo size](https://img.shields.io/github/repo-size/renandcr/watch-store-2-api)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/renandcr/watch-store-2-api)
![GitHub top language](https://img.shields.io/github/languages/top/renandcr/watch-store-2-api)
![GitHub language count](https://img.shields.io/github/languages/count/renandcr/watch-store-2-api)
![GitHub](https://img.shields.io/github/license/renandcr/watch-store-2-api)

<br>

### Project status 🚀 In production!

<br>

### Index

- [Technologies used](#️-technologies-used)
- [ER Diagram](#️-er-diagram)
- [Documentation](#-documentation)
  - [Base URL](#base-url)
  - [Customer](#-customer)
    - [1 - Endpoints](#1---endpoints)
  - [Product](#-product)
    - [2 - Endpoints](#2---endpoints)
  - [Cart](#-cart)
    - [3 - Endpoints](#3---endpoints)
  - [Address](#-address)
    - [4 - Endpoints](#4---endpoints)
  - [Purchase Order](#-purchase-order)
    - [5 - Endpoints](#5---endpoints)
- [Quick start](#-quick-start)
- [Author](#author)
- [License](#license)

<br>

## 🛠️ Technologies used

- [Node.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://styled-components.com/)
- [Typeorm](https://redux.js.org/)
- [PostgreSQL](https://mui.com/)
- [Docker](https://axios-http.com/ptbr/)

<br>

## 🗺️ ER Diagram

<h4><img alt="ER Diagram" src="src/assets/readme/images/der.png" style="border-radius: 6px"/></h4>

<br>

## 📜 Documentation

### Base URL

https://watch-store-2-api-production.up.railway.app - (tip: add an endpoint at the end)

### 🔴 Customer

#### 1 - Endpoints

[back to index](#index)
| Method | Route | Description |
| ------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| POST | /watch_store/create | Create user. |
| POST | /watch_store/login | Log in to the user account. |
| GET | /watch_store | List users. For admins only. |
| GET | /watch_store/:customer_id | List user profile. User id must be provided. |
| PATCH | /watch_store/update/:customer_id| Update user. User id must be provided. |
| DELETE | /watch_store/delete/:customer_id | Delete user. User id must be provided. |

<br>

<h3>👉 /watch_store/create</h3>

[back to Endpoints](#1-endpoints)

<h3>Request information</h3>

```
POST /watch_store/create
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
```

<h3>Request body</h3>

> Warning: by default, the value of the "admin" property is false. For convenience, this field should only be provided for registering administrators.

```json
{
  "name": "Stephen",
  "last_name": "King",
  "email": "king@gmail.com",
  "password": "123456",
  "admin": false
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
201 Created
```

```json
{
  "message": "Customer created successfully",
  "data": {
    "name": "Stephen",
    "last_name": "King",
    "email": "king@gmail.com",
    "admin": false,
    "created_at": "2023-01-13T18:34:26.626Z",
    "updated_at": "2023-01-13T18:34:26.626Z",
    "cart": {
      "total_units": 0,
      "amount": 0,
      "installment": "Em 1x de 0 sem juros",
      "shipping": 0,
      "id": "9561634a-329d-484b-96b9-56838c6099db"
    },
    "id": "9c4ba9d6-9442-4f8a-ab9d-e55d8f1117a7"
  }
}
```

<br>

<h3>Response returned to email already existing in the database</h3>

Status code

```
409 Conflict
```

```json
{
  "status": "error",
  "code": 409,
  "message": "[4009] Email already exists"
}
```

<br>

<h3>👉 /watch_store/login</h3>

[back to Endpoints](#1---endpoints)

<h3>Request information</h3>

```
POST /watch_store/login
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
```

<h3>Request body</h3>

```json
{
  "email": "king@gmail.com",
  "password": "123456"
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbmdAZ21haWwuY29tIiwiaWRfdG9rZW4iOiI5YzRiYTlkNi05NDQyLTRmOGEtYWI5ZC1lNTVkOGYxMTE3YTciLCJpYXQiOjE2NzM2MzY0ODgsImV4cCI6MTY3MzY3OTY4OH0.o5Kmg7kQ3vVunC1hHJ49764mSJAVXiu325EEOhY_-_I"
}
```

<br>

<h3>Response returned for incorrect email or password</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4012] Invalid email or password"
}
```

<br>

<h3>👉 /watch_store</h3>

[back to Endpoints](#1---endpoints)

<h3>Request information</h3>

```
GET /watch_store
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
[
  {
    "id": "cc818926-3f7a-4bf8-89a0-de3c38f2dcd4",
    "name": "Oscar",
    "last_name": "Wilde",
    "email": "oscar@gmail.com",
    "admin": true,
    "created_at": "2023-01-13T19:18:17.463Z",
    "updated_at": "2023-01-13T19:18:17.463Z",
    "cart": {
      "id": "29b08439-03e4-46af-93c8-b0f28dee3150",
      "total_units": 0,
      "amount": 0,
      "installment": "Em 1x de 0 sem juros",
      "shipping": 0,
      "productCart": []
    },
    "addresses": [],
    "purchaseOrders": []
  },
  {
    "id": "9c4ba9d6-9442-4f8a-ab9d-e55d8f1117a7",
    "name": "Stephen",
    "last_name": "King",
    "email": "king@gmail.com",
    "admin": false,
    "created_at": "2023-01-13T18:34:26.626Z",
    "updated_at": "2023-01-13T18:34:26.626Z",
    "cart": {
      "id": "9561634a-329d-484b-96b9-56838c6099db",
      "total_units": 0,
      "amount": 0,
      "installment": "Em 1x de 0 sem juros",
      "shipping": 0,
      "productCart": []
    },
    "addresses": [],
    "purchaseOrders": []
  }
]
```

<br>

<h3>👉 /watch_store/:customer_id</h3>

[back to Endpoints](#1---endpoints)

<h3>Request information</h3>

```
GET /watch_store/:customer_id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "id": "9c4ba9d6-9442-4f8a-ab9d-e55d8f1117a7",
  "name": "Stephen",
  "last_name": "King",
  "email": "king@gmail.com",
  "admin": false,
  "created_at": "2023-01-13T18:34:26.626Z",
  "updated_at": "2023-01-13T18:34:26.626Z",
  "cart": {
    "id": "9561634a-329d-484b-96b9-56838c6099db",
    "total_units": 0,
    "amount": 0,
    "installment": "Em 1x de 0 sem juros",
    "shipping": 0,
    "productCart": []
  },
  "addresses": [],
  "purchaseOrders": []
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for a user without admin permission trying to access another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

<h3>👉 /watch_store/update/:customer_id</h3>

[back to Endpoints](#1---endpoints)

<h3>Request information</h3>

```
PATCH /watch_store/update/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<br>

<h3>Request body</h3>

> Warning: below you will see an example where the value of two properties are changed. Feel free to change as many as you like.

```json
{
  "last_name": "King Changed",
  "email": "king_changed@gmail.com"
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Customer updated successfully",
  "data": {
    "id": "9c4ba9d6-9442-4f8a-ab9d-e55d8f1117a7",
    "last_name": "King Changed",
    "email": "king_changed@gmail.com",
    "created_at": "2023-01-13T18:34:26.626Z",
    "updated_at": "2023-01-13T20:46:43.454Z",
    "cart": {
      "id": "9561634a-329d-484b-96b9-56838c6099db",
      "total_units": 0,
      "amount": 0,
      "installment": "Em 1x de 0 sem juros",
      "shipping": 0,
      "productCart": []
    },
    "addresses": [],
    "purchaseOrders": []
  }
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for a user without admin permission trying to change another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

<h3>👉 /watch_store/delete/:customer_id</h3>

[back to Endpoints](#1---endpoints)

<h3>Request information</h3>

```
DELETE /watch_store/delete/:customer_id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Customer deleted successfully"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for a user without admin permission trying to delete another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

### 🔴 Product

[back to index](#index)

#### 2 - Endpoints

| Method | Route                           | Description                                                    |
| ------ | ------------------------------- | -------------------------------------------------------------- |
| POST   | /watch_store/product/create     | Create product. For admins only.                               |
| GET    | /watch_store/product/list       | List products.                                                 |
| PATCH  | /watch_store/product/update/:id | Change products. For admins only. Product id must be provided. |
| DELETE | /watch_store/product/delete/:id | Delete product. For admins only. Product id must be provided.  |

<br>

<h3>👉 /watch_store/product/create</h3>

[back to Endpoints](#2---endpoints)

<h3>Request information</h3>

```
POST /watch_store/product/create
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

> Important: the value of the **_img_** property must be identical to the name of the corresponding image stored on the server.

```json
{
  "reference": "25200125",
  "img": "25200125.webp",
  "description": "Relógio Calvin Klein Feminino Aço Rosé 25200125",
  "price": 1090,
  "stock_quantity": 50,
  "category": "watch",
  "genre": "female"
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
201 Created
```

```json
{
  "message": "Product created successfully",
  "data": {
    "img": "25200125.webp",
    "reference": "25200125",
    "description": "Relógio Calvin Klein Feminino Aço Rosé 25200125",
    "price": 1090,
    "stock_quantity": 50,
    "category": "watch",
    "genre": "female",
    "created_at": "2023-01-03T22:36:43.244Z",
    "updated_at": "2023-01-03T22:36:43.244Z",
    "id": "1679942a-42ff-4d0a-93b3-0ee0300e92f2"
  }
}
```

<br>

<h3>Response returned for reference already existing in the database</h3>

Status code

```
409 Conflict
```

```json
{
  "status": "error",
  "code": 409,
  "message": "There is already a product with this reference"
}
```

<br>

<h3>Response returned for user without admin permission trying to create a product</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4022] You are not authorized for this activity"
}
```

<br>

<h3>👉 /watch_store/product/list</h3>

[back to Endpoints](#2---endpoints)

<h3>Request information</h3>

```
GET /watch_store/product/list
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
[
  {
    "id": "6249cdd1-b7d6-4cb7-9324-78c941caefce",
    "reference": "DZ4360",
    "img": "https://watch-store-2-api-production.up.railway.app/watch_store/product/DZ4360.jpg",
    "description": "Relógio Masculino Diesel DZ4360",
    "price": 2349.9,
    "stock_quantity": 47,
    "category": "watch",
    "genre": "male",
    "created_at": "2022-12-09T00:33:57.988Z",
    "updated_at": "2022-12-17T02:33:39.279Z"
  },
  {
    "id": "207b74f1-fcb7-45d1-a5a1-61fa2ed6d5c9",
    "reference": "179177",
    "img": "https://watch-store-2-api-production.up.railway.app/watch_store/product/179177.jpg",
    "description": "Relógio Masculino Tommy Hilfiger 179177",
    "price": 6128,
    "stock_quantity": 50,
    "category": "watch",
    "genre": "male",
    "created_at": "2022-12-09T00:34:58.796Z",
    "updated_at": "2022-12-09T00:34:58.796Z"
  },
  {
    "id": "caca8ddc-9703-46bd-b5d1-10dd197744d2",
    "reference": "1782554",
    "img": "https://watch-store-2-api-production.up.railway.app/watch_store/product/1782554.webp",
    "description": "Relógio Tommy Hilfiger Feminino Aço 1782554",
    "price": 1790,
    "stock_quantity": 50,
    "category": "watch",
    "genre": "female",
    "created_at": "2022-12-09T00:42:24.271Z",
    "updated_at": "2022-12-09T00:42:24.271Z"
  }
]
```

<br>

<h3>👉 /watch_store/product/update/:id</h3>

[back to Endpoints](#2---endpoints)

<h3>Request information</h3>

```
PATCH /watch_store/product/update/:id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

```json
{
  "price": 6128,
  "stock_quantity": 50
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "data": {
    "id": "678b37f5-d27f-43c0-bda1-185ca631c393",
    "price": 6128,
    "stock_quantity": 50,
    "created_at": "2023-01-03T22:30:14.379Z",
    "updated_at": "2023-01-15T16:20:42.308Z"
  },
  "message": "Product updated successfully"
}
```

<br>

<h3>Response returned for a user without admin permission trying to update a product</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4022] You are not authorized for this activity"
}
```

<br>

<h3>Response returned for attempted update to an existing product reference</h3>

Status code

```
409 Conflict
```

```json
{
  "status": "error",
  "code": 409,
  "message": "There is already a product with this reference"
}
```

<br>

<h3>👉 /watch_store/product/delete/:id</h3>

[back to Endpoints](#2---endpoints)

<h3>Request information</h3>

```
DELETE /watch_store/product/delete/:id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Product deleted successfully"
}
```

<br>

<h3>Response returned for incorrect product id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4007] Product not found"
}
```

<br>

<h3>Response returned for user without admin permission trying to delete a product</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4022] You are not authorized for this activity"
}
```

<br>

### 🔴 Cart

[back to index](#index)

#### 3 - Endpoints

| Method | Route                                                       | Description                                                                              |
| ------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| POST   | /watch_store/cart/add/:customer_id                          | Add product to cart. User id must be provided.                                           |
| DELETE | /watch_store/cart/remove/:customer_id/:product_id           | Remove product from cart. The user id followed by the product id must be provided.       |
| PATCH  | /watch_store/cart/change_units/:customer_id/:productCart_id | Change units of a product. The user id followed by the product cart id must be provided. |
| PATCH  | /watch_store/cart/change_installments/:customer_id          | Change installment. User id must be provided.                                            |

> Important: **_product cart id_** and **_product id_** are different entity identifiers. The Product Cart entity was created with the objective of representing a product that was added to the cart, this entity has the properties price and units, abstracted from the Product entity.

<br>

---

> Warning: for all requests where an authorization token is required, there are 3 possible recurring errors. Check it out below...

<h3>1 - Response returned for missing token on authorization</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4000] Request is missing token"
}
```

<br>

<h3>2 - Response returned for user without admin permission</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

<h3>3 - Response returned for incorrect or expired token</h3>

Status code

```
406 Not Acceptable
```

```json
{
  "status": "error",
  "code": 406,
  "message": "[4017] Invalid token"
}
```

<br>

---

<h3>👉 /watch_store/cart/add/:customer_id</h3>

[back to Endpoints](#3---endpoints)

<h3>Request information</h3>

```
POST /watch_store/cart/add/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

> Warning: if the user has already added products to the cart without being logged in, these products must be added to the database when he logs in. To make this possible, use **_"request_type": "first_login"_**.

```json
{
  "add_products": {
    "request_type": "",
    "products": [
      {
        "units": 1,
        "final_price": 1476,
        "product": {
          "id": "7fd79c4b-7e18-4dcf-bbdd-98430122b15b",
          "reference": "1791615",
          "img": "https://watch-store-2-api-production.up.railway.app/watch_store/product/1791615.jpg",
          "description": "Relógio Masculino Tommy Hilfiger 1791615",
          "price": 1476,
          "stock_quantity": 30,
          "category": "watch",
          "genre": "male",
          "created_at": "2022-12-09T00:35:30.161Z",
          "updated_at": "2022-12-09T00:35:30.161Z"
        }
      }
    ]
  }
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Successfully performed operation"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for product that already exists in the cart</h3>

Status Code

```
409 Conflict
```

```json
{
  "status": "error",
  "code": 409,
  "message": "[4013] This product is already in the cart"
}
```

<br>

<br>

<h3>👉 /watch_store/cart/remove/:customer_id/:product_id</h3>

[back to Endpoints](#3---endpoints)

<h3>Request information</h3>

```
DELETE /watch_store/cart/remove/:customer_id/:product_id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Product removed from cart successfully"
}
```

<br>

<h3>Response returned for incorrect product id or if this product does not exist in cart</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4007] Product not found"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<br>

<h3>👉 /watch_store/cart/change_units/:customer_id/:productCart_id</h3>

[back to Endpoints](#3---endpoints)

```
PATCH /watch_store/cart/change_units/:customer_id/:productCart_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

> Warning: use **"change_type": "cart_change"** for requests made on the cart page where increases and decreases must occur one by one.
> For requests made on the checkout page where unit values can be greater than one, use **"change_type": " "**.

```json
{
  "change_units": {
    "change_type": "cart_change",
    "units": 1
  }
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Product units changed successfully"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for incorrect product id or if this product does not exist in cart</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4007] Product not found"
}
```

<br>

<h3>Response returned if the user is not an administrator and tries to buy more than five units of a given product at once</h3>

Status code

```
400 Bad Request
```

```json
{
  "status": "error",
  "code": 400,
  "message": "[4021] Product with limited purchase quantity of 5 units per customer"
}
```

<br>

<h3>Response returned for insufficient stock</h3>

Status code

```
400 Bad Request
```

```json
{
  "status": "error",
  "code": 400,
  "message": "[4019] Insufficient stock. X units are available for purchase"
}
```

<br>

<br>

<h3>👉 /watch_store/cart/change_installments/:customer_id</h3>

[back to Endpoints](#3---endpoints)

```
PATCH /watch_store/cart/change_installments/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

```json
{
  "installment": 8
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Payment condition changed successfully"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

### 🔴 Address

[back to index](#index)

#### 4 - Endpoints

| Method | Route                                    | Description                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| POST   | /watch_store/address/create/:customer_id | Create address. User id must be provided.    |
| PATCH  | /watch_store/address/update/:id          | Change address. Address id must be provided. |
| DELETE | /watch_store/address/delete/:id          | Delete address. Address id must be provided. |

<br>

<h3>👉 /watch_store/address/create/:customer_id</h3>

[back to Endpoints](#4---endpoints)

<h3>Request information</h3>

```
POST /watch_store/address/create/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

```json
{
  "street": "Largo Alfredo Parodi",
  "district": "Centro",
  "house_number": "1144",
  "complement": "Apartamento",
  "city": "Curitiba",
  "state": "PR",
  "zip_code": "80010040",
  "phone": "43998725693"
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
201 Created
```

```json
{
  "message": "Successfully registered address"
}
```

<br>

<h3>Response returned for a user without admin permission who tries to create an address in another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4005] Customer not found. Address cannot be assigned to a non-existent customer"
}
```

<br>

<h3>👉 /watch_store/address/update/:id</h3>

[back to Endpoints](#4---endpoints)

<h3>Request information</h3>

```
PATCH /watch_store/address/update/:id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

```json
{
  "complement": "Edifício Palmares, apt 35"
}
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Address updated successfully"
}
```

<br>

<h3>Response returned for a user without admin permission trying to change an address belonging to another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

<h3>Response returned for incorrect address id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4006] Address not found"
}
```

<br>

<h3>👉 /watch_store/address/delete/:id</h3>

[back to Endpoints](#4---endpoints)

<h3>Request information</h3>

```
DELETE /watch_store/address/delete/:id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Address deleted successfully"
}
```

<br>

<h3>Response returned for incorrect address id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4006] Address not found"
}
```

<br>

<h3>Response returned for a user without admin permission trying to delete an address belonging to another user's profile</h3>

Status code

```
401 Unauthorized
```

```json
{
  "status": "error",
  "code": 401,
  "message": "[4018] You are not authorized to access or make changes to other accounts"
}
```

<br>

### 🔴 Purchase Order

[back to index](#index)

#### 5 - Endpoints

| Method | Route                                           | Description                                                                            |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| POST   | /watch_store/purchase-order/create/:customer_id | Create purchase order. User id must be provided.                                       |
| DELETE | /watch_store/purchase-order/delete/:customer_id/:request_id    | Delete purchase order. The user id followed by the purchase order id must be provided. |

<br>

<h3>👉 /watch_store/purchase-order/create/:customer_id</h3>

[back to Endpoints](#5---endpoints)

<h3>Request information</h3>

```
POST /watch_store/purchase-order/create/:customer_id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
201 Created
```

```json
{
  "message": "Successfully completed purchase order"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned to the user who has not yet added products to the cart</h3>

Status code

```
406 Not Acceptable
```

```json
{
  "status": "error",
  "code": 406,
  "message": "[4014] Empty cart"
}
```

<br>

<h3>Response returned to the user who does not yet have a registered address or who has not selected a delivery address</h3>

Status code

```
406 Not Acceptable
```

```json
{
  "status": "error",
  "code": 406,
  "message": "[4023] You must indicate a delivery address"
}
```

<br>

<h3>Response returned for sold out product</h3>

> This becomes possible when two users add the same product to their cart, but user x buys before user y.

Status code

```
400 Bad Request
```

```json
{
  "status": "error",
  "code": 400,
  "message": "[4020] Product sold out in cart"
}
```

<br>

<h3>Response returned for product with insufficient quantity</h3>

> This becomes possible when two users add the same product to their cart, but user x buys before user y.

Status code

```
400 Bad Request
```

```json
{
  "status": "error",
  "code": 400,
  "message": "[4024] Insufficient stock. 02d2dd18-49d2-4f75-85aa-2a7b98a73db4 has 2 units available for purchase"
}
```

<br>

<h3>👉 /watch_store/purchase-order/delete/:customer_id/:request_id</h3>

[back to Endpoints](#5---endpoints)

<h3>Request information</h3>

```
DELETE /watch_store/purchase-order/delete/:customer_id/:request_id
Host: watch-store-2-api-production.up.railway.app
Authorization: Bearer Token
```

<br>

<h3>Response returned for successful request</h3>

Status code

```
200 OK
```

```json
{
  "message": "Purchase Order deleted successfully"
}
```

<br>

<h3>Response returned for incorrect user id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4004] Customer not found"
}
```

<br>

<h3>Response returned for incorrect purchase order id</h3>

Status code

```
404 Not Found
```

```json
{
  "status": "error",
  "code": 404,
  "message": "[4008] Purchase order not found"
}
```

<br>

<br>

## 💻 Quick start

To run this project you will need a good code editor, my suggestion is [Visual Studio Code](https://code.visualstudio.com/). In addition, you will also need to have [docker](https://docs.docker.com/engine/install/) installed on your machine.

Clone the remote repository on your machine:

```
git clone git@github.com:renandcr/watch-store-2-api.git
```

<br>

Enter the local repository:

```
cd watch-store-2-api
```

<br>

Open the code editor in the project's root folder:

```
code .
```

<br>

Follow the instructions described in the .env.example file and add all environment variables inside an .env file. For this, you will need to create an .env file in the root of the project:

<img alt="Example of directories" src="src/assets/readme/images/example_of_directories.png"/>

<br>

Run the following command in the terminal to run the cloud project:

```
docker compose up
```

<br>

If all goes well, you should see this:

<img alt="Example of directories" src="src/assets/readme/images/run_docker_compose.png"/>

Ready, the project is running in a docker container with all the necessary dependencies for its operation.

Use "Ctrl + C" to stop the server.

<br>

## Author

<h4><img alt="Home" src="src/assets/readme/images/profile_photo_2.JPG" style="width: 100px; border-radius: 50px"/></h4>
Renan Ribeiro 🚀

<br>

<br>

Made with ❤️ by Renan Ribeiro 👋 Get in touch!

![WHATSAPP](<https://img.shields.io/badge/+55(43)996935385-25D366?style=flat-square&logo=whatsapp&logoColor=white>)
![GMAIL](https://img.shields.io/badge/renandcribeiro@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)
<a href="https://www.linkedin.com/in/renandcr">
<img src="https://img.shields.io/badge/Renan-0077B5?style=flat-square&logo=linkedin&logoColor=white"/></a>

<br>

## License

Licensed under [MIT](https://github.com/renandcr/watch-store-2-api/blob/developer/LICENSE.md).
