from Utils.file_manager import FileManager as Fm
from request_ai import RequestAI
import json
from pprint import pprint

class CoderAgent:
    def __init__(self, plan):
        self.ai = RequestAI()
        self.plan = plan
        self.root = f"generated_apps"

    def create_folders(self):
        app_name = self.plan["app_name"].lower().replace(" ", "_")
        root = f"{self.root}/{app_name}"
        Fm.create_folders(root)

        return root
        # Fm.create_folders(f"{self.root}/{app_name}/lib/")
        # Fm.create_folders(f"{self.root}/{app_name}/assets/")

        # print(f"Created project: {self.root}/{app_name}")

        # root = f"{self.root}/{app_name}"
        #
        # os.makedirs(root, exist_ok=True)
        #
        # os.makedirs(f"{root}/lib", exist_ok=True)
        # os.makedirs(f"{root}/assets", exist_ok=True)

    def save_files(self, result, root):
        for file in result["files"]:
            path = f"{root}/{file['path']}"
            Fm.create_folders(path=path, content=file["code"])

    def code(self):
        prompt = f"""
                You are an app coder.

                Create a detailed code for simple mobile application:
                Rule: 
                - Do not add database, login or signup options in the app
                - do not add anything out of the plan
                - code should be simple and readable
                - use react native for cross platform mobile application (play store android/ app store ios)
                - Return ONLY valid JSON.
                - Do not include markdown.
                - Do not wrap the response inside ```json.
                - Do not add explanations before or after the JSON.
                - Generate every required source file for the project.
                - Each file must include its relative path and its complete code.
                - Do not omit any required files.
                - The paths must be relative to the project root.
                - Do not generate folders. The system will create them automatically from the file paths.
                - Every file must contain complete code.
                - Never use placeholders such as "// TODO", "...", or "implement later".
                - If a file is required for the project to run, generate it.
                - Preserve import paths correctly.
                - Return only the JSON object.
                
                
                Project Plan:
                           
                            {self.plan}

                JSON Schema:

                        {{
                          "project_name": "ProjectName",
                          "files": [
                            {{
                              "path": "relative/path/to/file.ext",
                              "description": "Short description",
                              "code": "Complete file content"
                            }}
                          ]
                        }}

                """
        result = self.ai.request_ai(prompt)
        pprint(result)
        return json.loads(result) if result else None
