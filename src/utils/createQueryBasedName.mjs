import { imageProcesses } from "../config/types.mjs";

export default function createQueryBasedName(query, end) {
    let path = end;
    if (query == {}) return end;
    const start = Object.entries(query)
        .sort((a, b) => {
            if(a[0] > b[0]){
                return 1
            }
            if(a[0] < b[0]){
                return -1
            }
            return 0
        })
        .reduce((acum, next) => {
            const index = imageProcesses.indexOf(next[0])
            if(index == -1) {
                console.log('imageProcesses not includes ' + next[0])
                return acum;
            }
            return `${acum}${index}.${next[1].replaceAll(',', 'x')}.`
        }, '')
    const build = start + end.replaceAll("/",'.')
    return build
}