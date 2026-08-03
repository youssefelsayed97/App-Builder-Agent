from Utils.file_manager import FileManager as Fm
from Utils.request_ai import RequestAI
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

    def save_files(self, result, root):
        for file in result["files"]:
            path = f"{root}/{file['path']}"
            Fm.create_folders(path=path, content=file["code"])

    def code(self):
        prompt = f"""
        You are an expert React Native Expo mobile app coder.

        Create a complete simple mobile application based ONLY on the provided project plan.

        Rules:
        - Use React Native with Expo framework.
        - The project must run using:
          npm install
          npm start
        - Generate all required project files.
        - Add package.json with all required dependencies and scripts.
        - Do not add database.
        - Do not add login or signup.
        - Do not add features outside the plan.
        - Keep the code simple, clean, and readable.

        Output Rules:
        - Return ONLY a valid JSON object.
        - The response must be directly parseable using Python json.loads().
        - Do not use markdown.
        - Do not use ```json.
        - Do not add explanations before or after the JSON.

        File Generation Rules:
        - Generate every required source file.
        - Each file must contain:
          - relative path from project root.
          - short description.
          - complete file content.
        - Do not generate folders.
          The system will create folders automatically from file paths.
        - Do not omit required files.
        - Preserve all import paths correctly.
        - Never use placeholders:
          - no TODO
          - no ...
          - no "implement later"

        Code Field Rules:
        - The "code" field must ALWAYS be a plain string.
        - Never return objects, arrays, or dictionaries inside "code".
        - Include imports, components, styles, and exports inside the same string.
        - Escape all double quotes inside code strings.
        - Escape all new lines inside code strings.
        - The generated JSON must remain valid after escaping.

        Assets Rules:
        - For binary files (png, jpg, etc):
          - Include the file path.
          - Keep "code" as an empty string.
        - Do not generate base64 images.
        - Do not put image data inside JSON.
        - Never use dynamic require().
        - Use static imports or static asset mappings.

        Expo Rules:
        - Use dependencies compatible with the selected Expo SDK.
        - Do not add packages that require native linking unless they support Expo.
        - Do not add expo-font unless custom fonts are required.
        - Use system fonts by default.
        - Avoid deprecated libraries.

        Before returning the response verify:
        - JSON syntax is valid.
        - package.json is valid JSON.
        - All code strings are escaped correctly.
        - All imports point to generated files.
        - The app can run after npm install and npm start.

        Project Plan:

        {self.plan}

        Required JSON Schema:

        {{
          "project_name": "ProjectName",
          "files": [
            {{
              "path": "relative/path/to/file.ext",
              "description": "Short description",
              "code": "Complete file content as plain text"
            }}
          ]
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

                Required format:
                {{
                    "project_name": "ProjectName",
                    "files": [
                            {{
                                "path": "relative/path/to/file.ext",
                                "description": "Short description",
                                "code": "Complete file content as plain text"
                            }}
                    ]
                }}

                Previous response:
                {result}
                """

        raise RuntimeError("DependencyFixer failed to generate valid JSON after 3 attempts.")
