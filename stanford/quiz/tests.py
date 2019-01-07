import datetime
import pytz
import random
import json

from math import ceil
from unittest import skip
from secrets import token_hex

from django.contrib.auth.models import User
from django.test import TestCase, Client, RequestFactory
from django.utils import timezone
from django.core.files.base import File

from .sheetreader import LoadFromCSV, LoadCategoryFromCSV
from .models import Question, Category, CategoryUserData, QuestionUserData, Answer, Student, Tag
from .utils import get_stats_student, get_stats_question_total, get_stats_category
from .serializers import QuestionSerializer, AnswerSerializer, CategorySerializer, FeedbackSerializer
from .serializers import QuestionUserDataSerializer, CategoryUserDataSerializer, StudentSerializer

class TestSheetReading(TestCase):
    def setUp(self):
        self.test_sheet = File(open("quiz/Test.csv"))
        self.test_sheet2 = File(open("quiz/Test - Categories.csv"))

    def test_all(self):
        LoadCategoryFromCSV(self.test_sheet2)
        self.assertEqual(len(Category.objects.all()), 12)
        # print("12 categories found")
        self.assertEqual(len(Tag.objects.all()), 33)
        # print("33 tags found")
        Category.objects.create(name="cat1", start=timezone.now(),
                                               end=timezone.now(), sponsor="none", is_challenge=False).save()
        LoadFromCSV(self.test_sheet)
        x = Question.objects.all()
        # for i in range(len(x)):
        #     ans = Answer.objects.filter(question=x[i])
        #     print(x[i].text)
        #     for an in ans:
        #         print(an.text, " CORRECT" if an.is_correct else " WRONG")
        self.assertEqual(len(Question.objects.all()), 3)
        # print("3 questions found")


class TestUtils(TestCase):
    @classmethod
    def _create_categories(cls, n):
        return [cls._create_category() for _ in range(n)]
 
    @classmethod
    def _create_questions(cls, categories, n, n_answers=4):
        return [cls._create_question(categories[i % len(categories)], n_answers) for i in range(n)]

    @classmethod
    def _create_questions_and_category(cls, n_questions, n_categories, n_answers=4):
        categories = cls._create_categories(n_categories)
        questions = cls._create_questions(categories, n_questions, n_answers)
        return questions, categories

    @staticmethod
    def _create_category():
        return Category.objects.create (
            name=token_hex(16),
            start=timezone.datetime(2000, 1, 1, tzinfo=timezone.get_default_timezone()),
            end=timezone.datetime(2038, 1, 1, tzinfo=timezone.get_default_timezone()),
            sponsor='MTAB',
            is_challenge=False,
            difficulty=Category.NOVICE
        )

    @staticmethod
    def _create_question(category, n_answers):
        question = Question.objects.create(
            text=token_hex(32),
            category=category
        )

        for i in range(n_answers):
            Answer.objects.create(
                text=token_hex(16),
                is_correct=(i == 2),
                question=question
            )

        return question

    @staticmethod
    def _create_question_userdata(question, student):
        return QuestionUserData.objects.create(
            student=student,
            question=question
        )

    @staticmethod
    def _create_category_userdata(category, student):
        return CategoryUserData.objects.create(
            student=student,
            category=category
        )

    @staticmethod
    def _create_client_and_student(username, password):
        client = Client()
        user = User.objects.create_user(username=username, password=password)
        client.login(username=username, password=password)
        return client, user.student
    
    @staticmethod
    def jsonify(json_dict):
        return json.loads(json.dumps(json_dict))


class APITest(TestUtils):
    def setUp(self):
        self.client, self.student = self._create_client_and_student("sean", "nah")
        self.student.profile_type = 'ADMN'
        self.student.save()
        self.factory = RequestFactory()
        random.seed(42)

class QuestionTest(APITest):
    def test_question_null(self):
        response = self.client.get('/api/questions/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_question_single(self):
        q, _ = self._create_questions_and_category(1, 1)
        response = self.client.get(f'/api/questions/{q[0].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), QuestionSerializer(instance=q[0]).data)

    def test_question_single_list(self):
        q, _ = self._create_questions_and_category(1, 1)
        response = self.client.get('/api/questions/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [QuestionSerializer(instance=q[0]).data])

    def test_question_many(self):
        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/{q[13].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), QuestionSerializer(instance=q[13]).data)

    def test_question_many_list(self):
        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['id'])
        control_questions = sorted(QuestionSerializer(instance=q, many=True).data, key=lambda d: d['id'])
        self.assertEqual(response_questions, control_questions)

    def test_question_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/{q[0].id}/')

        self.assertEqual(response.status_code, 403)
    
    def test_question_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/')

        self.assertEqual(response.status_code, 403)

    def test_question_permissions(self):
        self.student.profile_type = 'INST'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/{q[0].id}/')

        self.assertEqual(response.status_code, 200)

    def test_question_permissions_list(self):
        self.student.profile_type = 'INST'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/questions/')

        self.assertEqual(response.status_code, 200)


class CategoryTest(APITest):
    def test_category_null(self):
        response = self.client.get('/api/categories/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_category_single(self):
        q = self._create_categories(1)
        request = self.factory.get(f'/api/categories/{q[0].id}/')
        response = self.client.get(f'/api/categories/{q[0].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), CategorySerializer(instance=q[0], context={"request": request}).data)

    def test_category_single_list(self):
        q = self._create_categories(1)
        request = self.factory.get('/api/categories/')
        response = self.client.get('/api/categories/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [CategorySerializer(instance=q[0], context={"request": request}).data])

    def test_category_many(self):
        q = self._create_categories(50)
        request = self.factory.get(f'/api/categories/{q[13].id}/')
        response = self.client.get(f'/api/categories/{q[13].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), CategorySerializer(instance=q[13], context={"request": request}).data)

    def test_category_many_list(self):
        q = self._create_categories(50)
        request = self.factory.get('/api/categories/')
        response = self.client.get('/api/categories/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['id'])
        control_questions = sorted(CategorySerializer(instance=q, many=True, context={"request": request}).data, key=lambda d: d['id'])
        self.assertEqual(response_questions, control_questions)

    def test_category_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q = self._create_categories(50)
        response = self.client.get(f'/api/categories/{q[0].id}/')

        self.assertEqual(response.status_code, 200)

    def test_category_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q = self._create_categories(50)
        response = self.client.get('/api/categories/')

        self.assertEqual(response.status_code, 200)


class AnswerTest(APITest):
    def test_answer_null(self):
        response = self.client.get('/api/answers/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_answer_single(self):
        q, _= self._create_questions_and_category(1, 1, 1)
        a = q[0].answers.first()
        request = self.factory.get(f'/api/answers/{a.id}/')
        response = self.client.get(f'/api/answers/{a.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), AnswerSerializer(instance=a, context={"request": request}).data)

    def test_answer_single_list(self):
        q, _= self._create_questions_and_category(1, 1, 1)
        a = q[0].answers.first()
        request = self.factory.get('/api/answers/')
        response = self.client.get('/api/answers/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [AnswerSerializer(instance=a, context={"request": request}).data])

    def test_answer_many(self):
        q, _ = self._create_questions_and_category(50, 4)
        a = q[13].answers.all()[3]
        request = self.factory.get(f'/api/answers/{a.id}/')
        response = self.client.get(f'/api/answers/{a.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), AnswerSerializer(instance=a, context={"request": request}).data)

    def test_answer_many_list(self):
        q, _ = self._create_questions_and_category(50, 4)
        request = self.factory.get('/api/answers/')
        response = self.client.get('/api/answers/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['id'])
        control_questions = sorted(AnswerSerializer(instance=Answer.objects.all(), many=True, context={"request": request}).data, key=lambda d: d['id'])
        self.assertEqual(response_questions, control_questions)

    def test_answer_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get(f'/api/answers/{q[13].answers.all()[2].id}/')

        self.assertEqual(response.status_code, 403)

    def test_answer_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get('/api/answers/')

        self.assertEqual(response.status_code, 403)


class QUDTest(APITest):
    def test_qud_null(self):
        response = self.client.get('/api/questionuserdata/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_qud_single(self):
        q, _= self._create_questions_and_category(1, 1, 1)
        a = self._create_question_userdata(q[0], self.student)
        request = self.factory.get(f'/api/questionuserdata/{a.id}/')
        response = self.client.get(f'/api/questionuserdata/{a.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), QuestionUserDataSerializer(instance=a, context={"request": request}).data)

    def test_qud_single_list(self):
        q, _= self._create_questions_and_category(1, 1, 1)
        a = self._create_question_userdata(q[0], self.student)
        request = self.factory.get('/api/questionuserdata/')
        response = self.client.get('/api/questionuserdata/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [QuestionUserDataSerializer(instance=a, context={"request": request}).data])

    def test_qud_many_single_user(self):
        q, _ = self._create_questions_and_category(50, 4)
        for i, question in enumerate(q):
            qud = self._create_question_userdata(question, self.student)
            if i == 13: a = qud

        request = self.factory.get(f'/api/questionuserdata/{a.id}/')
        response = self.client.get(f'/api/questionuserdata/{a.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), QuestionUserDataSerializer(instance=a, context={"request": request}).data)

    def test_qud_many_single_user_list(self):
        q, _ = self._create_questions_and_category(50, 4)
        for i, question in enumerate(q):
            qud = self._create_question_userdata(question, self.student)
        request = self.factory.get('/api/questionuserdata/')
        response = self.client.get('/api/questionuserdata/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['question'])
        control_questions = sorted(QuestionUserDataSerializer(instance=QuestionUserData.objects.filter(student=self.student), many=True, context={"request": request}).data, key=lambda d: d['question'])
        self.assertEqual(response_questions, control_questions)

    def test_qud_many_many_user(self):
        q, _ = self._create_questions_and_category(50, 4)
        students = [self.student]
        for i in range(10):
            students.append(User.objects.create_user(f"sean{i}", "none").student)

        for student in students:
            for i, question in enumerate(q):
                qud = self._create_question_userdata(question, student)
                if i == 13 and student == self.student: a = qud

        request = self.factory.get(f'/api/questionuserdata/{a.id}/')
        response = self.client.get(f'/api/questionuserdata/{a.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), QuestionUserDataSerializer(instance=a, context={"request": request}).data)

    def test_qud_many_many_user_list(self):
        q, _ = self._create_questions_and_category(50, 4)
        students = [self.student]
        for i in range(10):
            students.append(User.objects.create_user(f"sean{i}", "none").student)

        for student in students:
            for i, question in enumerate(q):
                qud = self._create_question_userdata(question, student)

        request = self.factory.get('/api/questionuserdata/')
        response = self.client.get('/api/questionuserdata/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['question'])
        control_questions = sorted(QuestionUserDataSerializer(instance=QuestionUserData.objects.filter(student=self.student), many=True, context={"request": request}).data, key=lambda d: d['question'])
        self.assertEqual(response_questions, control_questions)

    def test_qud_many_user_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()
        q, _ = self._create_questions_and_category(50, 4)
        students = [self.student]
        for i in range(10):
            students.append(User.objects.create_user(f"sean{i}", "none").student)

        for student in students:
            for i, question in enumerate(q):
                qud = self._create_question_userdata(question, student)
                if i == 13 and student != self.student: a = qud

        request = self.factory.get(f'/api/questionuserdata/{a.id}/')
        response = self.client.get(f'/api/questionuserdata/{a.id}/')

        self.assertEqual(response.status_code, 404)

    def test_qud_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        qud = self._create_question_userdata(q[13], self.student)
        response = self.client.get(f'/api/questionuserdata/{qud.id}/')

        self.assertEqual(response.status_code, 200)

    def test_qud_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        q, _ = self._create_questions_and_category(50, 4)
        response = self.client.get('/api/questionuserdata/')

        self.assertEqual(response.status_code, 200)

class CUDTest(APITest):
    def test_cud_null(self):
        response = self.client.get('/api/categoryuserdata/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_cud_single(self):
        _, c = self._create_questions_and_category(1, 1, 1)
        a = self._create_category_userdata(c[0], self.student)
        request = self.factory.get(f'/api/categoryuserdata/{a.category.id}/')
        response = self.client.get(f'/api/categoryuserdata/{a.category.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), CategoryUserDataSerializer(instance=a, context={"request": request}).data)

    def test_cud_single_list(self):
        _, c = self._create_questions_and_category(1, 1, 1)
        a = self._create_category_userdata(c[0], self.student)
        request = self.factory.get('/api/categoryuserdata/')
        response = self.client.get('/api/categoryuserdata/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [CategoryUserDataSerializer(instance=a, context={"request": request}).data])

    def test_cud_many_single_user(self):
        _, c = self._create_questions_and_category(1, 50)
        for i, category in enumerate(c):
            cud = self._create_category_userdata(category, self.student)
            if i == 13: a = cud

        request = self.factory.get(f'/api/categoryuserdata/{a.category.id}/')
        response = self.client.get(f'/api/categoryuserdata/{a.category.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), CategoryUserDataSerializer(instance=a, context={"request": request}).data)

    def test_cud_many_single_user_list(self):
        _, c = self._create_questions_and_category(1, 50)
        for i, category in enumerate(c):
            cud = self._create_category_userdata(category, self.student)
        request = self.factory.get('/api/categoryuserdata/')
        response = self.client.get('/api/categoryuserdata/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['category'])
        control_questions = sorted(CategoryUserDataSerializer(instance=CategoryUserData.objects.filter(student=self.student), many=True, context={"request": request}).data, key=lambda d: d['category'])
        self.assertEqual(response_questions, control_questions)

    def test_cud_many_many_user(self):
        _, c = self._create_questions_and_category(1, 50)
        students = [self.student]
        for i in range(10):
            students.append(User.objects.create_user(f"sean{i}", "none").student)

        for student in students:
            for i, category in enumerate(c):
                cud = self._create_category_userdata(category, student)
                if i == 13 and student == self.student: a = cud

        request = self.factory.get(f'/api/categoryuserdata/{a.category.id}/')
        response = self.client.get(f'/api/categoryuserdata/{a.category.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), CategoryUserDataSerializer(instance=a, context={"request": request}).data)

    def test_cud_many_many_user_list(self):
        _, c = self._create_questions_and_category(1, 50)
        students = [self.student]
        for i in range(10):
            students.append(User.objects.create_user(f"sean{i}", "none").student)

        for student in students:
            for i, category in enumerate(c):
                cud = self._create_category_userdata(category, student)

        request = self.factory.get('/api/categoryuserdata/')
        response = self.client.get('/api/categoryuserdata/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['category'])
        control_questions = sorted(CategoryUserDataSerializer(instance=CategoryUserData.objects.filter(student=self.student), many=True, context={"request": request}).data, key=lambda d: d['category'])
        self.assertEqual(response_questions, control_questions)

    def test_cud_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        _, c = self._create_questions_and_category(1, 50)
        cud = self._create_category_userdata(c[13], self.student)
        response = self.client.get(f'/api/categoryuserdata/{cud.category.id}/')

        self.assertEqual(response.status_code, 200)

    def test_cud_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        _, c = self._create_questions_and_category(1, 50)
        response = self.client.get('/api/categoryuserdata/')

        self.assertEqual(response.status_code, 200)


class StudentTest(APITest):
    def test_student_single(self):
        s = [self.student]
        request = self.factory.get(f'/api/students/{s[0].id}')
        response = self.client.get(f'/api/students/{s[0].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.jsonify(StudentSerializer(instance=s[0], context={"request": request}).data))

    def test_student_single_list(self):
        s = [self.student]
        request = self.factory.get('/api/students/')
        response = self.client.get('/api/students/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.jsonify([StudentSerializer(instance=s[0], context={"request": request}).data]))

    def test_student_many(self):
        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        request = self.factory.get(f'/api/students/{s[13].id}/')
        response = self.client.get(f'/api/students/{s[13].id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.jsonify(StudentSerializer(instance=s[13], context={"request": request}).data))

    def test_student_many_list(self):
        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        request = self.factory.get(f'/api/students/')
        response = self.client.get(f'/api/students/')

        self.assertEqual(response.status_code, 200)
        response_questions = sorted(response.json(), key=lambda d: d['user']['username'])
        control_questions = sorted(map(self.jsonify, StudentSerializer(instance=s, context={"request": request}, many=True).data), key=lambda d:  d['user']['username'])
        self.assertEqual(response_questions, control_questions)

    def test_student_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        response = self.client.get(f'/api/students/{s[0].id}/')

        self.assertEqual(response.status_code, 403)
    
    def test_student_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        response = self.client.get(f'/api/students/')

        self.assertEqual(response.status_code, 403)

    def test_student_permissions(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        response = self.client.get(f'/api/students/{s[3].id}/')

        self.assertEqual(response.status_code, 404)

    def test_student_permissions_list(self):
        self.student.profile_type = 'STUD'
        self.student.save()

        s = [self.student] + [User.objects.create_user(f"sean{i}", "nah").student for i in range(50)]
        request = self.factory.get('/api/students/')
        response = self.client.get(f'/api/students/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.jsonify([StudentSerializer(instance=self.student, context={"request": request}).data]))


class QuizTestCase(TestCase):
    def setUp(self):
        cat1 = Category.objects.create(name="cat1", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c1_q1 = Question.objects.create(text="c1_q1", category=cat1)
        Answer.objects.create(text="a1", question=c1_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q1, is_correct=False)

        c1_q2 = Question.objects.create(text="c1_q2", category=cat1)
        Answer.objects.create(text="a1", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q2, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c1_q2, is_correct=False)

        c1_q3 = Question.objects.create(text="c1_q3", category=cat1)
        Answer.objects.create(text="a1", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c1_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c1_q3, is_correct=True)

        cat2 = Category.objects.create(name="cat2", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c2_q1 = Question.objects.create(text="c2_q1", category=cat2)
        Answer.objects.create(text="a1", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q1, is_correct=True)
        Answer.objects.create(text="a4", question=c2_q1, is_correct=False)

        c2_q2 = Question.objects.create(text="c2_q2", category=cat2)
        Answer.objects.create(text="a1", question=c2_q2, is_correct=True)
        Answer.objects.create(text="a2", question=c2_q2, is_correct=False)

        c2_q3 = Question.objects.create(text="c2_q3", category=cat2)
        Answer.objects.create(text="a1", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a2", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a3", question=c2_q3, is_correct=False)
        Answer.objects.create(text="a4", question=c2_q3, is_correct=True)

        cat3 = Category.objects.create(name="cat3", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)

        c3_q1 = Question.objects.create(text="c3_q1", category=cat3)
        Answer.objects.create(text="a1", question=c3_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c3_q1, is_correct=False)
        Answer.objects.create(text="a4", question=c3_q1, is_correct=False)

        c3_q2 = Question.objects.create(text="c3_q2", category=cat3)
        Answer.objects.create(text="a3", question=c3_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c3_q2, is_correct=False)

        cat4 = Category.objects.create(name="cat4", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=False)
        cat4.tags.add(Tag.objects.create(text="Respiratory"))
        cat4.difficulty = Category.INTERMEDIATE
        cat4.save()

        c4_q1 = Question.objects.create(text="c4_q1", category=cat4)
        Answer.objects.create(text="a1", question=c4_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c4_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c4_q1, is_correct=True)
        Answer.objects.create(text="a4", question=c4_q1, is_correct=False)

        c4_q2 = Question.objects.create(text="c4_q2", category=cat4)
        Answer.objects.create(text="a1", question=c4_q2, is_correct=True)
        Answer.objects.create(text="a2", question=c4_q2, is_correct=False)
        Answer.objects.create(text="a3", question=c4_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c4_q2, is_correct=False)


        cat5 = Category.objects.create(name="cat5", start=timezone.now(),
                                       end=timezone.now(), sponsor="none", is_challenge=True)
        cat5.tags.add(Tag.objects.create(text="Circulation"))
        cat5.difficulty = Category.ADVANCED
        cat5.save()

        c5_q1 = Question.objects.create(text="c5_q1", category=cat5)
        Answer.objects.create(text="a1", question=c5_q1, is_correct=True)
        Answer.objects.create(text="a2", question=c5_q1, is_correct=False)
        Answer.objects.create(text="a3", question=c5_q1, is_correct=True)
        Answer.objects.create(text="a4", question=c5_q1, is_correct=False)


        c5_q2 = Question.objects.create(text="c5_q2", category=cat5)
        Answer.objects.create(text="a1", question=c5_q2, is_correct=True)
        Answer.objects.create(text="a2", question=c5_q2, is_correct=False)
        Answer.objects.create(text="a3", question=c5_q2, is_correct=True)
        Answer.objects.create(text="a4", question=c5_q2, is_correct=False)

        self.categories = [cat1, cat2, cat3, cat4, cat5]
        self.questions = [c1_q1, c1_q2, c1_q3, c2_q1, c2_q2, c2_q3, c3_q1, c3_q2, c4_q1, c4_q2, c5_q1, c5_q2]
        self.client, self.student = self._create_client_and_student("sean", "nah", "London Bridge")

    @staticmethod
    def _create_client_and_student(username, password, location):
        client = Client()
        user = User.objects.create_user(username=username, password=password)
        student = Student.objects.get(user=user)
        student.location = location
        student.save()
        client.login(username=username, password=password)
        return client, student

    def test_get_question_basic(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        self.assertEqual(response.status_code, 200)
        question = response.json()
        self.assertEqual(question['category'], self.categories[0].id)
        self.assertEqual(len(question['answers']), 4)

    def test_get_question_multiple_categories(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        self.assertEqual(response.status_code, 200)
        question = response.json()
        self.assertEqual(question['category'], self.categories[0].id)

        response2 = self.client.get("/quiz/question", {'category': self.categories[1].id})
        self.assertEqual(response2.status_code, 200)
        question2 = response2.json()
        self.assertEqual(question2['category'], self.categories[1].id)
        self.assertNotEqual(question, question2)

        response3 = self.client.get("/quiz/question", {'category': self.categories[2].id})
        self.assertEqual(response3.status_code, 200)
        question3 = response3.json()
        self.assertEqual(question3['category'], self.categories[2].id)
        self.assertNotEqual(question, question3)
        self.assertNotEqual(question2, question3)
    
    def test_get_question_all_complete(self):
        for i in range(3):
            response = self.client.get("/quiz/question", {'category': self.categories[0].id})
            self.assertEqual(response.status_code, 200)
            question = response.json()
            self.assertEqual(question['category'], self.categories[0].id)
            self.assertEqual(len(question['answers']), 4)

            question = Question.objects.get(id=question['id'])
            answer = question.answers.filter(is_correct=True).first()

            answer_response = self.client.post("/quiz/answer", {'question': question.id, 'answer': answer.id})
            self.assertEqual(answer_response.status_code, 200)

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        # self.assertEqual(response.status_code, 204)
        question = response.json()
        self.assertEqual(question['completed'], True)

    def test_answer_basic(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

    def test_answer_multiple_attempts(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
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
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], False)

    def test_answer_multiple_categories(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        response = self.client.get("/quiz/question", {'category': self.categories[1].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

        # test multiple open at same time
        response = self.client.get("/quiz/question", {'category': self.categories[1].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        response2 = self.client.get("/quiz/question", {'category': self.categories[2].id})
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
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        category_data = CategoryUserData.objects.get(category=question.category, student=self.student)
        category_data.time_started = timezone.datetime(1, 1, 1, 0, 0, tzinfo=pytz.utc)
        category_data.save()

        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], False)  # rejected due to lateness despite being correct

    def test_answer_forgotten(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})  # user never submits an answer

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        self.assertEqual(answer_response.status_code, 200)
        answer_json = answer_response.json()
        self.assertEqual(answer_json['accepted'], True)
        self.assertEqual(answer_json['correct'], True)

    def test_stats_student(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        response = self.client.get("/quiz/question", {'category': self.categories[1].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        # test multiple open at same time
        response = self.client.get("/quiz/question", {'category': self.categories[1].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        response2 = self.client.get("/quiz/question", {'category': self.categories[2].id})
        question_id2 = response2.json()['id']
        question2 = Question.objects.get(id=question_id2)
        answer2 = question2.answers.filter(is_correct=True).first()

        answer_response2 = self.client.post("/quiz/answer", {'question': question_id2, 'answer': answer2.id})
        answer_json2 = answer_response2.json()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        self.assertEqual(3, get_stats_student(self.student)['num_correct'])

    def test_stats_question_total_single_user(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        self.assertEqual(1, get_stats_question_total(question)['num_correct'])

    def test_stats_question_total_multi_user(self):
        # assumes questions are issued in the same order across multiple students
        NUM_STUDENTS = 10

        # create  clients
        clients = [self.client]
        for _ in range(NUM_STUDENTS - 1):
            client, student = self._create_client_and_student(token_hex(4), token_hex(4), token_hex(4))
            clients.append(client)

        for i, client in enumerate(clients):
            response = client.get("/quiz/question", {'category': self.categories[0].id})
            question_id = response.json()['id']
            question = Question.objects.get(id=question_id)
            answer = question.answers.filter(is_correct=True).first()

            answer_response = client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
            answer_json = answer_response.json()

            # get stats and make sure everyone got it correct
            stats = get_stats_question_total(question)
            self.assertEqual(i + 1, stats['num_attempted'])
            self.assertEqual(i + 1, stats['num_correct'])
            self.assertEqual(0, stats['num_incorrect'])

    def test_stats_question_total_multi_user_some_wrong(self):
        # assumes questions are issued in same order to each student
        NUM_STUDENTS = 5
        # create students and clients
        clients, students = [self.client], [self.student]

        for _ in range(NUM_STUDENTS - 1):
            client, student = self._create_client_and_student(token_hex(4), token_hex(4), token_hex(4))
            clients.append(client)
            students.append(student)

        for i, client in enumerate(clients):
            response = client.get("/quiz/question", {'category': self.categories[0].id})
            question_id = response.json()['id']
            question = Question.objects.get(id=question_id)
            if i % 2 == 0:
                answer = question.answers.filter(is_correct=True).first()
            else:
                answer = question.answers.filter(is_correct=False).first()

            answer_response = client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        stats = get_stats_question_total(question)

        self.assertEqual(NUM_STUDENTS, stats['num_attempted'])
        self.assertEqual(ceil(NUM_STUDENTS / 2), stats['num_correct'])
        self.assertEqual(NUM_STUDENTS // 2, stats['num_incorrect'])

    # TODO: add tests for multiple questions
    def test_stats_question_total_null(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)

        stats = get_stats_question_total(question)
        self.assertEqual(0, stats['num_correct'])
        self.assertEqual(0, stats['num_incorrect'])
        self.assertEqual(0, stats['num_attempted'])

    def test_stats_category_single_user(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()
        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()
        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()
        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        stats = get_stats_category(category=question.category)
        self.assertEqual(3, stats['num_attempted'])
        self.assertEqual(2, stats['num_correct'])
        self.assertEqual(1, stats['num_incorrect'])

    def test_stats_category_multi_user(self):
        NUM_STUDENTS = 5

        # create students and clients
        clients = [self.client]

        for _ in range(NUM_STUDENTS - 1):
            client, student = self._create_client_and_student(token_hex(4), token_hex(4), token_hex(4))
            clients.append(client)

        for i, client in enumerate(clients):
            response = client.get("/quiz/question", {'category': self.categories[0].id})
            question = Question.objects.get(id=response.json()['id'])
            answer = question.answers.filter(is_correct=True).first()
            client.post("/quiz/answer", {'question': question.id, 'answer': answer.id})

            response = client.get("/quiz/question", {'category': self.categories[0].id})
            question = Question.objects.get(id=response.json()['id'])
            answer = question.answers.filter(is_correct=False).first()
            client.post("/quiz/answer", {'question': question.id, 'answer': answer.id})

            # every other student gets another correct
            if i % 2 == 0:
                response = client.get("/quiz/question", {'category': self.categories[0].id})
                question = Question.objects.get(id=response.json()['id'])
                answer = question.answers.filter(is_correct=True).first()
                client.post("/quiz/answer", {'question': question.id, 'answer': answer.id})

        stats = get_stats_category(category=question.category)
        self.assertEqual(NUM_STUDENTS * 2 + ceil(NUM_STUDENTS / 2), stats['num_attempted'])
        self.assertEqual(NUM_STUDENTS + ceil(NUM_STUDENTS / 2), stats['num_correct'])
        self.assertEqual(NUM_STUDENTS, stats['num_incorrect'])

    def test_stats_category_null(self):
        response = self.client.get("/quiz/question", {'category': self.categories[0].id})
        question = Question.objects.get(id=response.json()['id'])

        stats = get_stats_category(category=question.category)
        self.assertEqual(0, stats['num_attempted'])
        self.assertEqual(0, stats['num_correct'])
        self.assertEqual(0, stats['num_incorrect'])

    def test_stats_location_total(self):
        pass

    def test_stats_location_category(self):
        pass

    def test_get_completed_answers(self):
        num_questions = self.categories[0].questions.count()
        for _ in range(num_questions):
            response = self.client.get("/quiz/question", {'category': self.categories[0].id})
            question_id = response.json()['id']
            question = Question.objects.get(id=question_id)
            answer = question.answers.filter(is_correct=True).first()
            self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        response = self.client.get("/quiz/results", {'category': self.categories[0].id})
        self.assertIn(response.status_code, range(200,300))
        json = response.json()
        self.assertTrue(json['accepted'])

        num_answers = 0
        for question in json['results']:
            num_answers += 1
            self.assertIn('text', question)
            self.assertIn('answers', question)
            self.assertIn('correct', question)
            self.assertIn('selected', question)
            self.assertIn(question['selected'], question['correct'])

        self.assertEqual(num_questions, num_answers)

    def test_get_completed_answers_fail(self):
        # start a category
        self.client.get("/quiz/question", {'category': self.categories[0].id})
        # try to get answers
        response = self.client.get("/quiz/results", {'category': self.categories[0].id})
        self.assertFalse(200 <= response.status_code < 300, msg="Should not be able to get answers for a category "
                                                                "that is not completed")

    def test_get_stats_student(self):
        response = self.client.get("/quiz/question", {'category': self.categories[3].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        response = self.client.get("/quiz/question", {'category': self.categories[3].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=False).first()

        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        response = self.client.get("/quiz/question", {'category': self.categories[4].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        response = self.client.get("/quiz/question", {'category': self.categories[4].id})
        question_id = response.json()['id']
        question = Question.objects.get(id=question_id)
        answer = question.answers.filter(is_correct=True).first()

        self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})

        answer_response = self.client.post("/quiz/answer", {'question': question_id, 'answer': answer.id})
        answer_json = answer_response.json()

        result_medium = self.client.get("/stats/", {'tags': ['Respiratory', 'Surgery'], 'difficulties': ['Intermediate', 'Grandmaster']})
        self.assertEqual(1, result_medium.json()['stats']['num_correct'], msg=result_medium)

        result_hard = self.client.get("/stats/", {'tags': ['Circulation'], 'difficulties': ['Advanced']})
        self.assertEqual(2, result_hard.json()['stats']['num_correct'], msg=result_hard)

        result_medium_hard = self.client.get("/stats/", {'tags': ['Circulation', 'Respiratory'], 'difficulties': ['Intermediate', 'Advanced']})
        self.assertEqual(3, result_medium_hard.json()['stats']['num_correct'], msg=result_medium_hard)

    #TODO: Test case where tags=None or difficulties=None
    def test_get_stats_student_nullcase(self):
        pass
   
