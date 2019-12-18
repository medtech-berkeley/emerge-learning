from quiz.models import QuestionUserData, Student
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

def run(*args):
    mail_subject = input("Enter mail_subject: ")
    recipient = input("Enter recipient: ")
    if len(args) < 1:
        message_file = input("Enter file name for email message: ")
    else:
        message_file = args[0]

    if len(args) < 2:
        email_file = input("Enter file name for email file:")
    else:
        email_file = args[1]

    # emails = User.objects.values_list('email', flat=True)

    # HACK: Testing only
    with open(email_file) as f:
        emails = [email.strip() for email in f.readlines() if email.strip()]

    emails.append("sean.dooher@berkeley.edu")
    # emails = ['arjunsv@berkeley.edu', "sean@dooher.net"]


    with open(message_file) as f:
        message = f.read()

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
