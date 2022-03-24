import { Term } from "./ast/Term";
import { Atom, Type } from "./ast/Type";

export type Env = Term[]

type Registration = [Term, Env]

export const Env = {
    default(): Env {
        return []   
    },
    fromList(list: Term[]): Env {
        return [...list, ...Env.default()]
    },
    findAtom(atom: Atom, env: Env): Term | undefined {
        return env.find(term => {
            if (term.termType === 'Variable') {
                const atomFound = Atom.compare(atom, term.type)
                const functionFound = term.type.type === 'Implication' && Atom.compare(atom, term.type.consequent)
                return atomFound || functionFound
            }
            return false
        });
    },
    register(type: Type, env: Env): Registration {
        switch (type.type) {
            case 'Atom': return this.registerSingle(type.value.toLowerCase()[0], type, env)
            case 'Conjunction': {
                const [ids, newEnv] = type.components.reduce(([ids, env], component) => {
                    const [id, newEnv] = this.register(component, env)
                    return [[...ids, id], newEnv]
                }, [[] as Term[], env])
    
                return [Term.conjunction(ids), newEnv]
            }
            case 'Disjunction': return this.registerSingle('e', type, env)
            case 'Implication': return this.registerSingle('f', type, env)
        }
    },
    registerSingle(base: string, type: Type, env: Env): Registration {
        const variable = Term.variable(generateName(base, env), type)
        return [variable, [variable, ...env]]
    }
}

const generateName = (base: string, env: Env, count: number = 0): string => {
    const name = base + ((count == 0)? "" : count.toString)
    const registeredName = env.find(term => {
        if (term.termType === 'Variable') return term.name == name
        return false
    })
    if (typeof registeredName !== 'undefined' && registeredName.termType === 'Variable') {
        if (registeredName.name.startsWith('z')) return generateName(base, env, count + 1)
        const nextChar = (c: string) => {
            const aToZPosition = (c.charCodeAt(0) + 1 - 65) % 25
            return String.fromCharCode(aToZPosition + 65)
        }
        return generateName(nextChar(base[0]), env, count)
    }
    return name
}