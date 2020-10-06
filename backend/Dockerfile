FROM php:7.4-apache

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends unzip
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install bcmath
RUN apt-get autoclean -y

RUN a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY src/ /var/www/html/

RUN composer install

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN chown -R www-data:www-data storage
RUN chown -R www-data:www-data bootstrap/cache

RUN chmod -R 775 storage
RUN chmod -R 775 bootstrap/cache

EXPOSE 80

