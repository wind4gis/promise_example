let koa = require('koa'),
      app = new koa(),
      path = require('path'),
      fs = require('fs'),
      server = require('koa-static')
    
app.use( async (ctx)=>{
    let flpath = path.join(__dirname, ctx.req.url)
    console.log(flpath)
    await getJson(flpath).then((data)=>{
        ctx.body = data
    }).catch(err=>{ctx.body = err})

}).listen(3000)

async function getJson(flpath) {
    return new Promise((resolve, reject)=>{
        fs.readFile(flpath, 'utf-8', (err, data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}