# movies-explorer (backend)

Backend-часть приложения, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

**Функционал:** 
* работа с NoSQL БД - MongoDB;
* описание схем и моделей документов в БД;
* централизованная обработка возможных ошибок;
* возможность регистрации и авторизации пользователя;
* создание основных маршрутов;
* защита части маршрутов от неавторизованных пользователей;
* обработка запросов по маршрутам;
* валидация данных запроса с помощью Joi;

**Использованы следующие методы и технологии:**
- Node.js
- Express
- MongoDB
- Mongoose
- ESLint
- Clebrate & Joi
- Winston - логирование ошибок & запросов

**Как зупустить проект**

`npm run start` — запускает сервер 

`npm run dev` — запускает сервер с hot-reload

**Деплой проекта**
`npm run deploy` — запускает deploy в production при наличии ssh ключа

## Ссылки
Адрес домена для frontend - [ссылка](https://gato.nomoredomains.rocks/)</br>
Адрес домена для backend - [ссылка](https://gato.diploma.nomoredomains.rocks/)</br>
Код frontend можно посмотреть по [ссылке](https://github.com/8Gato8/movies-explorer-frontend)

## Статус проекта и планы по доработке
Завершён. Доработки не планируются.
