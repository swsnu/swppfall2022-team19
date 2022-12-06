"""
Django settings for cu project.
Generated by 'django-admin startproject' using Django 4.1.3.
For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
secret_key_default = 'LetmeCULetmeCULetmeCULetmeCULetmeCULetmeCULetmeCU!'
SECRET_KEY = os.environ.get('SECRET_KEY', secret_key_default)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['127.0.0.1','0.0.0.0', 'localhost', '13.125.244.234', 'ec2-13-125-244-234.ap-northeast-2.compute.amazonaws.com', 'letmecu.site', '.letmecu.site']
#ALLOWED_HOSTS = ['*']

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')                      
SECURE_HSTS_SECONDS = int(os.environ.get('SECURE_HSTS_SECONDS', 31536000))
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'False') == 'True'                          # default: False
SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE', 'False') == 'True'                      # default: False
CSRF_COOKIE_SECURE = os.environ.get('CSRF_COOKIE_SECURE', 'False') == 'True'                            # default: False
SECURE_HSTS_INCLUDE_SUBDOMAINS = os.environ.get('SECURE_HSTS_INCLUDE_SUBDOMAINS', 'False') == 'True'    # default: False
SECURE_HSTS_PRELOAD = os.environ.get('SECURE_HSTS_PRELOAD', 'False') == 'True'                          # default: False
# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user.apps.UserConfig',
    'product.apps.ProductConfig',
]

# REDIS_HOST = os.environ.get("REDIS_HOST")
# ASGI_APPLICATION = 'cu.asgi.application'

MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cu.urls'

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

WSGI_APPLICATION = 'cu.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/db/db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CSRF 
CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = (
     'http://ec2-13-125-244-234.ap-northeast-2.compute.amazonaws.com:3000',
     'http://13.125.244.234:3000',
     'https://ec2-13-125-244-234.ap-northeast-2.compute.amazonaws.com:3000',
     'https://13.125.244.234:3000',
     'http://letmecu.site',
     'https://letmecu.site',
     
 )

# CORS_ORIGIN_WHITELIST = (
#    'http://ec2-13-124-241-236.ap-northeast-2.compute.amazonaws.com:3000',
#     'http://13.124.241.236:3000',
#     'https://ec2-13-124-241-236.ap-northeast-2.compute.amazonaws.com:3000',
#     'https://13.124.241.236:3000',
# )

CORS_ALLOW_HEADERS = (
    'access-control-allow-credentials',
    'access-control-allow-origin',
    'access-control-request-method',
    'access-control-request-headers',
    'accept',
    'accept-encoding',
    'accept-language',
    'authorization',
    'connection',
    'content-type',
    'dnt',
    'credentials',
    'host',
    'origin',
    'user-agent',
    'X-CSRFToken',
    'csrftoken',
    'x-requested-with',
)
# Added - Custom User model
AUTH_USER_MODEL = 'user.User'

# directory for uploading images
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') #MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), "mediafiles")

os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = 'true'



# pip install djangorestframework-simplejwt
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

'''
JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_ALLOW_REFRESH': True,
    # 'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    # 'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
}
B
'''
