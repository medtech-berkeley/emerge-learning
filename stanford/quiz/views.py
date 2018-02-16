from django.shortcuts import render


def get_question(request):
    """
    Return random question from category that user hasn't done yet, create QuestionUserData model info
    :param request: GET request with category ID
    :return: JSONResponse of question
    """
    pass


def submit_answer(request):
    """
    Update QuestionUserData with time_completed, answer, etc. Check that question was completed in time allotted in
        Question model.
    Return JSON response in the following form:
    ```
        {
            question_id: [question_id],
            answer_id: [answer_id that user submitted],
            correct_answer: [list of correct answer_ids],
            reason: [text reason for correct answer
        }
    ```
    :param request: Post request with QuestionID and AnswerID
    :return: JSONResponse with above format
    """
    pass


# TODO: add Serializers for Questions, Categories, set up permissions
#  (instructors can view, edit questions from their organization, students can only view categories, num_completed, etc)
