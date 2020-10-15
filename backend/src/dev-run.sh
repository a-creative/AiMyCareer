#!/bin/bash

cd /var/www/html
composer install
./wait-for-it.sh database:3306 -s --timeout=0 -- php artisan doctrine:migrations:migrate && exec apache2-foreground