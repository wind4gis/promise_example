var storyPromise,body=document.body

function getChapter(i) {
  storyPromise = storyPromise || getJSON(`http://localhost:9876/static/story.json`);

  return storyPromise.then(function(story) {
    return getJSON(`http://localhost:9876/static/${story.chapterUrls[i]}`);
  })
}

function addHtmlToPage(content) {
        var div = document.createElement('div');
        div.innerHTML = content;
        body.insertBefore(div,body.querySelector('iframe'))
    }
    
function addTextToPage(content) {
    var p = document.createElement('p');
    p.textContent = content;
    body.insertBefore(p,body.querySelector('iframe'))
}
function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
        }
        else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        console.log(req.statusText)
        reject(Error(req.statusText));
        }
    };

    req.timeout = 1500
    req.ontimeout = ()=>{
        reject('访问超时')
    }
    // Handle network errors
    req.onerror = function() {
        reject("网络错误");
    };

    // Make the request
    req.send();
    });
}
function getJSON(url){
    return get(url).then(JSON.parse)/* .then(function(response) {
        console.log("Yey JSON!", response);
        }) *///.catch(error=>{return Promise.resolve('error')})
}


export {addHtmlToPage, addTextToPage, get, getJSON, getChapter}