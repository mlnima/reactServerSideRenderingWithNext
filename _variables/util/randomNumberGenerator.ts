// @ts-ignore
const randomNumberGenerator = (min : number, max:number) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

module.exports = randomNumberGenerator