import Vapor
import Fluent

struct Stage: Content {
    
    var name: String;
    var description: String;
    var steps: [String]?;
    
    init(name: String, description: String) {
        self.name = name;
        self.description = description;
    }
}

