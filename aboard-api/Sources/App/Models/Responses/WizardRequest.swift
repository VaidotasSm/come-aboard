import  Vapor

struct WizardRequest: Content {
    var name: String;
    var team: String?;
}
