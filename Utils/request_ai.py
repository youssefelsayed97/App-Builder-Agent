import time
from google import genai
from google.genai.errors import ServerError, ClientError
from dotenv import load_dotenv
import os

from typing_extensions import runtime

load_dotenv()


def genai_error(i, e, m):
    wait = 2 ** i
    print(f"Attempt {i + 1}/5 failed.") #: {e}
    if i < 4:
        print(f"Retrying model {m} in {wait} seconds...")
        time.sleep(wait)


class RequestAI:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GENIA_API_KEY"))
        self.models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"]

    def request_ai(self, prompt):

        for m in self.models:

            for i in range(5):
                try:
                    response = self.client.models.generate_content(model=m, contents=prompt)
                    return response.text
                except (ServerError, ClientError) as e:
                    genai_error(i, e, m)

        raise RuntimeError("Request ai failed. Try again later.")
