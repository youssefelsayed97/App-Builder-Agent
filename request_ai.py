import time
from google import genai
from google.genai.errors import ServerError, ClientError
from dotenv import load_dotenv
import os

load_dotenv()


def genai_error(i, e, m):
    wait = 2 ** i
    print(f"Attempt {i + 1}/5 failed: {e}")
    print(f"Retrying model {m} in {wait} seconds...")
    time.sleep(wait)


class RequestAI:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GENIA_API_KEY"))
        self.models = ["gemini-2.5-flash-lite", "gemini-2.5-flash"]

    def request_ai(self, prompt):

        for m in range(len(self.models)):

            for i in range(5):
                try:
                    response = self.client.models.generate_content(model=self.models[m], contents=prompt)
                    return response.text
                except ServerError as e:
                    genai_error(i, e, self.models[m])
                except ClientError as e:
                    genai_error(i, e, self.models[m])

        return None
