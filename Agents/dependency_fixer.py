import json
from Utils.request_ai import RequestAI
from Utils.file_manager import FileManager as Fm


class DependencyFixer:
    def __init__(self, package_json, error):
        self.ai = RequestAI()
        self.package_json = json.loads(Fm.get_file_content(package_json))
        self.error = error

    def fix(self):
        prompt = f"""
You are a dependency fixer for React Native Expo projects.

Analyze the following npm install error and package.json.

Error:
{self.error}

package.json:
{json.dumps(self.package_json, indent=2)}

Rules:
- Fix ONLY dependency problems.
- Keep Expo and React Native compatibility.
- Remove unavailable packages.
- Replace deprecated packages if needed.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not add explanations.

Return format:
{{
  "dependencies": {{
    "package": "version"
  }},
  "devDependencies": {{
    "package": "version"
  }}
}}
"""

        for _ in range(3):
            result = self.ai.request_ai(prompt)

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
                            
                            Required JSON Schema:
                            
                                    Return format:
                                            {{
                                              "dependencies": {{
                                                "package": "version"
                                              }},
                                              "devDependencies": {{
                                                "package": "version"
                                              }}
                                            }}
                            Previous response:
                            {result}
                        """

        raise RuntimeError("DependencyFixer failed to generate valid JSON after 3 attempts.")