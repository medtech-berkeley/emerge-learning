FROM node:8-alpine as react-pkg
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh dumb-init
USER node
COPY --chown=node:node stanford/webpack.config.js stanford/.babelrc /stanford/
COPY --chown=node:node stanford/package.json stanford/package-lock.json /stanford/
RUN cd /stanford && npm install
COPY --chown=node:node stanford/frontend/assets /stanford/frontend/assets
RUN cd /stanford && npm run build
ENTRYPOINT ["/usr/bin/dumb-init", "--"]


FROM python:3.6-alpine
ARG user_id=1000

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apk update && apk add dumb-init postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev


RUN adduser -u $user_id stanford -D -H && \
    mkdir /stanford && \
    chown stanford:stanford /stanford

COPY requirements.txt /stanford/requirements.txt
RUN pip install --upgrade pip && pip install -r /stanford/requirements.txt

COPY --chown=stanford:stanford ./stanford/ /stanford/
COPY --chown=stanford:stanford ./test.sh /stanford/
ADD --chown=stanford:stanford docker/entrypoint-*.sh /entry/
COPY --from=react-pkg /stanford/webpack-stats.json /stanford
COPY --from=react-pkg /stanford/frontend/assets/bundles/main.js /stanford/frontend/assets/bundles/main.js

RUN mkdir -p /static && chown -R stanford:stanford /static
RUN mkdir -p /media && chown -R stanford:stanford /media

USER stanford
WORKDIR /stanford
ENV PYTHONUNBUFFERED 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
