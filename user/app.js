const userList = document.querySelector(".user-list");
const usersCard = document.querySelector(".users-card");
const formCard = document.querySelector(".form-card");
const loading = document.querySelector(".loading");
const addUserBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector(".submit-btn");
const formInput = document.querySelector('.ism')
const warningMsg = document.querySelector(".warning-msg");

const fetchUsers = async () => {
  loading.classList.add("visible");
  userList.classList.add("hidden");
  try {
    const res = await fetch("http://localhost:7777/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      userlarniEkrangaChiqazish(data);
      userlarniTekshirish(data);
      userList.classList.remove("hidden");
      loading.classList.remove("visible");
    } else {
      console.log("server xatosi")
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUsers();

const userlarniEkrangaChiqazish = (users) => {
     userList.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${user.name} `;
    userList.appendChild(li);
  });
};

const userlarniTekshirish = (users) => {
  const li = document.createElement("li");
  if (users?.length == 0) {
    li.textContent = `Userlar topilmadi!`;
    userList.appendChild(li);
    return;
  }
};


function handleInputLength() {
  const userName = formInput.value.trim();

  if (userName.length < 3) {
    warningMsg.classList.add("visible");
    warningMsg.classList.remove("hidden");
  } else {
    warningMsg.classList.add("hidden");
    warningMsg.classList.remove("visible");
  }
}


handleInputLength()


const addUser = async (e) => {
    e.preventDefault()

  const newUser = formInput.value;
  if (!newUser || newUser.trim().length < 3) {
    return alert("Ism kamida 3 ta harfdan iborat bo‘lishi kerak.");
  }

    try {
        const res = await fetch("http://localhost:7777/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newUser }),
        });
      
      if (res.status === 201) {
          const data = await res.json();
          usersCard.classList.remove("hidden");
          formCard.classList.remove("visible");
          formCard.classList.add("hidden");
          formInput.value = "";
          alert(data?.message);
          userlarniEkrangaChiqazish(data?.users)
        } else if (res.status === 400) {
          alert("❌ Noto‘g‘ri ma'lumot yuborildi");
        } else {
          alert("Server xatosi");
        }
        
    } catch (error) {
        console.log(error)
    }
    
}
    


addUserBtn.addEventListener("click", () => {
  usersCard.classList.add("hidden");
  formCard.classList.remove("hidden");
  formCard.classList.add("visible");
});

submitBtn.addEventListener('click', addUser);
formInput.addEventListener("input", handleInputLength);
