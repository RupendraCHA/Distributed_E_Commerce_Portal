const salts = [
  {
    productId: "SALT001",
    productName: "Morton Canning & Pickling Salt",
    category: "Salt",
    brand: "Morton",
    price: "$2.89",
    description:
      "A pure, all-natural, granulated salt that's designed for food canning and preservation.",
    weight: "4 lb",
    stock: 68,
    expirationDate: "2025-12-31",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1727197298/Pickle_Salt_esyftj.webp",
  },
  {
    productId: "SALT002",
    productName: "Morton Iodized Salt",
    category: "Salt",
    brand: "Morton",
    price: "$3.89",
    description:
      "An all-purpose salt that can be used for cooking, baking, and seasoning.",
    weight: "26 oz",
    stock: 86,
    expirationDate: "2025-12-31",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1727203126/Iodized_salt_f0nq9t.webp",
  },
  {
    productId: "SALT003",
    productName: "Morton Table Salt",
    category: "Salt",
    brand: "Morton",
    description: "Fine granulated table salt for everyday use.",
    price: "$2.99",
    weight: "1 lb",
    stock: 100,
    expirationDate: "2025-12-31",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729187823/mortan_table_salt_lt4dg8.webp",
  },
  {
    productId: "SALT004",
    productName: "Morton Sea Salt",
    category: "Salt",
    brand: "Morton",
    description: "All-natural sea salt perfect for gourmet dishes.",
    price: "$5.99",
    weight: "2 lb",
    stock: 50,
    expirationDate: "2025-06-30",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729188380/sea_salt_uiamum.webp",
  },
  {
    productId: "SALT005",
    productName: "Morton Kosher Salt",
    category: "Salt",
    brand: "Morton",
    description: "Coarse kosher salt ideal for cooking.",
    price: "$3.49",
    weight: "1.5 lb",
    stock: 75,
    expirationDate: "2026-01-15",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729188380/kosher_salt_h01ti6.webp",
  },
  {
    productId: "SALT006",
    productName: "Morton Himalayan Pink Salt",
    category: "Salt",
    brand: "Morton",
    description: "Natural pink salt from the Himalayas.",
    price: "$6.49",
    weight: "1 lb",
    stock: 65,
    expirationDate: "2025-08-10",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729188533/pink_salt_oyiagd.webp",
  },
  {
    productId: "SALT0099",
    productName: "Morton Iodized Salt",
    category: "Salt",
    brand: "Morton",
    description: "Iodized salt for added nutritional benefits.",
    price: "$1.99",
    weight: "1 lb",
    stock: 150,
    expirationDate: "2025-09-15",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1727203126/Iodized_salt_f0nq9t.webp",
  },
  {
    productId: "SALT100",
    productName: "Morton Low Sodium Salt",
    category: "Salt",
    brand: "Morton",
    description: "Low sodium salt for healthier diets.",
    price: "$3.99",
    weight: "1 lb",
    stock: 80,
    expirationDate: "2025-11-20",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729188533/low_sodium_salt_rqyyeu.jpg",
  },
  {
    productId: "SALT007",
    productName: "Morton Smoked Sea Salt",
    category: "Salt",
    brand: "Morton",
    description: "Smoked sea salt for enhanced flavor.",
    price: "$7.99",
    weight: "1 lb",
    stock: 40,
    expirationDate: "2025-10-30",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189044/smoke_salt_vibie9.jpg",
  },
  {
    productId: "SALT008",
    productName: "Morton Rock Salt",
    category: "Salt",
    brand: "Morton",
    description: "Rock salt for deicing and other uses.",
    price: "$4.99",
    weight: "5 lb",
    stock: 120,
    expirationDate: "2027-01-01",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/rock_salt_rqx9kh.jpg",
  },
  {
    productId: "SALT009",
    productName: "Morton Pickling Salt",
    category: "Salt",
    brand: "Morton",
    description: "Perfect salt for pickling and preserving.",
    price: "$3.79",
    weight: "2 lb",
    stock: 60,
    expirationDate: "2026-03-01",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/pickle_salt_nkw0nw.jpg",
  },
  {
    productId: "SALT010",
    productName: "Morton Popcorn Salt",
    category: "Salt",
    brand: "Morton",
    description: "Ultra-fine salt for seasoning popcorn.",
    price: "$2.49",
    weight: "0.5 lb",
    stock: 100,
    expirationDate: "2025-07-20",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189042/popcorn_salt_q2yv4j.jpg",
  },
  {
    productId: "SALT011",
    productName: "Morton Canning Salt",
    category: "Salt",
    brand: "Morton",
    description: "Pure salt for canning and preserving food.",
    price: "$2.89",
    weight: "1.5 lb",
    stock: 90,
    expirationDate: "2025-12-10",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/pickle_salt_nkw0nw.jpg",
  },
  {
    productId: "SALT012",
    productName: "Morton Flaky Sea Salt",
    category: "Salt",
    brand: "Morton",
    description: "Flaky sea salt for garnishing dishes.",
    price: "$7.99",
    weight: "0.75 lb",
    stock: 50,
    expirationDate: "2026-02-28",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189712/flake_salt_gj7cut.jpg",
  },
  {
    productId: "SALT013",
    productName: "Morton Fleur de Sel",
    category: "Salt",
    brand: "Morton",
    description: "Premium sea salt for finishing gourmet dishes.",
    price: "$8.99",
    weight: "0.5 lb",
    stock: 30,
    expirationDate: "2026-05-01",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189711/fleur_xsut1n.jpg",
  },
  {
    productId: "SALT014",
    productName: "Morton Garlic Salt",
    category: "Salt",
    brand: "Morton",
    description: "Seasoned salt with garlic for added flavor.",
    price: "$3.49",
    weight: "1 lb",
    stock: 110,
    expirationDate: "2025-08-15",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189710/garlic_salt_wrfs8g.jpg",
  },
  {
    productId: "SALT015",
    productName: "Morton Onion Salt",
    category: "Salt",
    brand: "Morton",
    description: "Salt combined with onion for seasoning.",
    price: "$3.49",
    weight: "1 lb",
    stock: 90,
    expirationDate: "2025-08-15",
    image:
      "https://res.cloudinary.com/dppznstlh/image/upload/v1729189709/onion_salt_kg3ts5.jpg",
  },
];

module.exports = salts;
