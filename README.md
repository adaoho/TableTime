<!-- [![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632145&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini -->

# API Documentation - Table Time API

This document provides an overview of the API endpoints and their usage for our service.

### 1. Available endpoints for **_CMS Admin_**

- [**_POST_** /register](#1-post-register)
- [**_POST_** /login](#1-post-register)
- [**_POST_** /googleSignIn](#1-post-register)
- [**_GET_** /lodgings](#1-post-register)
- [**_POST_** /lodgings](#1-post-register)
- [**_DELETE_** /lodgings/:id](#1-post-register)
- [**_PATCH_** /lodgings/:id](#1-post-register)
- [**_PUT_** /lodgings/:id](#1-post-register)
- [**_GET_** /lodgings/:id](#1-post-register)

* [**_GET_** /types](#1-post-register)
* [**_POST_** /types](#1-post-register)
* [**_DELETE_** /types/:id](#1-post-register)

- [**_GET_** /logs](#1-post-register)
- [**_POST_** /logs](#1-post-register)

### 2. Available endpoints for **_Public_**

- [**_POST_** /public/register](#1-post-register)
- [**_POST_** /public/login](#1-post-register)
- [**_POST_** /public/googleLogin](#1-post-register)

* [**_GET_** /public/lodgings](#1-post-register)

- [**_POST_** /public/bookmark](#1-post-register)
- [**_POST_** /public/bookmark/:id](#1-post-register)

&nbsp;

<!-- ## 1. POST /register -->

## 1. POST /register

#### Request - Body

```json
{
  "email": "string",
  "password": "string"
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
