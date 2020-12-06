[![Build Status](https://travis-ci.com/YvesIraguha/LostAndFound.API.svg?branch=develop)](https://travis-ci.com/YvesIraguha/LostAndFound.API)
[![Coverage Status](https://coveralls.io/repos/github/YvesIraguha/LostAndFound.API/badge.svg?branch=ch-setup-circle-ci-%23171923573)](https://coveralls.io/github/YvesIraguha/LostAndFound.API?branch=ch-setup-circle-ci-%23171923573)
[![Maintainability](https://api.codeclimate.com/v1/badges/2ea6c7fa115855d90017/maintainability)](https://codeclimate.com/github/YvesIraguha/LostAndFound.API/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2ea6c7fa115855d90017/test_coverage)](https://codeclimate.com/github/YvesIraguha/LostAndFound.API/test_coverage)

# lost-and-found-api

## About the project

A platform for registering what you have lost and what you found to help each other.

## Build with

- NodeJs/Express
- MongoDB/mongoose
- Docker for containerization

## Getting started

- Clone this repo
- cd to root directory
- Install all dependencies `npm install`
- Start the server `npm run dev`

## Models

### User model

```json
{
  "firstName": "firstName",
  "secondName": "secondName",
  "userName": "username",
  "phoneNumber": "0780000000",
  "email": "email@example.com",
  "password": "password"
}
```

### Update Profile model

```json
{
  "firstName": "firstName",
  "secondName": "secondName",
  "phoneNumber": "0720000000",
  "username": "userName"
}
```

### Profile picture

```json
{
  "photoUrl": "https://photo/location"
}
```

### Document model

```json
{
  "documentTitle": "docment title",
  "documentID": "docement id",
  "district": "district",
  "sector": "sector"
}
```

## Endpoints

- Signup: `/api/v1/users/auth/signup`
- Login: `/api/v1/users/auth/login`
- Google Auth: `/api/v1/users/auth/google`
- lost document recording: `/api/v1/items/lost`
- found document recording: `/api/v1/items/found`
- Profile picture: `/api/v1/users/profile/image`
- Update profile: `/api/v1/users/profile/`

## Contacts

- [Iraguha Yves](https://github.com/YvesIraguha)
- [Habineza Janvier](https://github.com/Habinezajanvier)
- [Imanigirimpuhwe Simon](https://github.com/SimonImanigirimpuhwe)
