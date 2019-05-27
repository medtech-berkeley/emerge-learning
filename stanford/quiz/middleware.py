from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin

from .models import Student, Event, EventType, DeviceData

class UpdateLastActivityMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        assert hasattr(request, 'user'), 'The UpdateLastActivityMiddleware requires authentication middleware to be installed.'
        if request.user.is_authenticated:
            student = request.user.student
            now = timezone.now()
            if (now - student.last_activity) > timezone.timedelta(minutes=30):
                if request.user_agent.is_tablet:
                    device_type = 'tablet'
                elif request.user_agent.is_mobile:
                    device_type = 'mobile'
                else:
                    device_type = 'computer'
                device_data = DeviceData.objects.create(
                    device_family=request.user_agent.device.family,
                    browser_family=request.user_agent.browser.family,
                    browser_version=request.user_agent.browser.version_string,
                    os_family=request.user_agent.os.family,
                    os_version=request.user_agent.os.version_string,
                    device_type=device_type
                )
                Event.objects.create(event_type=EventType.Login.value, student=student, device_data=device_data)
            student.last_activity=now
            student.save()
