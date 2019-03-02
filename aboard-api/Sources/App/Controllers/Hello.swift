//
//  Hello.swift
//  App
//
//  Created by Oleg Piruyan on 01/03/2019.
//

import Vapor

final class HelloController {
    func greet(_ req: Request) throws -> String {
        return "Hello!"
    }
}
