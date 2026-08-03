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

    @staticmethod
    def get_file_content(path: str):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            print(content)
            print(type(content))
            return content