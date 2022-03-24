import { Term } from "./ast/Term"
import { Type } from "./ast/Type"
import { Env } from "./Environment"
import { Fault } from "./out/Fault"
import { Result } from "./out/Result"

export type Evaluate = (proposition: Type, env: Env) => Result<Term>

const evaluateType: Evaluate = (type, env) => {
    switch (type.type) {
        case 'Atom': {
            const atom = Env.findAtom(type, env)
            if (typeof atom !== 'undefined' && atom.termType === 'Variable') {
                if (atom.type === type) return atom
                if (atom.type.type === 'Implication') {
                    const evalIn = Evaluate.type(atom.type.antecedent, env.filter(variable => variable != atom))
                    if (Result.isFaulty(evalIn)) return evalIn
                    if (evalIn.termType === 'Conjunction') return Term.application(atom.name, evalIn.components)
                    return Term.application(atom.name, [evalIn])
                }
            }
            return Fault.cannotProve(type)
        }
        case 'Conjunction': {
            let result: Result<Term[]> = []
            for (const component of type.components) {
                const evalResult = Evaluate.type(component, env)
                if (Result.isFaulty(evalResult)) {
                    result = evalResult
                    break
                }
                result = [...result, evalResult]
            }
            return Result.map(result, Term.conjunction)
        }
        case 'Disjunction': {
            let result: Result<Term> = Fault.cannotProve(type)
            for (const component of type.components) {
                const evalResult = Evaluate.type(component, env)
                if (Result.isSuccess(evalResult)) return evalResult
                result = evalResult
            }
            return result
        }
        case 'Implication': {
            const [term, newEnv] = Env.register(type.antecedent, env)
            const evalResult = Evaluate.type(type.consequent, newEnv)
            return Result.map(evalResult, r => Term.abstraction(term, r))
        }
    }
}

const Evaluate = {
    type: evaluateType
}