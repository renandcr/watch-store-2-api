<h1 align="center">Watch Store API</h1>
<h2 align="center">
  <img alt="Watch Store" src="src/assets/readme/images/logo.png" style="border-radius: 6px"/>
</h2>

### Project description

⌚Watch Store - is a multi-featured e-commerce website. The project consists of two parts, an API and an interface developed in React. [Access the interface repository here](https://github.com/renandcr/watch-store-design).

<br>

![Version](https://img.shields.io/badge/version-v2.0.0-blue)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/renandcr/watch-store-design?color=orange)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwatchstore2.vercel.app%2F)
![GitHub repo size](https://img.shields.io/github/repo-size/renandcr/watch-store-design)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/renandcr/watch-store-design)
![GitHub language count](https://img.shields.io/github/languages/count/renandcr/watch-store-design)
![GitHub top language](https://img.shields.io/github/languages/top/renandcr/watch-store-design)
![npm](https://img.shields.io/npm/v/yarn?label=yarn&logoColor=red)
![GitHub](https://img.shields.io/github/license/renandcr/watch-store-design)

<br>

### Project status 🚀 In production!

<br>

### 🏁 Index

- [📜 Documentation](#-documentation)
  - [Base URL](#base-url)
  - [🔴 Modules](#-modules)
  - [➡️ Cart](#️-cart)
    - [Endpoints](#endpoints)
  - [#######################################################](#)
  - [#######################################################](#-1)
  - [Customer](#customer)
    - [Endpoints](#endpoints-1)
  - [Address](#address)
    - [Endpoints](#endpoints-2)
  - [Product](#product)
    - [Endpoints](#endpoints-3)
  - [Product Cart](#product-cart)
    - [Endpoints](#endpoints-4)
  - [Purchase Order](#purchase-order)
    - [Endpoints](#endpoints-5)
  - [Quick start](#quick-start)
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

## ER Diagram

<h4><img alt="ER Diagram" src="src/assets/readme/images/der.png" style="border-radius: 6px"/></h4>

<br>

# 📜 Documentation

## Base URL

https://watch-store-2-api-production.up.railway.app/watch_store - (tip: add an endpoint at the end)

## 🔴 Modules

## ➡️ Cart

### Endpoints

| Method | Route                                           | Description                                                                           |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | /cart/add/:customer_id                          | Add product to cart. The user id must be passed.                                      |
| DELETE | /cart/remove/:customer_id/:product_id           | Remove product from cart. You must pass the user id followed by the product id.       |
| PATCH  | /cart/change_units/:customer_id/:productCart_id | Change units of a product. You must pass the user id followed by the product cart id. |
| PATCH  | /cart/change_installments/:customer_id          | Change installment. You must pass the user id. parâmetro.                             |

<br>

> Important: **_product cart id_** and **_product id_** are different entity identifiers. The Product Cart entity was created with the objective of representing a product that was added to the cart, this entity has the properties price and units, abstracted from the Product entity.

<br>

<h3>👉 /cart/add/:customer_id</h3>

<h3>Request information</h3>

```
POST /watch_store/cart/add/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

> Attention: If the user has already added products to the cart without being logged in, these products must be added to the database when he logs in. To make this possible, use **_"request_type": "first_login"_**.

```json
{
  "add_products": {
    "request_type": "",
    "products": [
      {
        "units": 1,
        "final_price": 1476;
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

<h3>Response returned for incorrect user ID</h3>

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

<h3>👉 /cart/remove/:customer_id/:product_id</h3>

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

<h3>Response returned for incorrect product ID or if this product does not exist in cart</h3>

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

<h3>Response returned for incorrect user ID</h3>

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

<h3>👉 /cart/change_units/:customer_id/:productCart_id</h3>

```
PATCH /watch_store/cart/change_units/:customer_id/:productCart_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

> Attention: Use **"change_type": "cart_change"** for requests made on the cart page where increases and decreases must occur one by one.
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

<h3>Response returned for incorrect user ID</h3>

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

<h3>Response returned for incorrect product ID or if this product does not exist in cart</h3>

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

<h3>Response returned if the user is not an administrator and tries to buy more than five units of a given product at once.</h3>

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

## #######################################################

---

---

---

---

---

---

## #######################################################

---

---

---

---

---

<h3>👉 /cart/change_installments/:customer_id</h3>

```
PATCH /watch_store/cart/change_installments/:customer_id
Host: watch-store-2-api-production.up.railway.app
Content-type: application/json
Authorization: Bearer Token
```

<h3>Request body</h3>

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
  "message": "Payment condition changed successfully"
}
```

<br>

<h3>Response returned for incorrect user ID</h3>

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

<h3>Response returned for incorrect product ID or if this product does not exist in cart</h3>

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

<h3>Response returned if the user is not an administrator and tries to buy more than five units of a given product at once.</h3>

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

## Customer

### Endpoints

## Address

### Endpoints

## Product

### Endpoints

## Product Cart

### Endpoints

## Purchase Order

### Endpoints

---

---

---

## Quick start

To run a project in React, you will need to have [node.js](https://nodejs.org/en/) installed on your machine. In addition, you will also need a good code editor. My suggestion is the [Visual Studio Code](https://code.visualstudio.com/).

Clone the remote repository on your machine:

```
git@github.com:renandcr/watch-store-design.git
```

<br>

Enter the local repository:

```
cd watch-store-design
```

<br>

Install in your local repository the project dependencies:

```
yarn
```

<br>

Open the text editor in the project's root folder:

```
code .
```

<br>

In your text editor terminal, run the server:

```
yarn start
```

Use "Ctrl + C" to stop the server.

<br>

## Author

<h4><img alt="Home" src="src/assets/readme/images/profile_photo_2.JPG" style="width: 100px; border-radius: 50px"/></h4>
Renan Ribeiro 🚀

<br>

<br>

Made with ❤️ by Renan Ribeiro 👋 Get in touch!

![WHATSAPP](<https://img.shields.io/badge/(43)996935385-25D366?style=flat-square&logo=whatsapp&logoColor=white>)
![GMAIL](https://img.shields.io/badge/renandcribeiro@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)
<a href="https://www.linkedin.com/in/renandcr">
<img src="https://img.shields.io/badge/Renan-0077B5?style=flat-square&logo=linkedin&logoColor=white"/></a>

<br>

## License

Licensed under [MIT](https://github.com/renandcr/watch-store-2-api/blob/developer/LICENSE.md).
