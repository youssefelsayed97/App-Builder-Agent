import json

from google.genai._gaos.resources.interactions.googlemapsresultstep import result

from Utils.request_ai import RequestAI
from pprint import pprint

class PlannerAgent:
    def __init__(self):
        self.ai = RequestAI()

    def plan(self, app_idea):
        prompt = f"""
                You are an app planner.

                Create a detailed plan for mobile application:
                Rule: 
                1- Do not add database, login or signup options in the app
                2- Do not provide me with other information return only what "Return" shows.
                3- App should be simple
                4- Add MobAds to the app plan
                5- Do not explain.
                6- Do not use markdown
                7- Return JSON only
                
                App idea:
                    {app_idea}

                Return:
                - app type
                - screens
                - features
                - required assets
                
                [Important: Return ONLY valid JSON. No ```json]

                Schema:
                
                {{
                    "app_name": "",
                    "app_type": "",
                    "description": "",
                    "screens": [
                        {{
                            "name": "",
                            "purpose": ""
                        }}
                    ],
                    "features": [],
                    "assets": [],
                    "theme": {{
                        "style": "",
                        "primary_color": "",
                        "secondary_color": ""
                    }}
                }}
                """

        for _ in range(3):
            result = self.ai.request_ai(prompt)
            pprint(result)
            if not result:
                continue

            result = result.strip()

            if result.startswith("```"):
                result = result.replace("```json", "").replace("```", "").strip()

            try:
                return json.loads(result)
            except json.JSONDecodeError:
                prompt = f"""
                           The previous response was NOT valid JSON.
                            Return ONLY corrected valid JSON.

                             Schema:

                                 {{
                                     "app_name": "",
                                     "app_type": "",
                                     "description": "",
                                     "screens": [
                                         {{
                                             "name": "",
                                             "purpose": ""
                                         }}
                                     ],
                                     "features": [],
                                     "assets": [],
                                     "theme": {{
                                         "style": "",
                                         "primary_color": "",
                                         "secondary_color": ""
                                     }}
                                 }}
                            Previous response:
                                    {result}
                        """

        raise RuntimeError("Planner failed to generate valid JSON after 3 attempts.")

