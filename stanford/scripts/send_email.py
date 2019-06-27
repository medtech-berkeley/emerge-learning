from quiz.models import QuestionUserData, Student
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

def run():
    mail_subject = input("Enter mail_subject: ") 
    recipient = input("Enter recipient: ")

    # emails = User.objects.values_list('email', flat=True)

    # HACK: Testing only
    emails = ['arjunsv@berkeley.edu', "sean@dooher.net"]

    message = read_multiline_input("Enter mail_message: ")

    send_email(mail_subject, message, recipient, emails)

def send_email(subject, message, recipient, bcc_list):
    """ Sends email with message to recipient, bcc all emails in bcc (list).
    """
    email = EmailMessage(subject, message, to=[recipient], bcc=bcc_list)
    email.send()

def read_multiline_input(prompt):
    """ Reads multiline input. Returns string.
    """
    lines = []
    while True:
        line = input(prompt)
        if line:
            lines.append(line)
        else:
            break
    text = '\n'.join(lines)
    return text