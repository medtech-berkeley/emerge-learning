from __future__ import print_function
import httplib2
import os
import datetime
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from django.utils import timezone
from .models import Quiz, Question, Answer, Tag, QuestionMedia, Category
from django.core.files import File
import csv
import datetime
import pytz
import re
import logging

logger = logging.getLogger(__name__)

# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None

def LoadFromCSV(file):
    with file.open("rt") as f:
        reader = csv.reader(f)
        for row in list(reader)[1:]:
            try:
                row = [x for x in row]
                #row structure: |ID|Question|Category|Difficulty|Multimedia Type|Media Filename|Pretest/PostTest|Tags|AnswerChoice|AnswerChoice|...|AnswerChoice|CorrectAnswer
                num_fields = 9

                question_id = int(row[0])
                question_text = row[1]
                question_category = row[2]
                question_course = row[3]
                difficulty = row[4].title()
                multimedia_type = row[5].upper()
                multimedia_filename = row[6]
                pretest = row[7].lower()
                tags = row[8].split()

                # 9 + N_ANSWERS(=4) = 12
                question_answer = row[13]
                answer_explanation = row[14]
                reference = row[15]
                remainder = 4

                c = Category.objects.filter(name=question_category)
                if not c.exists():
                    c = Category.objects.create(name=question_category)
                else:
                    c = c.first()

                #clean difficulty into accepted format (defaulting to basic)
                clean_difficulty = Question.BASIC
                for rep, _ in Question.DIFFICULTY_CHOICES:
                    if difficulty == rep:
                        clean_difficulty = rep

                q = Question.objects.filter(id=question_id)
                if not q.exists():
                    q = Question.objects.create(id=question_id,
                                                text=question_text,
                                                category=c,
                                                difficulty=clean_difficulty)
                else:
                    q = q.first()
                    q.text = question_text
                    q.category = c
                    q.difficulty = clean_difficulty
                    q.save()

                # add course metadata to question
                q.courses.clear()
                q.add_course(question_course)

                #clean multimedia into accepted format (defaulting to none)
                clean_multimedia = None
                for rep, _ in QuestionMedia.MEDIA_CHOICES:
                    if multimedia_type == rep:
                        clean_multimedia = rep

                m = q.media
                if clean_multimedia is not None:
                    if m is not None:
                        m.media_type = clean_multimedia
                        m.filename = multimedia_filename
                        m.save()
                    else:
                        m = QuestionMedia.objects.create(media_type=clean_multimedia,
                                                         media_file=multimedia_filename)
                    q.media = m
                elif m is not None:
                    q.media = None
                    m.delete()
                q.save()

                if pretest == 'y':
                    tags.append('pretest')

                practice = True
                # add all tags to the quest
                q.tags.clear()
                for tag_text in tags:
                    q.add_tag(tag_text)
                    if tag_text == 'pretest' or re.match('week-[0-9]+', tag_text):
                        practice == False
                # if practice:
                #     q.tags.add(c.practice_tag)
                q.save()

                answers = [int(x.strip()) for x in question_answer.split(',')]
                for choice in range(remainder):
                    a = Answer.objects.filter(num=choice, question=q)
                    if a.exists():
                        a = a.first()
                        a.text = row[num_fields + choice]
                        a.is_correct = (choice + 1 in answers)
                        a.explanation = answer_explanation
                        a.save()
                    else:
                        a = Answer.objects.create(num=choice,
                                                  text=row[num_fields + choice],
                                                  is_correct= (choice + 1) in answers,
                                                  question=q,
                                                  explanation = answer_explanation)

                for answer in Answer.objects.filter(num__gte=remainder, question=q):
                    answer.delete()
            except Exception as e:
                logger.exception(e)

def LoadQuizFromCSV(file):
    with file.open("rt") as f:
        reader = csv.reader(f)
        for row in list(reader)[1:]:
            try:
                #row structure: |Name|Image|Start|End|is_challenge|retake|required|tags|limit
                row = [x for x in row]
                name = row[0]
                course = row[1]
                image = row[2]
                start = pytz.utc.localize(timezone.datetime.strptime(row[3], "%Y/%m/%d"))
                end = pytz.utc.localize(timezone.datetime.strptime(row[4], "%Y/%m/%d"))
                is_challenge = row[5].upper() == "TRUE"
                retake = row[6].upper() == "TRUE"
                required = row[7].upper() == "TRUE"
                tags = row[8].split()
                limit = int(row[9])

                q = Quiz.objects.filter(name=name)
                if q.exists():
                    q = q.first()
                    q.start = start
                    q.end = end
                    q.is_challenge = is_challenge
                    q.image = image
                    q.num_questions = limit
                    q.can_retake = retake
                    q.required = required
                else:
                    q = Quiz.objects.create(name = name,
                        start=start,
                        end=end,
                        is_challenge=is_challenge,
                        image=image,
                        can_retake=retake,
                        num_questions=limit,
                        required=required)

                q.add_course(course)
                q.tags.clear()
                for tag_text in tags:
                    q.add_tag(tag_text)
                q.save()
            except Exception as e:
                print(e)
