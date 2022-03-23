type Proposition = Atom | Conjunction | Disjuction | Implication

type Atom = { 
    type: 'Atom'
    value: string
}

type Conjunction = {
    type: 'Conjunction'
    components: [Proposition]
}

type Disjuction = {
    type: 'Disjunction'
    components: [Proposition]
}

type Implication = {
    type: 'Implication'
    antecedent: Proposition
    consequent: Proposition
}