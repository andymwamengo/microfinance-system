"""
Application configurations model loading
"""
import os
import pickle

from django.apps import AppConfig


class InstitutionConfig(AppConfig):
    name = 'institution'

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, 'institution/source_model/')
    CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, "income.pkl")
    classifier = pickle.load(open(CLASSIFIER_FILE, 'rb'))
