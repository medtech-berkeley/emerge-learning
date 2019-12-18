from quiz.models import Question, QuestionUserData, Quiz, Student, Feedback
from quiz.models import Event, EventType
from quiz.models import Student, Quiz, Question, Answer, QuestionUserData, QuizUserData, GVK_EMRI_Demographics
from quiz.tables import EventTable, StudentTable, QuestionUserDataTable, QuizUserDataTable
from quiz.tables import QuestionTable, QuizTable, AnswerTable, DemographicsTable

from django_tables2.export import TableExport

import os

NAME_TO_TABLE = {
                    'students': StudentTable,
                    'quiz': QuizTable,
                    'question': QuestionTable,
                    'answer': AnswerTable,
                    'question_userdata': QuestionUserDataTable,
                    'quiz_userdata': QuizUserDataTable,
                    'events': EventTable,
                    # 'demographics': DemographicsTable,
                }

NAME_TO_MODEL = {
                    'students': Student,
                    'quiz': Quiz,
                    'question': Question,
                    'answer': Answer,
                    'question_userdata': QuestionUserData,
                    'quiz_userdata': QuizUserData,
                    'events': Event,
                    # 'demographics': GVK_EMRI_Demographics,
                }

def run(*args):
    if len(args) < 2:
        print("Usage: dump_csv --script-args [[table1],[table2],...] [output folder]")
        return

    if args[0].lower() == 'all':
        tables = [table for table in NAME_TO_TABLE]
    else:
        tables = [NAME_TO_TABLE[table] for table in args[0].lower().split(',')]
    
    output_folder = os.path.expanduser(args[1])

    if not os.path.isdir(output_folder):
        print(f"Error: {args[1]} is not a valid location for output (does not exist or is not a folder)")
        return

    for i, table in enumerate(tables):
        print(f"===== Creating {table}.csv ({i + 1} / {len(tables)}) =====")

        curr_table = NAME_TO_TABLE[table](NAME_TO_MODEL[table].objects.all())
        csv_data = TableExport("csv", curr_table).export()

        with open(os.path.join(output_folder, f"{table}.csv"), 'w') as output_file:
            output_file.write(csv_data)
    
    print ("All tables complete!")