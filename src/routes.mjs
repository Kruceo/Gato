import { Router, query } from "express";
import path from "path";
import sharp from "sharp";
import fs from 'fs'
import createQueryBasedName from "./utils/createQueryBasedName.mjs";
function getRouter(config) {
    /**
     * @type {Express}
     */
    const router = new Router()
    const regex = new RegExp(config.accept ?? '.*')
    const image = new sharp()
    router.get('*', (req, res) => {
        if (regex.test(req.hostname)) {
            if (!(/.png$/.test(req.path))) {
                res.send('nothing here\n' + req.path)
                return
            }
            let p = path.resolve(path.join('./public', req.path))

            if (req.query == {}) { // send original file
                res.sendFile(p)
                return;
            }

            const qname = createQueryBasedName(req.query, req.path)
            let o = path.resolve(path.join('./cache', qname))

            if (!config.disableCache) {
                if (fs.existsSync(o)) {   //send cached file if queryfilled file exist in hard cache
                    res.sendFile(o)
                    return;
                }
            }

            let out_img = sharp(p)

            if (req.query.resize) {
                const [w, h] = req.query.resize.split(',').map(each => parseInt(each))
                out_img = out_img.resize(w, h)
            }
            console.log(req.query)
            if (req.query.rotate) {

                out_img = out_img.rotate(req.query.rotate)
            }

            out_img.toFile(o).then(() => {

                res.sendFile(o)
            })

        }
        else {
            res.statusCode = 404
            res.end()
        }
    })
    return router
}
export { getRouter } 