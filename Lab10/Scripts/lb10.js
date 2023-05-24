$(document).ready(function () {
    function createDogItem(dog) {
        const dogItem = $('<div>').addClass("dog");
        dogItem.html(`
            <img src="${dog.dogImage}" alt="${dog.title}">
            <div>
                <h2>${dog.title}</h2>
                <p>Стать: ${dog.sex}</p>
                <p>Вік: ${dog.age}</p>
            </div>
        `);
        dogItem.on("click", () => {
            showModal(dog);
        });
        return dogItem;
    }
    function showModal(dog) {
        $('#myModal').show();
        $('#dogInfo').html(`
            <h2>${dog.title}</h2>
            <img src="${dog.dogImage}" alt="${dog.title}" style="max-width: 100%;">
            <p>Стать: ${dog.sex}</p>
            <p>Вік: ${dog.age}</p>
            <p>Опис: ${dog.description}</p>
        `);
    }
    $('.close').on("click", () => {
        $('#myModal').hide();
    });
    $(window).on("click", (event) => {
        if (event.target === $('#myModal').get(0)) {
            $('#myModal').hide();
        }
    });
    $.getJSON("https://usersdogs.dmytrominochkin.cloud/dogs")
        .done((dogs) => {
            $.each(dogs, function (index, dog) {
                const updatedDog = {
                    ...dog,
                    dogImage: `https://usersdogs.dmytrominochkin.cloud/images/dog/p${dog.id}.jpeg`,
                };
                const dogItem = createDogItem(updatedDog);
                $('#dogList').append(dogItem);
            });
        })
        .fail((jqxhr, textStatus, error) => {
            console.error("Error fetching dogs:", error);
        });
});