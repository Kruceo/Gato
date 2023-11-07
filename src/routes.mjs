import { Router, query } from "express";
import path from "path";
import sharp from "sharp";
import fs from 'fs'
import createQueryBasedName from "./utils/createQueryBasedName.mjs";
import { logger } from "../index.mjs";
function getRouter(config) {
    /**
     * @type {Express}
     */
    const router = new Router()
    const regex = new RegExp(config.acceptHost ?? '.*')
    router.get('*', (req, res) => {
        logger.info(`${req.ip} Trying to access ${req.path}`);
        if (regex.test(req.hostname)) {
            let pr = req.path
           
            if (pr.startsWith("/")) pr = pr.slice(1)

            let p = path.resolve('./public', pr)

            if (!fs.existsSync(p)) {
                res.statusCode = 404
                res.end()
                logger.info(req.path + ' not exists');
                return;
            }
            if (!(/.png$|.jpeg$|.jpg$|.webm$/.test(req.path))) {
                res.sendFile(p)
                return
            }
            if (req.query == {}) { // send original file
                res.sendFile(p)
                return;
            }

            const qname = createQueryBasedName(req.query, pr)
            
            let o = path.resolve('./cache', qname)

            if (!config.disableCache) {
                if (fs.existsSync(o)) {   //send cached file if queryfilled file exist in hard cache
                    logger.info(`using cache (${qname})`)
                    res.sendFile(o)
                    return;
                    //------------------------------POSSIBLE END HERE--------------------------------------------------
                }
            }

            let out_img = sharp(p)

            if (req.query.resize) {
                const [w, h] = req.query.resize.split(',').map(each => parseInt(each))
                out_img = out_img.resize(w, h)
            }

            if (req.query.rotate) {
                out_img = out_img.rotate(parseInt(req.query.rotate))
            }

            if (req.query.blur) {
                out_img = out_img.blur(parseInt(req.query.blur))
            }
            if (req.query.tint) {
                const [r, g, b] = req.query.tint.split(',').map(each => parseInt(each))
                const color = { r, g, b }
                out_img = out_img.tint(color)
            }

            out_img.toFile(o).then(() => {

                res.sendFile(o)
            })

        }
        else {
            res.statusCode = 404
            res.end()
            logger.info(req.ip + ' Access denied');
        }
    })
    return router
}
export { getRouter } 