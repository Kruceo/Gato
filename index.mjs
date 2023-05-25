import express from 'express'
import cp from 'child_process'
import fs from 'fs'
import checkConfig from './checkconfig.mjs'
import { getRouter } from './src/routes.mjs'
import { checkDirs } from './src/utils/checkPaths.mjs'

const app = express()
export const config = checkConfig()
checkDirs()
app.use(getRouter(config))
app.listen(config.port,()=>{
    console.log('server running on ' + config.port)
})