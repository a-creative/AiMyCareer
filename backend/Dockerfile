FROM php:7.4-apache

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update; \
    apt-get install -y --no-install-recommends apt-utils; \
    apt-get install -y --no-install-recommends unzip; \
    docker-php-ext-install pdo_mysql; \
    docker-php-ext-install bcmath; \
    apt-get autoclean -y; \
    a2enmod rewrite; \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer;

WORKDIR /var/www/html

COPY src/ /var/www/html/

RUN composer install

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf; \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf; \
    chown -R www-data:www-data storage; \
    chown -R www-data:www-data bootstrap/cache; \
    chmod -R 775 storage; \
    chmod -R 775 bootstrap/cache;

EXPOSE 80

