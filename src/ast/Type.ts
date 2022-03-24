export type Type = Atom | Conjunction | Disjuction | Implication

export const Type = {
    atom(value: string): Type {
        return {
            type: 'Atom',
            value
        }
    }
}

export type Atom = { 
    type: 'Atom'
    value: string
}

type Conjunction = {
    type: 'Conjunction'
    components: Type[]
}

type Disjuction = {
    type: 'Disjunction'
    components: Type[]
}

type Implication = {
    type: 'Implication'
    antecedent: Type
    consequent: Type
}