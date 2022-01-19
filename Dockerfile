
#Step 1
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run watch

FROM php:8-apache as production-stage
RUN mkdir /app
COPY --from=build-stage /app/public /app
COPY ./containers/student_profiles/apache2.conf /etc/apache2/apache2.conf
COPY ./containers/student_profiles/000-default.conf /etc/apache2/sites-available/000-default.conf

CMD ["npm","start"]
