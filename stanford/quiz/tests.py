from .models import Question, Category, QuestionUserData, Answer, Student
from unittest import skip
from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.utils import timezone
import datetime
from .sheetreader import *


@skip('Client secret missing')
class SheetsTestCase(TestCase):
    """ Tests that sheetreader.py creates correct Question and Answer models """

    def setUp(self):
        self.test_sheet = Sheet('1_RkDeLX5G-AphCnvX5bFPmGDn6dScItfB7r_PnKdOpY')
        self.test_sheet.sheet_to_models()

    def test_print(self):
        print(self.test_sheet)

    def test_questions(self):
        for question, row in zip(Question.objects.all(), self.test_sheet.rows):
            csv_question_text = row[4]
            self.assertEqual(question.text, csv_question_text)
            self.assertEqual(question.answers.count(), 6)

    def test_answers(self):
        for answer, row in zip(Answer.objects.all(), self.test_sheet.rows):
            csv_answer_text = row[1]
            self.assertIn(answer.text, 'ABCDEF')


class QuizTestCase(TestCase):
    def setUp(self):
        cat1 = Category.objects.create(name="cat1", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c1_q1 = Question.objects.create(text="c1_q1", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c1_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q1, is_correct=False)

        c1_q2 = Question.objects.create(text="c1_q2", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c1_q2, is_correct=False)

        c1_q3 = Question.objects.create(text="c1_q3", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q3, is_correct=True)

        cat2 = Category.objects.create(name="cat2", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c2_q1 = Question.objects.create(text="c2_q1", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a4", question=c2_q1, is_correct=False)

        c2_q2 = Question.objects.create(text="c2_q2", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c2_q2, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q2, is_correct=False)

        c2_q3 = Question.objects.create(text="c2_q3", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c2_q3, is_correct=True)

        cat3 = Category.objects.create(name="cat3", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c3_q1 = Question.objects.create(text="c3_q1", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a1", question=c3_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c3_q1, is_correct=False)

        c3_q2 = Question.objects.create(text="c3_q2", category=cat1, max_time=datetime.time(minute=1))
        Answer.objects.create(text="a3", question=c3_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c3_q2, is_correct=False)

        self.categories = [cat1, cat2, cat3]
        self.questions = [c1_q1, c1_q2, c1_q3, c2_q1, c2_q2, c2_q3, c3_q1, c3_q2]
        self.client = Client()
        user = User.objects.create_user(username="sean", password="nah", email="test@testing.com")
        self.student = Student.objects.create(user=user, location="London Bridge")
        self.client.login(username="sean", password="nah")

    def test_get_question_basic(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        self.assertEqual(response.status_code, 200)
        print(response.json())

    def test_get_question_multiple(self):
        pass

    def test_get_question_no_repeat(self):
        pass

    def test_get_question_all_complete(self):
        pass
