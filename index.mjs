import express from 'express'
import cp from 'child_process'
import fs from 'fs'
import checkConfig from './src/config/checkconfig.mjs'
import { getRouter } from './src/routes.mjs'
import { checkDirs } from './src/utils/checkPaths.mjs'
import {Logger} from 'madeira'

const app = express()
export const logger = new Logger('./logs')
export const config = checkConfig()
checkDirs()
app.use(getRouter(config))
app.listen(config.port,()=>{
    logger.done('Server running. Port: ' + config.port)
})