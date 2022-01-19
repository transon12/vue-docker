FROM php:8-apache

RUN apt-get update &&\
    a2enmod rewrite &&\
    service apache2 restart

COPY ./apache2.conf /etc/apache2/apache2.conf
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

RUN apt-get update

EXPOSE 80
