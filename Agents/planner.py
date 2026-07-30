from request_ai import RequestAI


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
                
                Important: Return ONLY valid JSON.

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
        result = self.ai.request_ai(prompt)
        return result if result else "Planner Agent Return None"
