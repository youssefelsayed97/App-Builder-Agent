import os
from Utils.terminal import Terminal


class TesterAgent:
    def __init__(self, app_path):
        self.app_path = app_path
        self.terminal = Terminal(self.app_path)

    def npm_install(self):
        install_result = self.terminal.run("npm install")
        print(install_result)
        if install_result["returncode"] == 0:
            print(install_result["stdout"])

        return install_result