FROM python:3.6

ARG user_id=1000

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apt-get update && apt-get install -y dumb-init


RUN useradd -u $user_id --system stanford && \
    mkdir /stanford && \
    chown stanford:stanford /stanford

COPY requirements.txt /stanford/requirements.txt
RUN pip install --upgrade pip && pip install -r /stanford/requirements.txt

COPY --chown=stanford:stanford ./stanford/ /stanford/
COPY --chown=stanford:stanford ./run_tests.sh /stanford/
ADD --chown=stanford:stanford docker/entrypoint-*.sh /entry/

RUN mkdir -p /static && chown -R stanford:stanford /static
RUN mkdir -p /media && chown -R stanford:stanford /media

USER stanford
WORKDIR /stanford
ENV PYTHONUNBUFFERED 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
