from Agents.planner import PlannerAgent


def main():
    idea = input("App idea: ")

    planner = PlannerAgent()
    result = planner.plan(idea)

    print(result)


if __name__ == "__main__":
    main()
