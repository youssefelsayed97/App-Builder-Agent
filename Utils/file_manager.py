from pathlib import Path


class FileManager:

    @staticmethod
    def create_folders(path: str, content: str=""):
        path = Path(path)
        if path.suffix:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
        else:
            path.mkdir(parents=True, exist_ok=True)