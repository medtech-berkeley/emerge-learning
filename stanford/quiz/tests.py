from django.test import TestCase
from .sheetreader import *
# Create your tests here.

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