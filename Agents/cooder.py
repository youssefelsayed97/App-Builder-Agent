from Utils.file_manager import FileManager as fm
from request_ai import RequestAI
import os

class CoderAgent:
    def __init__(self, plan):
        self.ai = RequestAI()
        self.plan = plan
        self.root = f"generated_apps"

    def create_folders(self):
        app_name = self.plan["app_name"].lower().replace(" ", "_")

        fm.create_folders(f"{self.root}/{app_name}/lib/")
        fm.create_folders(f"{self.root}/{app_name}/assets/")

        print(f"Created project: {self.root}/{app_name}")


        # root = f"{self.root}/{app_name}"
        #
        # os.makedirs(root, exist_ok=True)
        #
        # os.makedirs(f"{root}/lib", exist_ok=True)
        # os.makedirs(f"{root}/assets", exist_ok=True)



    def code(self, plan):
        prompt = f"""
                You are an app coder.

                Create a detailed code for simple mobile application:
                Rule: 
                1- Do not add database, login or signup options in the app
                2- do not add anything out of the plan
                3- code should be simple and readable
                4- use flutter to build the app
                
                {plan}

                Return:
                - file name of the code with its file extension
                - description of the code
                - content of the code
                
                Important: Return ONLY valid JSON.

                Schema:
                
                {{
                    "file_name": "",
                    "description": "",
                    "code": "",
                }}

                """
        result = self.ai.request_ai(prompt)
        return result if result else "Coder Agent Return None"
