from Agents.cooder import CoderAgent
from Agents.planner import PlannerAgent
import json


def main():
    idea = input("App idea: ")

    planner = PlannerAgent()

    response = planner.plan(idea)
    print(response)

    plan_result = json.loads(response)

    coder = CoderAgent(plan_result)
    coder.create_folders()

    code_agent_result = coder.code(plan_result)
    print(code_agent_result)

    # print(coderesult)


if __name__ == "__main__":
    main()
