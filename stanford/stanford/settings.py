import os, sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '=)')
# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = os.environ.get('DJANGO_DEBUG', "TRUE") == "TRUE"
DOCKER = os.environ.get('DJANGO_DOCKER', "FALSE") == "TRUE"
TESTING = sys.argv[1:2] == ['test']
SSL = os.environ.get('DJANGO_SSL', "FALSE") == "TRUE"
DJANGO_HOSTNAME = os.environ.get('DJANGO_HOST', 'localhost')

ALLOWED_HOSTS = [DJANGO_HOSTNAME]

if DJANGO_HOSTNAME == 'localhost':
    ALLOWED_HOSTS += ['0.0.0.0', '127.0.0.1']

if SSL:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


FILE_UPLOAD_PERMISSIONS = 0o644

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'rest_framework',
    'oauth2_provider',
    'django_jenkins',
    'django_extensions',
    'quiz',
    'frontend',
    'accounts'
]


PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend/assets'),
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'quiz.middleware.UpdateLastActivityMiddleware',
    'django_user_agents.middleware.UserAgentMiddleware',
]

ROOT_URLCONF = 'stanford.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'stanford.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ.get('POSTGRES_NAME', 'postgres'),
            'USER': os.environ.get('POSTGRES_USER', 'postgres'),
            'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'postgres'),
            'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),
            'PORT': '5432',
        }
    }

if TESTING:
    PASSWORD_HASHERS = [
        'django.contrib.auth.hashers.MD5PasswordHasher',
    ]

REDIS_HOST = 'redis' if DOCKER else 'localhost'
RQ_QUEUES = {
    'default': {
        'HOST': REDIS_HOST,
        'PORT': 6379,
        'DB': 0
    },
    'high': {
        'HOST': REDIS_HOST,
        'PORT': 6379,
        'DB': 0
    },
    'low': {
        'HOST': REDIS_HOST,
        'PORT': 6379,
        'DB': 0,
    }
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "asgi_redis.RedisChannelLayer",
        "ROUTING": "stanford.routing.channel_routing",
        "CONFIG": {
            "hosts": [(REDIS_HOST, 6379)],
        },
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# LOGGING = {
#     'version': 1,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#             'stream': sys.stdout,
#         }
#     },
#     'loggers': {
#         'hub.consumers': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         }
#     }
# }

AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend',)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}

CHANNELS_API = {
    'DEFAULT_PERMISSION_CLASSES': ('channels_api.permissions.IsAuthenticated',)
}

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
if DOCKER:
    MEDIA_ROOT = '/media/'
else:
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")

if DOCKER:
    STATIC_ROOT = '/static/'
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# Email

EMAIL_USE_TLS = False,
EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = 'noreply@emergelearning.org'