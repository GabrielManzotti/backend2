const errorSucces = document.querySelector("#errorSuccess");
const nameInput = document.querySelector("#name");
const avatarInput = document.querySelector("#avatar");
const cityinput = document.querySelector("#city");
const dateInput = document.querySelector("#date");

document.querySelector("#update").addEventListener("click", async () => {
  try {
    const data = {};
    const name = document.querySelector("#name").value;
    if (name) {
      data.name = name;
    }
    const date = document.querySelector("#date").value;
    if (date) {
      data.date = date;
    }
    const avatar = document.querySelector("#avatar").value;
    if (avatar) {
      data.avatar = avatar;
    }
    const city = document.querySelector("#city").value;
    if (city) {
      data.city = city;
    }
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/users";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      errorSucces.innerHTML = `Update succes`;
      nameInput.value = "";
      avatarInput.value = "";
      cityinput.value = "";
      dateInput.value = "";
    }
  } catch (error) {
    errorSucces.innerHTML = `Update failed`;
  }
});
