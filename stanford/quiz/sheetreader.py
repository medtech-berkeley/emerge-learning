from __future__ import print_function
import httplib2
import os
import datetime
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from django.utils import timezone
from .models import Category, Question, Answer

# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None

SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'gsheets test'

class Sheet:
    def __init__(self, sheet_id):
        self.values = self.read_csv_to_list(sheet_id)
        self.col_headers = self.values[0]
        self.rows = self.values[1:]
        self.sheet_id = sheet_id

    def get_credentials(self):
        """ Get credentials required to authenticate access to Google sheets """
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir,
                                       'sheets.googleapis.com-python-quickstart.json')
        
        store = Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
            flow.user_agent = APPLICATION_NAME
            if flags:
                credentials = tools.run_flow(flow, store, flags)
            else: 
                credentials = tools.run(flow, store)
            print('Storing credentials to ' + credential_path)
        return credentials

    def read_csv_to_list(self, sheet_id):
        """ Parse Google Sheets and return 2D List of rows """
        credentials = self.get_credentials()
        http = credentials.authorize(httplib2.Http())
        discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                        'version=v4')
        service = discovery.build('sheets', 'v4', http=http,
                                  discoveryServiceUrl=discoveryUrl)

        spreadsheetId = sheet_id
        rangeName = 'Sasprep!A:H'
        result = service.spreadsheets().values().get(
            spreadsheetId=spreadsheetId, range=rangeName).execute()
        values = result.get('values', [])
        if not values:
            print('No data found.')
        return values

    def sheet_to_models(self):
        """ Turns a sheet objec into Question and Answer models """
        all_questions = Category.objects.create(name="all_questions", start=timezone.now(), end=timezone.now(), sponsor="Stanford EMI", is_challenge=False)
        answer_choices = 'ABCDEF'
        for row in self.rows:
            question_text = row[4]
            correct_answer = row[1]
            curr_q = Question.objects.create(text=question_text, category=all_questions, created=timezone.now())
            curr_a = Answer.objects.create(text=correct_answer, is_correct=True, question=curr_q)
            for choice in answer_choices:
                if choice != correct_answer:
                    Answer.objects.create(text=choice, is_correct=False, question=curr_q)

    def __str__(self):
        return "COLUMN HEADERS: " + str(self.col_headers) + " NUM_ROWS: " + str(len(self.rows))