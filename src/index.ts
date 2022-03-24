import { Type } from "./ast/Type";
import { Env } from "./Environment";
import { Evaluate } from "./Evaluator";

console.log(Evaluate.type(Type.implication(Type.atom('A'), Type.atom('A')), Env.default()))