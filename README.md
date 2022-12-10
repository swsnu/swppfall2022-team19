# LetMeCU

[![Build Status](https://app.travis-ci.com/swsnu/swppfall2022-team19.svg?branch=main)](https://app.travis-ci.com/swsnu/swppfall2022-team19)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team19&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=swsnu_swppfall2022-team19)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swppfall2022-team19/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/swsnu/swppfall2022-team19?branch=main)

# Frontend
### Starting Server
- cd frontend/cu
- yarn
- yarn add redux react-redux @reduxjs/toolkit
- yarn add react-select
- yarn start
### Testing
- cd frontend/cu
- yarn test --coverage --watchAll=false


# Backend
### Starting Server
- cd backend/cu
- python manage.py runserver
### Testing
- cd backend/cu
- coverage run --source='.' manage.py test

