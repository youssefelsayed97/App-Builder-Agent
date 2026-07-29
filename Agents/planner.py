from request_ai import RequestAI


class PlannerAgent:
    def __init__(self):
        self.ai = RequestAI(model="gemini-2.5-flash-lite")

    def plan(self, app_idea):
        prompt = f"""
                You are an app planner.

                Create a detailed plan for mobile application:
                Rule: 
                1- Do not add database, login or signup options in the app
                2- Do not provide me with other information return only what "Return" shows.
                {app_idea}

                Return:
                - app type
                - screens
                - features
                - required assets
                
                """
        return self.ai.request_ai(prompt)
