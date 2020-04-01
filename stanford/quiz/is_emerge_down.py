#!/usr/bin/env python3

import requests
import sys
from twilio.rest import Client


account_sid = 'ACcdf7071780e152b757bee0cf3f64f4a1'
auth_token = '77a638d7f9f00d2585af81fdd6bea41a'
twilio_number='+15108518778'
twilio_client = Client(account_sid, auth_token)

def send_text(message):
    twilio_client.messages.create(body=message, from_=twilio_number, to='+16507994876')
    twilio_client.messages.create(body=message, from_=twilio_number, to='+15108624757')


def client_get_csrf(url, client):
    client.get(url)  # sets cookie
    if 'csrftoken' in client.cookies:
        csrftoken = client.cookies['csrftoken']
    else:
        csrftoken = ''

    return csrftoken

def login(url, username, password):
    client = requests.session()
    client.headers.update({'referer': 'https://emergelearning.org'})
    csrftoken = client_get_csrf(url, client)
    assert_or_text(client.post(url, data={'csrfmiddlewaretoken': csrftoken, 'username':username, 'password':password}), 200)
    return client

def assert_get(client, url, expected):
    res = client.get(url)
    assert_or_text(res, expected)

def assert_or_text(response, expected):
    if response.status_code != expected:
        send_text(f"Emerge is down: {response.url}, expected: {expected}; actual: {response.status_code}")
        send_text(response.text)
        sys.exit(1)


prefix="https://emergelearning.org/"
if __name__ == '__main__':
    client = login(prefix + "login/", "mtab", "naohy366")
    assert_get(client, prefix + "dashboard/", 200)
    assert_get(client, prefix + "api/students/self", 200)
    assert_get(client, prefix + "api/questions", 200)
    assert_get(client, prefix + "api/quizzes", 200)

