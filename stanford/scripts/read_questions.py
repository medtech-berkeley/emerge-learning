import csv

def run():
	circulation_category = Category.objects.create(name="Circulation", start=datetime.now(), end=datetime(2020,9,16), sponsor="Stanford University", is_challenge=True)
	f = open('test.csv', encoding='utf-8')
	reader = csv.reader(f)

	rownum = 0
	for row in reader:
		if rownum != 0:
			question = Question.objects.create(text=row[0], category=circulation_category, created=datetime.now(), max_time=timedelta(days=1, hours=10))
			row = row[1:]
			for answer in row:
				if answer[:3] == '#c:':
					Answer.objects.create(text=answer[3:], is_correct=True, question=question)
				else:
					Answer.objects.create(text=answer, is_correct=False, question=question)
		else:
			rownum += 1
		
