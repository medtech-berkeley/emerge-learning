from quiz.models import Quiz, QuestionUserData, Student, Event, EventType
from django.db.models import Count, F, Q, Value, CharField
import json
import statistics

def get_events(student):
    return Student.objects.filter(quiz_data__quiz__name=quiz_name).distinct()

def get_average_session_len(student):
    events = Event.objects.filter(student=student).order_by('time')

    session_lengths = []
    start = None
    last = None
    for event in events:
        if start is None:
            start = event.time
        elif event.event_type == EventType.Login.value:
            session_lengths.append((last - start).total_seconds())
            start = event.time
        last = event.time
    
    if len(session_lengths) > 0:
        return sum(session_lengths) / len(session_lengths)
    else:
        return -1


def run(*args):
    students = Student.objects.all()
    improvements = []

    for student in students:
        session_len = get_average_session_len(student)
        if session_len > -1:
            improvements.append(session_len)

    # print(improvements)
    print("Session Length:")
    print("MIN: ", min(improvements))
    print("MAX: ", max(improvements))
    print("MEAN: ", sum(improvements) / len(improvements))
    print("STD DEV: ", statistics.stdev(improvements))
