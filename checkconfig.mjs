import fs from 'fs'
export default function checkConfig() {
    const filePath = './config.json'
    let config = null
    if (fs.existsSync(filePath)) {
        config = JSON.parse(fs.readFileSync(filePath,'utf-8')
        )
    }
    else {
        config = {
            acceptFrom:[],
            port:8080
        }

        fs.writeFileSync(filePath,JSON.stringify(config))
    }
    return config
}