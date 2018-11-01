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
from django.core.files import File
import csv
import datetime
# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None

def LoadFromCSV(file):
    with file.open() as f:
        reader = csv.reader(f)
        for row in reader:
            #row structure: |Question|Category|AnswerChoice|AnswerChoice|...|AnswerChoice|CorrectAnswer
            question_text = row[0]
            question_category = row[1]
            question_answer = row[-1]
            remainder = len(row) - 3
            c = Category.objects.filter(name=question_category)
            if not c.exists():
                continue
            q = Question.objects.create(text=question_text,category=c.first())
            answers = [int(x.strip()) for x in question_answer.split(',')]
            for choice in range(2, 2 + remainder):
                Answer.objects.create(text=row[choice], is_correct= (choice - 1) in answers, question=q)

def LoadCategoryFromCSV(file):
    with file.open() as f:
        reader = csv.reader(f)
        for row in reader:
            #row structure: |Name|Start|End|Sponsor|is_challenge|tags|image|difficulty
            name = row[0]
            start = datetime.datetime.strptime(row[1], "%Y/%m/%d")
            end = datetime.datetime.strptime(row[2], "%Y%m%d")
            sponsor = row[3]
            is_challenge = row[4]
            image = row[5]
            remainder = len(row) - 6
            tags = []
            for tag in range(6, 6 + remainder):
                c.tags.create(title = row[tag])

            c = Category.objects.create(name = name,
                start=start,
                end=end,
                sponsor = sponsor,
                is_challenge=is_challenge,
                image=image,
                difficulty = difficulty.upper()[0] + difficulty.lower()[1:])
            #[c.tags.add(tag) for tag in tags]
