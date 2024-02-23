let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  getAllToys()

  toyFormContainer.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    const toyName = e.target["name"].value
    const toyURL = e.target["image"].value

    createNewToy(toyName, toyURL)
    window.location.reload()
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res=>res.json())
  .then(toyData=>{
    renderToys(toyData)
  })
}

function renderToys(allToys){
  for (const toy of allToys){
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes} likes</p>
      <button class="like-btn" id=${toy.id}>like</button>
    `
    document.getElementById("toy-collection").appendChild(card)
    
    card.querySelector(".like-btn").addEventListener("click", () => {
      toy.likes ++
      card.querySelector("p").innerText = `${toy.likes} likes`
  
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type":"application/json",
            Accept:"application/json",
          },
          body: JSON.stringify({
            "likes": toy.likes
          })
        })
      })
  }
}

function createNewToy(toyName, toyURL) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyURL,
      "likes": 0,
    })
  })
}

function createLikeButtons(card) {
  const toyButton = document.getElementById
  
   toyButton.addEventListener("click", () => {
    toy.likes ++

      fetch("http://localhost:3000/toys/${toy.id}", {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          Accept:"application/json",
        },
        body: JSON.stringify({
          "likes": toy.likes
        })
      })
    })
  }

  