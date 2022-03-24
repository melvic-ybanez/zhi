import { Term } from "../ast/Term";
import { Fault } from "./Fault";

export type Result<A> = Fault | A

export const Result = {
    isFaulty<A>(result: Result<A>): result is Fault {
        return 'faultType' in result
    },
    isSuccess<A>(result: Result<A>): result is A {
        return !this.isFaulty(result)
    },
    map<A, B>(result: Result<A>, f: (value: A) => B): Result<B> {
        if (this.isSuccess(result)) return f(result)
        return result
    }
}