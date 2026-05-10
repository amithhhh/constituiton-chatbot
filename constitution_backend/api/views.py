from django.shortcuts import render

# Create your views here.
import joblib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

# Define the path to your models and data relative to the Django project root or API app
# Adjust these paths as necessary based on where you store your files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DATA_DIR = os.path.join(BASE_DIR, 'models_data') # Assuming a 'models_data' folder inside 'api'

RIDGE_MODEL_PATH = os.path.join(MODEL_DATA_DIR, 'ridge_model_transformer.joblib')
SENTENCE_TRANSFORMER_MODEL_PATH = os.path.join(MODEL_DATA_DIR, 'sentence_transformer_model')
# Assuming your original DataFrame was saved as a CSV or parquet for loading
DATA_PATH = os.path.join(MODEL_DATA_DIR, 'cleaned_qa.csv') # Adjust if you saved it differently

# Global variables to hold models and embeddings
loaded_transformer_model = None
loaded_ridge_model = None
y_transformer_embeddings = None
df_original = None

def load_models_and_data():
    global loaded_transformer_model, loaded_ridge_model, y_transformer_embeddings, df_original
    if loaded_transformer_model is None:
        print("Loading Sentence Transformer model...")
        loaded_transformer_model = SentenceTransformer(SENTENCE_TRANSFORMER_MODEL_PATH)
    if loaded_ridge_model is None:
        print("Loading Ridge regression model...")
        loaded_ridge_model = joblib.load(RIDGE_MODEL_PATH)
    if df_original is None:
        print("Loading original DataFrame...")
        df_original = pd.read_csv(DATA_PATH)
        # Re-generate or load the y_transformer embeddings if not already loaded
        # For simplicity, we'll assume they need to be generated again if not persisted.
        # In a real application, you'd likely save and load these embeddings too.
        print("Generating or loading answer embeddings...")
        y_transformer_embeddings = loaded_transformer_model.encode(df_original['answer'].tolist(), show_progress_bar=False)

# Call this function once when the Django app starts to load the models
# You might need to configure this in your app's ready() method or at the top level
# For simplicity, we call it here, but a better approach for production is app.ready()
load_models_and_data()

def get_top_k_answers(predicted_embedding, all_answer_embeddings, original_df, k=3):
    # Ensure the predicted_embedding is 2D
    if predicted_embedding.ndim == 1:
        predicted_embedding = predicted_embedding.reshape(1, -1)

    # Calculate cosine similarity
    similarities = cosine_similarity(predicted_embedding, all_answer_embeddings)[0]

    # Get the indices of the top k most similar answers
    top_k_indices = similarities.argsort()[-k:][::-1]

    # Retrieve the actual answers using these indices
    top_k_answers = original_df.loc[top_k_indices, 'answer'].tolist()
    top_k_similarities = similarities[top_k_indices].tolist()

    return top_k_answers, top_k_similarities


class PredictAnswer(APIView):
    def post(self, request, *args, **kwargs):
        question_text = request.data.get('question')
        if not question_text:
            return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Encode the custom question using the transformer model
            question_embedding = loaded_transformer_model.encode([question_text])[0]

            # Predict the answer embedding using the trained Ridge model
            predicted_answer_embedding = loaded_ridge_model.predict(question_embedding.reshape(1, -1))

            # Get the top 3 predicted answers based on similarity to the predicted embedding
            top_answers, top_similarities = get_top_k_answers(
                predicted_answer_embedding,
                y_transformer_embeddings, # All answer embeddings
                df_original,              # Original DataFrame to retrieve answers
                k=3
            )

            response_data = {
                'question': question_text,
                'predicted_answers': []
            }
            for i, (answer, sim) in enumerate(zip(top_answers, top_similarities)):
                response_data['predicted_answers'].append({
                    'rank': i + 1,
                    'similarity': round(float(sim), 4),
                    'answer': answer
                })

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)