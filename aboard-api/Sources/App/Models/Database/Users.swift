

import Foundation

let defaultUser = User(email: "opiruyan", currentStep: 5);

struct Users: UsersDatabase {
    var registeredUsers: [UserProtocol] = [defaultUser];
    
    var usersMail: [String] = ["opiruyan"];
    
    func stageOf(user mail: String) -> Int {
        let employeeIndex = registeredUsers.firstIndex { user -> Bool in
            user.email == mail;
        }
        
        return registeredUsers[employeeIndex!].currentStep;
    }
}
