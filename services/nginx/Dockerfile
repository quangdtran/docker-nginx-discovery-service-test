FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY /conf /etc/nginx/conf.d
COPY /ssl/asset.cert /etc/ssl/certs/asset.cert
COPY /ssl/asset.key /etc/ssl/private/asset.key
