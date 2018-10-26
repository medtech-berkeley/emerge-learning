from quiz.models import Question, Answer, Category, QuestionUserData, Student
from datetime import datetime, timedelta
from django.contrib.auth.models import User

def run():
		
	# student = Student.objects.create(user=arjunsv, location="Berkeley")
	circulation_category = Category.objects.create(name="Circulation", start=datetime.now(), end=datetime(2020,9,16), sponsor="Stanford University", is_challenge=True)
	ems_knowledge_category = Category.objects.create(name="EMS Knowledge", start=datetime.now(), end=datetime(2020,9,16), sponsor="Stanford University", is_challenge=False)
	
	circ_q1 = Question.objects.create(text="In an unresponsive and pulseless adult, how many chest compressions should be performed per minute during CPR?", category=circulation_category, created=datetime.now())
	circ_q1a1 = Answer.objects.create(text="50", is_correct=False, question=circ_q1)
	circ_q1a2 = Answer.objects.create(text="75", is_correct=True, question=circ_q1)
	circ_q1a3 = Answer.objects.create(text="100", is_correct=False, question=circ_q1)
	circ_q1a4 = Answer.objects.create(text="150", is_correct=False, question=circ_q1)

	circ_q2 = Question.objects.create(text="For which of the following patients on a cardiac monitor would you call the ERCP immediately to report an abnormality?", category=circulation_category, created=datetime.now())
	circ_q2a1 = Answer.objects.create(text="Newborn with heart rate of 160.", is_correct=True, question=circ_q2)
	circ_q2a2 = Answer.objects.create(text="1-year-old with heart rate of 140.", is_correct=False, question=circ_q2)
	circ_q2a3 = Answer.objects.create(text="24-year-old with heart rate of 46 and irregular rhythm.", is_correct=False, question=circ_q2)
	circ_q2a4 = Answer.objects.create(text="80-year-old with heart rate of 96.", is_correct=False, question=circ_q2)

	circ_q3 = Question.objects.create(text="You arrive to the scene of an unresponsive, pulseless patient. After beginning CPR, you attach an AED, which tells you to deliver a shock (defibrillation). After pressing the shock (defibrillate) button on the AED, what should you do next?", category=circulation_category, created=datetime.now())
	circ_q3a1 = Answer.objects.create(text="Check for a pulse", is_correct=False, question=circ_q3)
	circ_q3a2 = Answer.objects.create(text="Continue chest compressions", is_correct=True, question=circ_q3)
	circ_q3a3 = Answer.objects.create(text="Deliver 2 breaths to the patient.", is_correct=False, question=circ_q3)
	circ_q3a4 = Answer.objects.create(text="Wait to see if the AED tells you to deliver a second shock.", is_correct=False, question=circ_q3)

	circ_q4 = Question.objects.create(text="You arrive at the scene of a 22-year-old pregnant female who has been vomiting for 3 days and is unable to eat.  She appears very dehydrated. Where on her body should you begin searching for an IV placement site?", category=circulation_category, created=datetime.now())
	circ_q4a1 = Answer.objects.create(text="Foot", is_correct=False, question=circ_q4)
	circ_q4a2 = Answer.objects.create(text="Hand", is_correct=True, question=circ_q4)
	circ_q4a3 = Answer.objects.create(text="Neck", is_correct=False, question=circ_q4)
	circ_q4a4 = Answer.objects.create(text="Upper Arm", is_correct=False, question=circ_q4)

	ems_q1 = Question.objects.create(text="Which of the following is NOT the primary responsibility of an EMT?", category=ems_knowledge_category, created=datetime.now(), max_time=timedelta(days=1, hours=10))
	ems_q1a1 = Answer.objects.create(text="Consulting with the ERC physician for sick child with respiratory distress", is_correct=True, question=ems_q1)
	ems_q1a2 = Answer.objects.create(text="Diagnosing internal bleeding in an RTA patient", is_correct=False, question=ems_q1)
	ems_q1a3 = Answer.objects.create(text="Following EMS protocols when caring for a pregnant patient with seizures.", is_correct=False, question=ems_q1)
	ems_q1a4 = Answer.objects.create(text="Performing a focused history and examination in an elderly patient with chest pain.", is_correct=False, question=ems_q1)

	ems_q2 = Question.objects.create(text="A 55-year-old male with a history of a “heart attack” 2 years ago complains of increasing difficulty breathing for the past 2 days. Now, he is severely short of breath and only able to speak 1-2 words before stopping to breathe. While transporting the patient, what is the most appropriate patient positioning?", category=ems_knowledge_category, created=datetime.now())
	ems_q2a1 = Answer.objects.create(text="Laying supine", is_correct=False, question=ems_q2)
	ems_q2a2 = Answer.objects.create(text="Recovery position (left lateral decubitus)", is_correct=False, question=ems_q2)
	ems_q2a3 = Answer.objects.create(text="Sitting upright", is_correct=True, question=ems_q2)
	ems_q2a4 = Answer.objects.create(text="Trendelenburg (head down by 15 degrees)", is_correct=False, question=ems_q2)

	ems_q3 = Question.objects.create(text="How often should you run through the ambulance checklist to ensure your ambulance is fully stocked?", category=ems_knowledge_category, created=datetime.now())
	ems_q3a1 = Answer.objects.create(text="After caring for any patient", is_correct=False, question=ems_q3)
	ems_q3a2 = Answer.objects.create(text="Once a week", is_correct=False, question=ems_q3)
	ems_q3a3 = Answer.objects.create(text="Twice per shift", is_correct=True, question=ems_q3)
	ems_q3a4 = Answer.objects.create(text="When asked by your supervisor", is_correct=False, question=ems_q3)