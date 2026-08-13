import logging
from idlelib import outwin

from Utils.file_manager import FileManager as Fm
from Utils.terminal import Terminal

logger = logging.getLogger(__name__)


class TesterAgent:
    def __init__(self, app_path):
        self.app_path = app_path
        self.package_file = f"{app_path}/package.json"
        self.terminal = Terminal(self.app_path)

    def npm_install(self):
        logger.info("npm install...")

        result = self.terminal.run("npm install")

        if result["returncode"] == 0:
            return {
                "code": result["returncode"],
                "success": True,
                "message": "NPM Installation Successful",
                "stdout": result["stdout"].strip().splitlines(),
                "stderr": result["stderr"].strip().splitlines()
            }
        else:
            return {
                "code": result["returncode"],
                "success": False,
                "message": "NPM Installation Failed",
                "stdout": result["stdout"].strip(),
                "stderr": result["stderr"].strip()
            }

    def package_version_validation(self):
        errors = []
        logger.info("Package Version Validation...")

        data = Fm.read_json_file(self.package_file)

        for package, version in data["dependencies"].items():

            result = self.terminal.run(
                command=f"npm view {package}@{version} version"
            )

            if result["returncode"] != 0:

                errors.append({
                    "code": result["returncode"],
                    "package": package,
                    "version": version,
                    "error": result["stderr"].strip()
                })

        if errors:
            return {
                "code": 1,
                "success": False,
                "message": "Package Version Validation Failed",
                "errors": errors,
            }

        return {
            "code": 0,
            "success": True,
            "message": "Package Version Validation Successful",
            "errors": [],
        }

    def package_compatible_expo(self):
        output = []
        capture = False
        code = None

        logger.info("Package Compatible Expo Testing...")

        self.terminal.start()
        self.terminal.execute("npx expo install --check")
        while True:
            line = self.terminal.read_line()

            if line:

                if "npx expo install --check" in line:
                    capture = True
                    continue

                if line.strip().startswith("__COMMAND_FINISHED__"):
                    code = int(line.split()[-1])
                    break

                if capture:
                    output.append(line)

        self.terminal.close()
        output = [line.strip() for line in output if line.strip()]
        output.pop()

        if code == 0:
            return {
                "code": code,
                "success": True,
                "message": "Package Compatible Expo Testing Successful",
                "output": output
            }

        return {
            "code": code,
            "success": False,
            "message": "Package Compatible Expo Testing Failed",
            "output": output
        }