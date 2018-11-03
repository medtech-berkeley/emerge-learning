from __future__ import print_function
import httplib2
import os
import datetime
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from django.utils import timezone
from .models import Category, Question, Answer, Tag
from django.core.files import File
import csv
import datetime
import pytz

# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None

def LoadFromCSV(file):
    with file.open("rt") as f:
        reader = csv.reader(f)
        for row in reader:
            row = [x for x in row if x != '']
            #row structure: |Question|Category|AnswerChoice|AnswerChoice|...|AnswerChoice|CorrectAnswer
            question_text = row[0][:300]
            question_category = row[1]
            question_answer = row[-1]
            remainder = len(row) - 3
            c = Category.objects.filter(name=question_category)
            if not c.exists():
                continue
            q = Question.objects.create(text=question_text,category=c.first())
            answers = [int(x.strip()) for x in question_answer.split(',')]
            for choice in range(2, 2 + remainder):
                Answer.objects.create(text=row[choice], is_correct= (choice - 1) in answers, question=q).save()
            q.save()

def LoadCategoryFromCSV(file):
    with file.open("rt") as f:
        reader = csv.reader(f)
        for row in reader:
            #row structure: |Name|Start|End|Sponsor|is_challenge|tags|image|difficulty
            row = [x for x in row if x != '']
            name = row[0]
            start = pytz.utc.localize(timezone.datetime.strptime(row[1], "%Y/%m/%d"))
            end = pytz.utc.localize(timezone.datetime.strptime(row[2], "%Y/%m/%d"))
            sponsor = row[3]
            is_challenge = row[4] == "TRUE"
            image = row[-2]
            difficulty = row[-1]
            remainder = len(row) - 7
            if (len(Category.objects.all().filter(name=name)) != 0):
                continue
            c = Category.objects.create(name = name,
                start=start,
                end=end,
                sponsor = sponsor,
                is_challenge=is_challenge,
                image=image,
                difficulty = difficulty.upper()[0] + difficulty.lower()[1:])
            for tag in range(5, 5 + remainder):
                if (len(Tag.objects.filter(text=row[tag])) == 0):
                    c.tags.create(text = row[tag]).save()
            c.save()

            #[c.tags.add(tag) for tag in tags]
