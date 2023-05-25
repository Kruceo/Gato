import { imageProcesses } from "../config/types.mjs";

export default function createQueryBasedName(query, end) {
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
            if(!imageProcesses.includes(next[0])) {
                console.log('imageProcesses not includes ' + next[0])
                return acum;
            }
            return acum + next[0] + next[1].replaceAll(',', 'x') + '_'
        }, '')
    const build = start + end.replaceAll('/', '_')
    return build
}