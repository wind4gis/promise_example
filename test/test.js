import {addHtmlToPage, addTextToPage, get, getJSON, getChapter} from './myPromise'
const assert = require('assert')
describe('get异步读取数据', function () {
     it('Promise异步读取json', function(done){
        get('http://localhost:9876/static/story.json').then(function(response) {
            console.log("Success!", response);
            assert.equal(JSON.parse(response).heading,"A story about something") 
            done()
        }, function(error) {
            console.error("Failed!", error);
            done()
        })
    }) 
    it('Promise异步读取错误的json并提示错误', function(done){
        get('http://error.server:9876/static/story.json').then(function(response) {
            console.log("Success!", response);
            done()
        }, function(error) {
            console.error("Promise异步读取报错", error);
            assert.deepEqual(error, 'timeout')
            done()
        }) 
        get('/').then(JSON.parse).then(function() {
            // This never happens, '/' is an HTML page, not JSON
            // so JSON.parse throws
            console.log("Promise异步读取成功!", data);
            done()
        }).catch(function(err) {
            // Instead, this happens:
            console.log("Promise异步读取报错!", err);
            done()
        })
    })
})  
describe('getJSON异步读取数据', function () {
     it('Promise异步读取json', function(done){
        getJSON('http://localhost:9876/static/story.json').then(function(story) {
            return getJSON(`http://localhost:9876/static/${story.chapterUrls[0]}`);
        }).then(function(chapter1) {
            console.log("读取第一章节!", chapter1);
            done()
        }) 
        getJSON('http://localhost:9876/static/story.json').then(function(response) {
            console.log("读取成功!", response);
            done()
        }, function(error) {
            console.error("读取失败!", error);
            done()
        }) 
    }) 
    it('Promise异步读取错误的json并提示错误', function(done){
        get('http://error.server:9876/static/story.json').then(function(response) {
            console.log("读取成功!", response);
            done()
        }, function(error) {
            console.error("读取失败!", error);
            done()
        }) 
        
    })
    it('Promise错误提示', function(done){
        var jsonPromise = new Promise(function(resolve, reject) {
            resolve(JSON.parse("This ain't JSON"));
        });
        
        jsonPromise.then(function(data) {
            // This never happens:
            console.log("JSON格式正确!", data);
            done()
        }).catch(function(err) {
            // Instead, this happens:
            console.log("JSON格式不规范!", err);
            done()
        })
    }) 
}) 
describe('异步串行的多种写法',()=>{
    it('异步串行-Promise手动调用多次-不能保证顺序',(done)=>{
        /*var story = getJSON('http://localhost:9876/static/story.json')
        story.then(function(story) {
            getJSON(`http://localhost:9876/static/${story.chapterUrls[0]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html)
            }).catch(function(err){
                console.log(err)
            })
            getJSON(`http://localhost:9876/static/${story.chapterUrls[1]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
            }).catch(function(err){
                console.log(err)
            })
            getJSON(`http://localhost:9876/static/${story.chapterUrls[2]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html)
            }).catch(function(err){
                console.log(err)
            })
            getJSON(`http://localhost:9876/static/${story.chapterUrls[3]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
            }).catch(function(err){
                console.log(err)
            })
            getJSON(`http://localhost:9876/static/${story.chapterUrls[4]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
                done()
            }).catch(function(err){
                console.log(err)
                done()
            })
        })*/
        getChapter(0).then(function(chapter) {
            console.log(chapter.html)
            addHtmlToPage(chapter.html)
        }).catch(function(err){
            console.log(err)
        })
        getChapter(1).then(function(chapter) {
            console.log(chapter.html)
            addHtmlToPage(chapter.html)
        }).catch(function(err){
            console.log(err)
        })
        getChapter(2).then(function(chapter) {
            console.log(chapter.html)
            addHtmlToPage(chapter.html)
        }).catch(function(err){
            console.log(err)
        })
        getChapter(3).then(function(chapter) {
            console.log(chapter.html)
            addHtmlToPage(chapter.html)
        }).catch(function(err){
            console.log(err)
        })
        getChapter(4).then(function(chapter) {
            console.log(chapter.html)
            addHtmlToPage(chapter.html)
            done()
        }).catch(function(err){
            console.log(err)
            done()
        })
    })
    it('异步串行-Promise链-保证异步执行的顺序',(done)=>{
        var story = getJSON('http://localhost:9876/static/story.json'),
        chapterUrls = story.then(function(story) {
            return getJSON(`http://localhost:9876/static/${story.chapterUrls[0]}`).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html)
                //通过在Promise的then方法里不停调用return返回下一个Promise实现Promise链
                return getJSON(`http://localhost:9876/static/${story.chapterUrls[1]}`)
            }).catch(function(err){
                console.log(err)
            }).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
                return getJSON(`http://localhost:9876/static/${story.chapterUrls[2]}`)
            }).catch(function(err){
                console.log(err)
            }).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html)
                return getJSON(`http://localhost:9876/static/${story.chapterUrls[3]}`)
            }).catch(function(err){
                console.log(err)
            }).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
                return getJSON(`http://localhost:9876/static/${story.chapterUrls[4]}`)
            }).catch(function(err){
                console.log(err)
            }).then(function(chapter) {
                console.log(chapter.html)
                addHtmlToPage(chapter.html);
                done()
            }).catch(function(err){
                console.log(err)
                done()
            })
        })
        
    })
    it('异步串行-forEach优化',(done)=>{
        let sequence = Promise.resolve(),
            story = getJSON('http://localhost:9876/static/story.json')
        // 在then方法里通过forEach的方式改良了之前的Promise链写法
        story.then(story => {
            story.chapterUrls.forEach(function(chapterUrl) {
                //通过赋值的方式，迭代插入Promise链，确保上一个异步操作结束之后才会执行当前的异步操作
                sequence = sequence.then(function() {
                    return getJSON(`http://localhost:9876/static/${chapterUrl}`);
                }).then(function(chapter) {
                    addHtmlToPage(chapter.html);
                }).catch(function(err){
                    console.log('err')
                })
            })
        })
        done()
    }) 
    it('异步串行-array.reduce简化代码',(done)=>{
        let story = getJSON('http://localhost:9876/static/story.json')
        story.then(story=>{
            story.chapterUrls.reduce((sequence, chapterUrl)=>{
                return sequence.then(() => {
                    return getJSON(`http://localhost:9876/static/${chapterUrl}`);
                }).then((chapter) => {
                    addHtmlToPage(chapter.html)
                    done()
                }).catch((err) => {
                    console.log('err')
                    done()
                })
            }, Promise.resolve())
        })
        done()
    })
})
describe('异步并行-Promise.all',()=>{
    it('Promise.all',(done)=>{
        let story = getJSON('http://localhost:9876/static/story.json')
        story.then(story=>{
            addHtmlToPage(story.heading)
            //用Promise.all并行读取所有的子列表数组，在数组里用map方法里调用getJSON方法，
            // 返回Promise读取JSON数组
            return Promise.all(
                story.chapterUrls.map(chapterUrl=>{
                    getJSON(`http://localhost:9876/static/${chapterUrl}`)
                })
            ).then(chapters=>{
                // 在Promise数组里调用forEach方法按照顺序将其输出至页面
                chapters.forEach(chapter=>{
                    addHtmlToPage(chapter.html)
                })
                addTextToPage("All done");
                done()
            }).catch(function(err) {
                addTextToPage("Argh, broken: " + err.message);
                done()
            })
        })
    })
}) 