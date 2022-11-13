# LetMeCU

[![Build Status](https://app.travis-ci.com/swsnu/swpp2022-team19.svg?branch=master)](https://app.travis-ci.com/swsnu/swpp2022-team19)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2022-team19&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team19)

[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2022-team19/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/swsnu/swpp2022-team19?branch=main)


# Frontend
- yarn
- yarn add redux react-redux @reduxjs/toolkit
- yarn add react-select
- yarn add --save @types/qs

# Backend
- python -m pip install Pillow
- pip install djangorestframework
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver (0.0.0.0:8000)

# docker
docker run --rm -it \
--ipc=host \
--name "practice8" \
-p 0.0.0.0:3000:3000 -p 0.0.0.0:8000:8000 \
-v ${PWD}:/home \
snuspl/swpp:practice8
