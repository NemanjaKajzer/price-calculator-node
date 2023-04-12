export class Percentage {
    value: number;

    constructor(value: number){
        this.value = value;
    }

    equals(value: number): boolean {
        return value === this.value;
    }
}