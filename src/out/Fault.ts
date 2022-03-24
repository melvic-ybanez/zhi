import { Atom, Type } from "../ast/Type"

export type Fault = CannotProve | ParseError | UnknownPropositions

export const Fault = {
    cannotProve(proposition: Type): CannotProve {
        return { faultType: 'CannotProve', proposition }
    },
    parseError(message: string): ParseError {
        return { faultType: 'ParseError', message }
    },
    unknownPropositions(identifiers: [Atom]): UnknownPropositions {
        return { faultType: 'UnknownPropositions', identifiers }
    }
}

export type CannotProve = {
    faultType: 'CannotProve'
    proposition: Type
}

export type ParseError = {
    faultType: 'ParseError'
    message: string
}

export type UnknownPropositions = {
    faultType: 'UnknownPropositions'
    identifiers: [Atom]
}