import logging
from google import genai
from google.genai.errors import ServerError
from dotenv import load_dotenv
import os

load_dotenv()


class RequestAI:
    def __init__(self, model):
        self.client = genai.Client(api_key=os.getenv("GENIA_API_KEY"))
        self.model = model

    def set_model(self, model):
        self.model = model

    def request_ai(self, prompt):
        try:
            response = self.client.models.generate_content(model=self.model, contents=prompt)
            return response.text
        except ServerError as e:
            logging.error(e)
            return None
