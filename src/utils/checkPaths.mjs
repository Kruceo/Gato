import fs from "fs";
export function checkDirs() {
    const paths = [
        './cache',
        './public'
    ]

    paths.forEach(path=>{
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
    })
}