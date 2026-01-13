let products = [
  {
    id: 1,
    title: "Telefon",
    price: 250,
  },
  {
    id: 2,
    title: "Noutbuk",
    price: 800,
  },
  {
    id: 3,
    title: "Quloqchin",
    price: 40,
  },
  {
    id: 4,
    title: "Soat",
    price: 120,
  },
  {
    id: 5,
    title: "Planshet",
    price: 300,
  },
];



export const getAllProducts = (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik");
  }
};

export const createProduct = (req, res) => {
  try {
    const { title, price } = req.body;

    if (!title || (title.trim().length < 0 && !price) || price < 0) {
      res.status(400).send("Mahsulot nomi yokida narxi kiritilmagan!");
    }

    const product = products.find(
      (product) =>
        product.title.toLocaleLowerCase() === title.trim().toLocaleLowerCase()
    );
    if (product) {
      return res
        .status(404)
        .json({ message: "Bu nomdagi mahsulot allaqachon mavjud!" });
    }

    const newProduct = {
      id: products.length + 1,
      title: title.trim(),
      price: price,
    };

    products.push(newProduct);

    res.status(201).json({
      message: "Mahsulot yaratildi!",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik");
  }
};

export const deleteProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (!productId) {
      res.status(400).send("Mahsulot id raqami kiritish zarur!");
    }

    const product = products.find((product) => product.id === productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Bu id raqamga tegishli mahsulot topilmadi!" });
    }
    products = products.filter((product) => product.id != productId);

    res.status(200).json({
      message: "Mahsulot muffaqqiyatli o'chirildi",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik");
  }
};

export const updateProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { title, price } = req.body;
    const product = products.find((product) => product.id == productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Bu id raqamga tegishli mahsulot topilmadi!" });
    }
      
     if (title !== undefined) {
       product.title = title;
     }

     if (price !== undefined) {
       product.price = price;
     }
        

    res.status(200).json({
      message: "Mahsulot yangilandi!",
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serverda xatolik");
  }
};

export const getProductById = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find((product) => product.id == productId);
        if (!product) {
          return res
            .status(404)
            .json({ message: "Bu id raqamga tegishli mahsulot topilmadi!" });
        }

        res.status(200).json({
            message: "Mahsulot topildi!",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik");
    }

}
