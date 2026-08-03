import os
import subprocess


class Terminal:
    def __init__(self, path: str):
        self.cwd = path

        self.env = os.environ.copy()
        node_path = r"C:\Program Files\nodejs"

        if node_path not in self.env["PATH"]:
            self.env["PATH"] += ";" + node_path

        self.process = None

    def start(self):
        if self.process is not None:
            return

        self.process = subprocess.Popen(
            "cmd.exe",
            cwd=self.cwd,
            env=self.env,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )

    def run(self, command: str):
        result = subprocess.run(
            command,
            cwd=self.cwd,
            env=self.env,
            shell=True,
            capture_output=True,
            text=True
        )

        return {
            "returncode": result.returncode,
            "stdout": result.stdout,
            "stderr": result.stderr
        }

    def execute(self, command: str):
        if self.process is None or self.process.stdin is None:
            raise RuntimeError("Terminal not started")

        self.process.stdin.write(command + "\n")
        self.process.stdin.flush()

    def read_line(self):
        if self.process is None or self.process.stdout is None:
            raise RuntimeError("Terminal not started")

        return self.process.stdout.readline()

    def is_running(self):
        return self.process is not None and self.process.poll() is None

    def close(self):
        if self.process is None:
            return

        if self.process.poll() is None:
            self.process.terminate()

            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait()

        self.process = None