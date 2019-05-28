from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin

from .models import Student, Event, EventType, DeviceData
from accounts.views import send_login_event

class UpdateLastActivityMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        assert hasattr(request, 'user'), 'The UpdateLastActivityMiddleware requires authentication middleware to be installed.'
        if request.user.is_authenticated:
            student = request.user.student
            now = timezone.now()
            if (now - student.last_activity) > timezone.timedelta(minutes=30):
                send_login_event(student, request)
            student.last_activity=now
            student.save()
