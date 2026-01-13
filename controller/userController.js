let users = [
  { id: 1, name: "Ali", age: 18 },
  { id: 2, name: "Vali", age: 22 },
  { id: 3, name: "Abbos", age: 25 },
  { id: 4, name: "Sardor", age: 28 },
  { id: 5, name: "Jamshid", age: 30 },
];

export const getUsers = (req, res) => {
  
  try {
    const {maxAge, minAge} = req.query
    let natija = users;
    if (maxAge !== undefined) {
       natija = natija.filter((user) => user.age <= Number(maxAge));
    }
    if (minAge !== undefined) {
      natija = natija.filter((user) => user.age >= Number(minAge));
    }
    res.status(200).json(natija);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik");
  }
};

export const createUser = (req, res) => {
  const data = req.body;
  try {
    const existingUser = users.find((u) => u.name == data?.name);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bunday foydalanuvchi allaqachin mavjud" });
    }
    if (!req.body?.name && !req.body.age) {
      return res
        .status(400)
        .json({ message: "Foydalanuvchi ma'lumotlari tuliq emas!" });
    }

    if (req.body?.name?.length <= 2) {
      return res
        .status(400)
        .json({ message: "Ism kamida 3 ta harfdan ibirat bulsin" });
    }

    const newUser = {
      id: users.length + 1,
      name: req.body.name,
    };

    users.push(newUser);

    res.status(201).json({ message: "Foydalanuvchi qo'shildi!", users });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik bor");
  }
};

export const deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const existingUser = users.find((u) => u.id === userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    users = users.filter((u) => u.id !== userId);

    res.status(200).json({ message: "Foydalanuvchi o'chirildi", users });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik!");
  }
};

export const getUserById = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const existingUser = users.find((u) => u.id === userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    const user = users.filter((u) => u.id === userId);
    res.status(200).json({ message: "Foydalanuvchi topildi!", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik!");
  }
};

export const updateUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
   const { name, age } = req.body;
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

      if (name !== undefined) {
        user.name = name;
      }

      if (age !== undefined) {
        user.age = age;
      }

      res.status(200).json({
        message: "Foydalanuvchi yangilandi",
        user,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik!");
  }
};

export const searchUser = (req, res) => {
  try {
    const userName = req.query.name
      ? req.query.name.toString().toLowerCase()
      : null;

    let filterUsers = users;

    if (userName) {
      filterUsers = filterUsers.filter(
        (user) => user.name.toLowerCase() == userName
      );
    }

    return res.status(200).json(filterUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik!");
  }

  res.status(200).json(filterUsers);
};

export const userError = (req, res, next) => {
  try {
    // Ataylab xato hosil qilamiz
    throw new Error("Siz ataylab xato chiqargan marshrutga kirdingiz!");
  } catch (err) {
    // Xatoni catch qilib, next() orqali Middleware-ga uzatamiz
    next(err);
  }
}