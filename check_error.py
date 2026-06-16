import os
import django
import sys

sys.path.append(r"c:\Users\pasam\OneDrive\Desktop\thub\tx\backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tx.settings")
django.setup()

from App.models import Enrollment
from App.serializers import EnrollmentSerializer

try:
    enrollments = Enrollment.objects.select_related('user').all().order_by('-created_at')
    print("Found enrollments:", enrollments.count())
    serializer = EnrollmentSerializer(enrollments, many=True)
    data = serializer.data
    print("Serialization success! Data length:", len(data))
except Exception as e:
    import traceback
    traceback.print_exc()
