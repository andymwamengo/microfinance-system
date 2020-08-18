from django.apps import AppConfig
import pandas as pd
from joblib import load
import os
import pickle


class InstitutionConfig(AppConfig):
    name = 'institution'
    
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, 'institution/source_model/')
    CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, "model.pkl")
    classifier = pickle.load(open(CLASSIFIER_FILE, 'rb'))
