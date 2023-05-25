import { Router } from "express";
import path from "path";
import sharp from "sharp";
function getRouter(config) {
    /**
     * @type {Express}
     */
    const router = new Router()
    const regex = new RegExp(config.accept ?? '.*')
    const image = new sharp()
    router.get('*', (req, res) => {
        if (regex.test(req.hostname)) {
            let p = path.resolve(path.join('./public', req.path))
            let o = path.resolve(path.join('./cache', req.path))
            if(!(/.png$/.test(req.path))){
                res.send('nothing here\n' + req.path)
                return
            }
            
            let out_img = sharp(p)
            
            if(req.query.resize){
                const [w,h] = req.query.resize.split(',').map(each=>parseInt(each))
                out_img = out_img.resize(w,h)
            }

            
            out_img.toFile(o).then(()=>{
                
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