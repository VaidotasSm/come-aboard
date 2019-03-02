import Vapor

/// Register your application's routes here.
public func routes(_ router: Router) throws {
    // Basic "It works" example
    router.get { req in
        return "It works!"
    }
    
    

    // Example of configuring a controller
    let todoController = TodoController()
    router.get("todos", use: todoController.index)
    router.post("todos", use: todoController.create)
    router.delete("todos", Todo.parameter, use: todoController.delete)
    
    startQuest(with: router);
    
    
    // MARK: QuestRoots
    
    router.post("login") { req -> Future<HTTPStatus> in
        return try req.content.decode(StartQuestRequest.self).map(to: HTTPStatus.self) { loginRequest in
            print(loginRequest.email)
            let currentStage = getCurrentStageOf(user: loginRequest.email);
            print(currentStage);
            return .ok
        }
    };
    
}

private func getCurrentStageOf(user mail: String) -> Int {
    let users: UsersDatabase = Users();
    return users.stageOf(user: mail);
}

private func startQuest(with router: Router) {
    let helloController = HelloController();
    router.get("start", use: helloController.greet);
    
    router.get("quest", "stages") { req in
        return "stages"
    }
}
