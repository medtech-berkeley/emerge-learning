FROM python:3.6

ARG user_id=1000

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz


RUN useradd -u $user_id --system stanford && \
    mkdir /stanford && \
    chown stanford:stanford /stanford

COPY requirements.txt /stanford/requirements.txt
RUN pip install --upgrade pip && pip install -r /stanford/requirements.txt

COPY --chown=stanford:stanford ./stanford/ /stanford/
ADD --chown=stanford:stanford docker/entrypoint-*.sh /entry/
RUN mkdir /static && chown stanford:stanford /static


USER stanford
WORKDIR /stanford
ENV PYTHONUNBUFFERED 1
