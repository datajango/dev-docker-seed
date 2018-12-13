FROM php:7-fpm

RUN docker-php-ext-install mysqli pdo pdo_mysql 

#RUN pecl install xdebug
#RUN docker-php-ext-enable xdebug

COPY ./php.ini /usr/local/etc/php/
#COPY ./xdebug.ini /usr/local/etc/php/
#RUN cat /usr/local/etc/php/xdebug.ini >> /usr/local/etc/php/php.ini

# Install sendmail
RUN apt-get update && apt-get install -q -y ssmtp mailutils && rm -rf /var/lib/apt/lists/*
COPY ./ssmtp.conf /etc/ssmtp/ssmtp.conf

RUN echo "localhost localhost.localdomain" >> /etc/hosts
