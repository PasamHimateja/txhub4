import hashlib
import urllib.parse
import os
from django.conf import settings

# BBB API endpoints and secret
# You can override these in settings or .env
BBB_URL = os.environ.get('BBB_URL', 'https://test-install.blindsidenetworks.com/bigbluebutton/api')
BBB_SECRET = os.environ.get('BBB_SECRET', '8cd8ef52e8e101574e400365b55e11a6')

def generate_checksum(call_name, query_string):
    """Generate SHA1 checksum required by BBB API"""
    raw = call_name + query_string + BBB_SECRET
    return hashlib.sha1(raw.encode('utf-8')).hexdigest()

def get_create_meeting_url(meeting_id, name, attendee_pw='ap', moderator_pw='mp'):
    """Generate the URL to create a meeting"""
    params = {
        'name': name,
        'meetingID': meeting_id,
        'attendeePW': attendee_pw,
        'moderatorPW': moderator_pw,
        'record': 'false'
    }
    query_string = urllib.parse.urlencode(params)
    checksum = generate_checksum('create', query_string)
    return f"{BBB_URL}/create?{query_string}&checksum={checksum}"

def get_join_url(meeting_id, full_name, password):
    """Generate the URL to join a meeting"""
    params = {
        'fullName': full_name,
        'meetingID': meeting_id,
        'password': password,
        'redirect': 'true'
    }
    query_string = urllib.parse.urlencode(params)
    checksum = generate_checksum('join', query_string)
    return f"{BBB_URL}/join?{query_string}&checksum={checksum}"
