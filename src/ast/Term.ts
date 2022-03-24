import { Type } from "./Type"

export type Term = Variable | Conjunction | Abstraction | Application

export const Term = {
    variable(name: string, type: Type): Variable {
        return {
            termType: 'Variable',
            name,
            type
        }
    },
    conjunction(components: Term[]): Conjunction {
        return {
            termType: 'Conjunction',
            components
        }
    },
    abstraction(domain: Term, codomain: Term): Abstraction {
        return { 
            termType: 'Abstraction',
            domain, 
            codomain
        }
    },
    application(functionName: string, params: Term[]): Application {
        return {
            termType: 'Application',
            functionName,
            params
        }
    },
}

type Variable = {
    termType: 'Variable'
    name: string,
    type: Type
}

type Conjunction = {
    termType: 'Conjunction',
    components: Term[]
}

type Abstraction = {
    termType: 'Abstraction'
    domain: Term
    codomain: Term
}

type Application = {
    termType: 'Application'
    functionName: string
    params: Term[]
}