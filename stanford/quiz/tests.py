from .models import Question, Category, QuestionUserData, Answer, Student
from unittest import skip
from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.utils import timezone
import datetime
from .sheetreader import Sheet


@skip
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

        c1_q1 = Question.objects.create(text="c1_q1", category=cat1, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c1_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q1, is_correct=False)

        c1_q2 = Question.objects.create(text="c1_q2", category=cat1, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c1_q2, is_correct=False)

        c1_q3 = Question.objects.create(text="c1_q3", category=cat1, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q3, is_correct=True)

        cat2 = Category.objects.create(name="cat2", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c2_q1 = Question.objects.create(text="c2_q1", category=cat2, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a4", question=c2_q1, is_correct=False)

        c2_q2 = Question.objects.create(text="c2_q2", category=cat2, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c2_q2, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q2, is_correct=False)

        c2_q3 = Question.objects.create(text="c2_q3", category=cat2, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c2_q3, is_correct=True)

        cat3 = Category.objects.create(name="cat3", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c3_q1 = Question.objects.create(text="c3_q1", category=cat3, max_time=datetime.timedelta(minutes=1))
        Answer.objects.create(text="a1", question=c3_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c3_q1, is_correct=False)

        c3_q2 = Question.objects.create(text="c3_q2", category=cat3, max_time=datetime.timedelta(minutes=1))
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
        question = response.json()
        self.assertEqual(question['category'], 'cat1')
        self.assertEqual(len(question['answers']), 4)

    def test_get_question_multiple_categories(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        self.assertEqual(response.status_code, 200)
        question = response.json()
        self.assertEqual(question['category'], 'cat1')

        response2 = self.client.get("/quiz/question", {'category': 'cat2'})
        self.assertEqual(response2.status_code, 200)
        question2 = response2.json()
        self.assertEqual(question2['category'], 'cat2')
        self.assertNotEqual(question, question2)

        response3 = self.client.get("/quiz/question", {'category': 'cat3'})
        self.assertEqual(response3.status_code, 200)
        question3 = response3.json()
        self.assertEqual(question3['category'], 'cat3')
        self.assertNotEqual(question, question3)
        self.assertNotEqual(question2, question3)

    def test_get_question_all_complete(self):
        questions = []
        for i in range(3):
            response = self.client.get("/quiz/question", {'category': 'cat1'})
            self.assertEqual(response.status_code, 200)
            question = response.json()
            self.assertEqual(question['category'], 'cat1')
            self.assertEqual(len(question['answers']), 4)
            questions.append(question)

        response = self.client.get("/quiz/question", {'category': 'cat1'})
        # self.assertEqual(response.status_code, 204)
        question = response.json()
        self.assertEqual(question['accepted'], False)

    def test_answer_basic(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

    def test_answer_multiple_attempts(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], False)

        new_answer = question.answers.filter(is_correct=True).first()
        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': new_answer.id})
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], False)

    def test_answer_sequential_questions(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], False)

    def test_answer_multiple_categories(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': 'cat2'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        # test multiple open at same time
        response = self.client.get("/quiz/question", {'category': 'cat2'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        response2 = self.client.get("/quiz/question", {'category': 'cat3'})
        question_id2 = response2.json()['id']
        question2 = Question.objects.get(id=question_id2)
        answer2 = question2.answers.filter(is_correct=True).first()

        answer_response2 = self.client.post("/quiz/answer", {'question': question_id2, 'answer': answer2.id})
        self.assertEqual(answer_response2.status_code, 200)
        answer_json2 = answer_response2.json()
        self.assertEqual(answer_json2['accepted'], True)
        self.assertEqual(answer_json2['correct'], True)

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

    def test_answer_late(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        user_data = QuestionUserData.objects.get(question = question, student=self.student)
        user_data.time_started = datetime.datetime.min
        user_data.save()

        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], False)  # rejected due to lateness despite being correct

    def test_answer_forgotten(self):
        response = self.client.get("/quiz/question", {'category': 'cat1'})  # user never submits an answer

        response = self.client.get("/quiz/question", {'category': 'cat1'})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)
