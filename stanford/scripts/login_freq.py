from quiz.models import Quiz, QuestionUserData, Student, Event, EventType
from django.db.models import Count, F, Q, Value, CharField
import json
import statistics

def get_events(student):
    return Student.objects.filter(quiz_data__quiz__name=quiz_name).distinct()

def get_login_count(student):
    events = Event.objects.filter(student=student, event_type=EventType.Login.value).order_by('time')
    return events.count()


def run(*args):
    students = Student.objects.filter(~Q(name="MTAB"))
    studs = []
    improvements = []

    for student in students:
        studs.append(student)
        improvements.append(get_login_count(student))

    # print(improvements)
    print("Number of Logins:")
    print("MIN: ", min(improvements))
    print("MAX: ", max(improvements))
    print("MEAN: ", sum(improvements) / len(improvements))
    print("STD DEV: ", statistics.stdev(improvements))
