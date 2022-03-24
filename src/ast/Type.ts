export type Type = Atom | Conjunction | Disjuction | Implication

export const Type = {
    atom(value: string): Type {
        return {
            type: 'Atom',
            value
        }
    },
    implication(antecedent: Type, consequent: Type): Implication {
        return {
            type: 'Implication',
            antecedent,
            consequent
        }
    },
}

export type Atom = { 
    type: 'Atom'
    value: string
}

export const Atom = {
    compare(atom: Atom, type: Type): boolean {
        return type.type === 'Atom' && atom.value === type.value
    }
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