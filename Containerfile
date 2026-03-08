FROM python:3.12-slim AS build

WORKDIR /app

COPY data ./data
COPY build.py ./build.py
RUN pip install --no-cache-dir docstring-json==0.2.2
RUN python build.py --delete-source

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY pages /usr/share/nginx/html/pages
COPY --from=build /app/data/*.json /usr/share/nginx/html/data/

EXPOSE 80
