import fs from "fs";
import * as paths from './paths.mjs'
export function checkDirs() {
    Object.values(paths)
    .forEach(path=>{
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
    })
}