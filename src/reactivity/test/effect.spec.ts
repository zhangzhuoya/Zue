import { effect } from "../effect";
import { reactive } from "../reactive";

describe("effect",()=>{
    it("happy path",()=>{
        // create reactive obj;
        const user = reactive({
             age: 10})
        let nextAge;
        effect(()=>{
            nextAge = user.age+1;
        })
        expect(user.age).toBe(10);
        expect(nextAge).toBe(11);
        // update
        user.age++;
        expect(nextAge).toBe(12)
    })
})