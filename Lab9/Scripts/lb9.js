const dogList = document.querySelector("#dogList");
const myModal = document.querySelector("#myModal");
const closeModal = document.querySelector(".close");
const dogInfo = document.querySelector("#dogInfo");
function createDogItem(dog) {
    const dogItem = document.createElement("div");
    dogItem.className = "dog";
    dogItem.innerHTML = `
        <img src="${dog.dogImage}" alt="${dog.title}">
        <div>
            <h2>${dog.title}</h2>
            <p>Стать: ${dog.sex}</p>
            <p>Вік: ${dog.age}</p>
        </div>
    `;
    dogItem.addEventListener("click", () => {
        showModal(dog);
    })
    return dogItem;
}
function showModal(dog) {
    myModal.style.display = "block";
    dogInfo.innerHTML = `
        <h2>${dog.title}</h2>
        <img src="${dog.dogImage}" alt="${dog.title}" style="max-width: 100%;">
        <p>Стать: ${dog.sex}</p>
        <p>Вік: ${dog.age}</p>
        <p>Опис: ${dog.description}</p>
    `;
}
closeModal.addEventListener("click", () => {
    myModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === myModal) {
        myModal.style.display = "none";
    }
});
fetch("https://usersdogs.dmytrominochkin.cloud/dogs")
    .then((response) => response.json())
    .then((dogs) => {
        dogs.forEach((dog) => {
            const updatedDog = {
                ...dog,
                dogImage: `http://usersdogs.dmytrominochkin.cloud/images/dog/p${dog.id}.jpeg`,
            };
            const dogItem = createDogItem(updatedDog);
            dogList.appendChild(dogItem);
        });
    })
    .catch((error) => {
        console.error("Error fetching dogs:", error);
    });