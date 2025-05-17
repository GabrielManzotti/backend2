const description = document.querySelector("#description");
const category = document.querySelector("#category");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
const onsale = document.querySelector("#onsale");
const owner_id = document.querySelector("#owner_id");

document.querySelector("#userUpdate").addEventListener("click", async () => {
  try {
    const data = {};
    if (description.value !== "") {
      data.description = description.value;
    }
    if (category.value !== "") {
      data.category = category.value;
    }
    if (image.value !== "") {
      data.image = image.value;
    }
    if (price.value !== "") {
      data.price = price.value;
    }
    if (stock.value !== "") {
      data.stock = stock.value;
    }
    if (onsale.value !== "") {
      data.onsale = onsale.value;
    }
    if (owner_id.value !== "/") {
      data.owner_id = owner_id.value;
    }
    console.log(data);
  } catch (error) {}
});
