import os
import sys
import django

# Add backend directory to sys.path
backend_path = r"c:\Users\pasam\OneDrive\Desktop\thub\tx\backend"
if backend_path not in sys.path:
    sys.path.append(backend_path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Institute.settings")
django.setup()

from App.models import Trainer, AdminUser, Student, UserRegister

print("--- TRAINERS ---")
for t in Trainer.objects.all():
    print(f"ID: {t.id}, Name: {t.name}, Email: {t.email}, Active: {t.is_active}")

print("\n--- ADMIN USERS ---")
for a in AdminUser.objects.all():
    print(f"ID: {a.id}, Name: {a.name}, Email: {a.email}")

print("\n--- STUDENTS ---")
for s in Student.objects.all()[:10]:
    print(f"ID: {s.id}, Name: {s.name}, Email: {s.email}")

print("\n--- USER REGISTERS ---")
for u in UserRegister.objects.all()[:10]:
    print(f"ID: {u.id}, Name: {u.full_name}, Email: {u.email}")
