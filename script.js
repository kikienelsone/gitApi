let input = document.querySelector(".input")
let ul = document.querySelector(".list")
let repoList = document.querySelector(".main-section__repo-list")
let delButton = document.createElement("button")


const debounce = (fn, debounceTime) => {
    let timeout
    return function (value) {
        const fnCall = () => {
            fn.apply(this, arguments)
        }
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, debounceTime)
    }
}

let delay = debounce(getRepositories, 1000)

function showRepositories (tagName) {
    // ul.style.display = "block"
    let li = document.createElement("p")
    // li.style.listStyle = "none"
    li.innerHTML = tagName
    ul.append(li)
      li.addEventListener("click", ()=>{
          addToReposList(li.currentTarget = tagName)
      })
}

async function getRepositories (value) {

    await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
        .then((res) =>{
            if (res.ok){
                res.json().then(res =>{
                    res.items.map((item)=>{
                        console.log(item)
                        showRepositories(`${item.name}`.toUpperCase())
                    })
                })
            }
            })
}


function addToReposList(name, star, owner) {
    let p = document.createElement("p")
    p.innerHTML = name
    // delButton.innerHTML = "X"
    repoList.append(p)
    repoList.append(delButton)
    delButton.addEventListener("click", ()=>{
        p.remove()
        delButton.remove()
    })
    ul.innerHTML = ""
}

const inputSearch = (event) => {
    input.value? delay(event.target.value) : ""
    ul.innerHTML = ""
}

input.addEventListener("keyup", inputSearch)
