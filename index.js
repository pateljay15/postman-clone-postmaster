let paramsBox = document.getElementById('parametersBox')
paramsBox.style.display = 'none'

let addParameterCount = 0

function getElementFromString(string){
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block'
    document.getElementById('requestJsonBox').style.display = 'none'
})

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})


let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = `
    <div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addParameterCount + 2}</label>
                <div class="col-md-4">
                  <input type="text" class="form-control" id="parameterKey${addParameterCount + 2}" placeholder="Enter Parameter ${addParameterCount + 2} Key">
                </div>
                <div class="col-md-4">
                  <input type="text" class="form-control" id="parameterValue${addParameterCount + 2}" placeholder="Enter Parameter ${addParameterCount + 2} Value">
                </div>
              <button class="btn btn-primary deleteParam"> - </button>
    </div>
    `
    let paramElement = getElementFromString(string)
    console.log(paramElement)
    params.appendChild(paramElement)
    // params.innerHTML = string we cant do this 
    addParameterCount++

    let deleteParam = document.getElementsByClassName('deleteParam')
    console.log(deleteParam)
    for(item of deleteParam){
        item.addEventListener('click', (e) => {
            // e.target.parentElement.remove()
            let del = confirm('Are You sure you want to delete this parameter')
            console.log(del)
            if(del == true){
                e.target.parentElement.remove()
            } 
        })
    }
    
})


let submit = document.getElementById('submit')
submit.addEventListener('click', (e) => {
    // e.preventDefault()
    // document.getElementById('responseJsonText').value = 'Please Wait.. Fetching response'
    document.getElementById('responsePrism').innerHTML = 'Please Wait.. Fetching response'

    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value
    
    if(contentType == 'params'){
        data = {};
        for(let i=0; i<addParameterCount+1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value
                let value = document.getElementById('parameterValue' + (i+1)).value
                // console.log(key)
                // console.log(value)
                data[key] = value
            }
        }
        data = JSON.stringify(data)
    }else{
        data = document.getElementById('requestJsonText').value
    }
    console.log("url", url)
    console.log("requestType", requestType)
    console.log("contentType", contentType)
    console.log("data", data)

    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(text => {
            // document.getElementById('responseJsonText').value = text)
            document.getElementById('responsePrism').innerHTML = text
            Prism.highlightAll()
        })
    } else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then(text => {
            // document.getElementById('responseJsonText').value = text)
            document.getElementById('responsePrism').innerHTML = text
            Prism.highlightAll()
        })    
    }

})