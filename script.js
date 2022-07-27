let input = document.querySelector(".input")
let ul = document.querySelector(".list")
let repoList = document.querySelector(".main-section__repo-list")



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

let delay = debounce(getRepositories, 1100)

function showRepositories (tagValue, tagOwner, tagStar) {
    let nameRepo = document.createElement("p")
    nameRepo.classList.add("main-section__api-names")
    nameRepo.innerHTML = tagValue
    ul.append(nameRepo)
      nameRepo.addEventListener("click", ()=>{
          addToReposList(tagValue, tagOwner, tagStar)
      })
}

async function getRepositories (value) {
    await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
        .then((res) =>{
            if (res.ok){
                res.json().then(res =>{
                    res.items.map((item)=>{
                        showRepositories(`${item.name}`, `${item.owner.login}`,`${item.stargazers_count}` )
                    })
                })
            }
            })
}

function removeItem(removeItem) {
    let closeButton = document.createElement("button")
    closeButton.classList.add("main-section__close-button")
    repoList.append(closeButton)
    closeButton.addEventListener("click",()=>{
        removeItem.remove()
        closeButton.remove()
    })
}

function addToReposList(name, owner, star) {
    let p = document.createElement("p")
    p.classList.add("main-section__api-list")
    p.innerText = `Name:${name}\n Owner:${owner}\n Stars:${star}`
    repoList.append(p)
    removeItem(p)
    ul.innerHTML = ""
}

let inputSearch = (event) => {
    input.value? delay(event.target.value) : ""
    ul.innerHTML = ""
}

input.addEventListener("keyup", inputSearch)


