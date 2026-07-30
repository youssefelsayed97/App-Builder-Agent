from Agents.coder import CoderAgent
from Agents.planner import PlannerAgent
from pprint import pprint

def main():
    idea = input("App idea: ")

    planner = PlannerAgent()

    response = planner.plan(idea)
    pprint(response)

    coder = CoderAgent(response)
    root = coder.create_folders()

    coder_results = coder.code()
    if coder_results:

        coder.save_files(result=coder_results, root=root)

        print(coder_results["project_name"], "has been created")


if __name__ == "__main__":
    main()
