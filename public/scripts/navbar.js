const selector = document.querySelector("#opts");

const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
            `;
    } else {
      if (response.isAdmin === true) {
        selector.innerHTML = `
      <a class="btn btn-success py-1 px-2 m-1" href="/cart">Cart</a>
      <a class="btn btn-success py-1 px-2 m-1" href="/adminPanel">Admin Panel</a>
      <a class="btn btn-success py-1 px-2 m-1" href="/profile">Profile</a>
      <a class="btn btn-success py-1 px-2 m-1" id="signout">Signout</a>
      `;
        document.querySelector("#signout").addEventListener("click", async () => {
          console.log("click");

          try {
            const opts = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            };
            const url = "/api/auth/signOut";
            await fetch(url, opts);
            localStorage.removeItem("token");
            location.replace("/login");
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        selector.innerHTML = `
          <a class="btn btn-success py-1 px-2 m-1" href="/cart">Cart</a>
          <a class="btn btn-success py-1 px-2 m-1" href="/profile">Profile</a>
          <a class="btn btn-success py-1 px-2 m-1" id="signout">Signout</a>
          `;
        document.querySelector("#signout").addEventListener("click", async () => {
          try {
            const opts = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            };
            const url = "/api/auth/signOut";
            await fetch(url, opts);
            localStorage.removeItem("token");
            location.replace("/login");
          } catch (error) {
            console.log(error);
          }
        });
      }
    }
  } catch (error) {
    error;
  }
};

isOnline();
