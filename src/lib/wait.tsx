

const wait = (time: number) => new Promise(resolve => setTimeout(() => { resolve(true) }, time));


export default wait;