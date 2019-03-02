protocol UsersDatabase {
    var registeredUsers: [UserProtocol] { get };
    
    func stageOf(user mail: String) -> Int;
}
