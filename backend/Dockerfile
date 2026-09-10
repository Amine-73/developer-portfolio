FROM php:8.3-fpm

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

COPY . .
COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini

RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000

CMD ["php-fpm"]
