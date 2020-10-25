/* jshint esversion: 8 */
/* Getting the needed html node buttons */
const getButton = document.querySelector(".btn_Get");
const postButton = document.querySelector(".btn_Post");
const putButton = document.querySelector(".btn_Put");
const deleteButton = document.querySelector(".btn_Delete");
const citiesWrapper = document.querySelector(".citiesWrapper");

/* Creating savedCities array to get reference for the cities array */
let savedCities = [];

/* getCities() function for mapping over the cities and replace cities items with html elements */
function getCities() {
    const htmlCities = savedCities.map(city => {
        return `
        <h2 class="cityName"> City: <span class="cityNameSpan">${city.name}</span></h2>
        <p class="cityPopulation">Population: <span class="cityPopulationSpan">${city.population} people</span></p>
        <div class="cityID">ID: <span class="cityIdSpan">${city.id}</span></div>
        `;
    }).join("");
    citiesWrapper.innerHTML = htmlCities;
    citiesWrapper.style = " border: 3px solid black; padding: 20px;";
}

/* Wanna display the cities after clicking GET button */
/* Adding addEventListener built-in function for getting the cities when get button is pressed */
getButton.addEventListener("click", () => {
    getCities();
});

/* fetchCities for fetching the cities */
let fetchCities = fetch("https://avancera.app/cities/");

fetchCities.then(res => {
    return res.json();
}).then(result => {
    savedCities = result;
    console.log(result);
    /* Wanna create a city after clicking POST button */
    postButton.addEventListener("click", async () => {
        const { value: formValues } = await Swal.fire({
            title: "Create a city",
            html:
                '<label for="swal-input1">City\'s name</label>' +
                '<input type="text" id="swal-input1" class="swal2-input" placeholder=\"City\'s name\">' +
                '<label for="swal-input2">City\'s population</label>' +
                '<input type="text" id="swal-input2" class="swal2-input" placeholder=\"City\'s population\">',
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById("swal-input1").value;
                const input2 = document.getElementById("swal-input2").value;
                if (input1 && input2) {
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value
                    ];
                } else {
                    Swal.showValidationMessage("You have to fill the two input fields");
                }
            }
        });
        if (formValues) {
            const formValue1 = formValues[0];
            const formValue2 = formValues[1];
            /* Save a city permanent in the localStorage when creating a city */
            localStorage.setItem("city", formValue1);
            fetchCities = fetch("https://avancera.app/cities/", {
                body: JSON.stringify({ name: formValue1, population: +formValue2 }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
            console.log(result);
        }
    });
    /* Wanna edit a city after clicking PUT button */
    putButton.addEventListener("click", async () => {
        const { value: formValues } = await Swal.fire({
            title: "Edit a city's name or population",
            html:
                '<label for="swal-input1">City\'s name</label>' +
                '<input id="swal-input1" class="swal2-input" placeholder=\"City\'s name\">' +
                '<label for="swal-input2">City\'s population</label>' +
                '<input id="swal-input2" class="swal2-input" placeholder=\"City\'s population\">' +
                '<label for="swal-input3">City\'s ID</label>' +
                '<input id="swal-input3" class="swal2-input" placeholder=\"City\'s ID\">',
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById("swal-input1").value;
                const input2 = document.getElementById("swal-input2").value;
                const input3 = document.getElementById("swal-input3").value;
                if (input1 && input2 && input3) {
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value,
                        document.getElementById("swal-input3").value
                    ];
                } else {
                    Swal.showValidationMessage("You have to fill the three input fields");
                }
            }
        });
        if (formValues) {
            const formValue1 = formValues[0];
            const formValue2 = formValues[1];
            const formValue3 = formValues[2];
            /* Save a city permanent in the localStorage when editing a city */
            localStorage.setItem("city", formValue1);
            fetchCities = fetch("https://avancera.app/cities/" + formValue3, {
                body: JSON.stringify({ name: formValue1, population: +formValue2 }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            });
            console.log(result);
        }
    });
    /* Wanna delete a city after clicking DELETE button */
    deleteButton.addEventListener("click", async () => {
        const { value: formValues } = await Swal.fire({
            title: "Delete a city",
            html:
                '<label for="swal-input1">City\'s ID</label>' +
                '<input id="swal-input1" class="swal2-input" placeholder=\"City\'s ID\">',
            focusConfirm: false,
            preConfirm: () => {
                const input1 = document.getElementById("swal-input1").value;
                if (input1) {
                    return [
                        document.getElementById("swal-input1").value
                    ];
                } else {
                    Swal.showValidationMessage("You have to fill ID input field");
                }
            }
        });
        if (formValues) {
            const formValue1 = formValues[0];
            /* Delete a city permanent from the localStorage when deleting a city */
            localStorage.removeItem("city", formValue1);
            fetchCities = fetch("https://avancera.app/cities/" + formValue1, {
                method: 'DELETE'
            });
            console.log(result);
        }
    });
    return result;
});





