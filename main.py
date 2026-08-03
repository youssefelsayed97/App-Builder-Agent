from Agents.coder import CoderAgent
from Agents.planner import PlannerAgent
from pprint import pprint
from Agents.dependency_fixer import DependencyFixer
from Agents.tester import TesterAgent


def main():
    root = ""
    idea = input("App idea: ")

    print("Planner is running...")
    planner = PlannerAgent()

    response = planner.plan(idea)
    pprint(response)

    print("coder is running...")

    coder = CoderAgent(response)

    coder_results = coder.code()
    if coder_results:
        root = coder.create_folders()
        coder.save_files(result=coder_results, root=root)

        print(coder_results["project_name"], "has been created")
    print(f"root = {root}")

    print("tester is running...")
    tester = TesterAgent(app_path=root)
    result = tester.npm_install()

    if result['returncode'] != 0:
        print("fixer is running...")
        fixed_name = coder_results['project_name'].lower().replace(" ", "_")
        print(fixed_name)
        #in case package error
        fixer = DependencyFixer(package_json=fr"C:\Users\HP\PycharmProjects\App-Builder-Agent\generated_apps\{fixed_name}\package.json",
                                error= result['stderr'])

        result = fixer.fix()
        print(result)


if __name__ == "__main__":
    main()
    # from Utils.terminal import Terminal
    # t = Terminal(path=r"C:\Users\HP\Desktop\generated phone apps\simple_calculator")
    # t.start()
    # t.execute(command="npm install")
    # t.execute(command="npm start")
    # t.execute(command="npx expo install --fix")
    # t.execute(command="npx expo start --android")
    # while True:
    #     line = t.read_line()
    #     if line:
    #         print(line)
            # if "upgrade?" in line:
            #     t.execute(command="n")
            # elif "Logs for your project will appear below." in line:
            #     t.execute(command="a")

