<!-- [![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632145&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini -->

# API Documentation - Table Time API

This document provides an overview of the API endpoints and their usage for our service.

### 1. Available endpoints for **_CMS Admin_**

- [**_POST_** /user/login](#1-post-register)
- [**_POST_** /user/register](#1-post-register)

* [**_POST_** /cuisine/](#1-post-register)
* [**_GET_** /cuisine/](#1-post-register)
* [**_GET_** /cuisine/:id](#1-post-register)
* [**_PUT_** /cuisine/:id](#1-post-register)
* [**_DELETE_** /cuisine/:id](#1-post-register)

- [**_POST_** /category/](#1-post-register)
- [**_GET_** /category/](#1-post-register)
- [**_PUT_** /category/:id](#1-post-register)
- [**_DELETE_** /category/:id](#1-post-register)

### 2. Available endpoints for **_Public_**

- [**_GET_** /pub/](#1-post-register)
- [**_GET_** /pub/:id](#1-post-register)

&nbsp;

<!-- ## 1. POST /register -->

## 1. POST /register

#### Request - Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

<details>
<summary>
Click here for Response
</summary>

#### Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

</details>
