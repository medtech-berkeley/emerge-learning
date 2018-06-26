from quiz.models import Question, Answer, Category, QuestionUserData, Student
from datetime import datetime, timedelta
import csv

def run():
	# spicy_challenge_category = create_category("Spicy Challenge", sponsor="Stanford University")
	saucy_challenge_category = create_category("Saucy Challenge", sponsor="Harvard University", is_challenge=False)
	salty_challenge_category = create_category("Salty Challenge", sponsor="Cambridge University", is_challenge=False)
	# create_questions_answers_from_csv('test.csv', spicy_challenge_category)


def create_category(category_name="Default", start=datetime.now(), 
								  end=datetime(2020,9,16), sponsor="Default", 
								  is_challenge=True):
	
	category = Category.objects.create(name=category_name, start=start, end=end,
									   sponsor=sponsor, is_challenge=is_challenge)

def create_questions_answers_from_csv(filename, category):
	with open('test.csv', encoding='utf-8') as f:
		reader = csv.reader(f)
		rownum = 0
		for row in reader:
			if rownum != 0:
				question = Question.objects.create(text=row[0], category=category, 
					                               created=datetime.now(), max_time=timedelta(days=1, hours=10))
				row = row[1:]
				for answer in row:
					if answer[:3] == '#c:':
						Answer.objects.create(text=answer[3:], is_correct=True, question=question)
					else:
						Answer.objects.create(text=answer, is_correct=False, question=question)
			else:
				rownum += 1