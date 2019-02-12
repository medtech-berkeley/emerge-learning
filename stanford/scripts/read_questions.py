from quiz.models import Question, Answer, Quiz, QuestionUserData, Student
from datetime import datetime, timedelta
import csv

def run():
	# spicy_challenge_quiz = create_quiz("Spicy Challenge")
	saucy_challenge_quiz = create_quiz("Saucy Challenge", is_challenge=False)
	salty_challenge_quiz = create_quiz("Salty Challenge", is_challenge=False)
	# create_questions_answers_from_csv('test.csv', spicy_challenge_quiz)


def create_quiz(quiz_name="Default", start=datetime.now(), 
								  end=datetime(2020,9,16),
								  is_challenge=True):
	
	quiz = Quiz.objects.create(name=quiz_name, start=start, end=end, is_challenge=is_challenge)

def create_questions_answers_from_csv(filename, quiz):
	with open('test.csv', encoding='utf-8') as f:
		reader = csv.reader(f)
		rownum = 0
		for row in reader:
			if rownum != 0:
				question = Question.objects.create(text=row[0], quiz=quiz, 
					                               created=datetime.now())
				row = row[1:]
				for answer in row:
					if answer[:3] == '#c:':
						Answer.objects.create(text=answer[3:], is_correct=True, question=question)
					else:
						Answer.objects.create(text=answer, is_correct=False, question=question)
			else:
				rownum += 1