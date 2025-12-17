

exports.menus = [
  {
    restaurantId: "pizza-hut-kachiguda",
    categories: [
      {
        id: "recommended",
        title: "Recommended",
        items: [
          {
            id: "margherita-medium",
            name: "Margherita (Medium)",
            description: "Classic cheese pizza",
            price: 249,
            isVeg: true,
            addons: [
              { id: "extra-cheese", name: "Extra Cheese", price: 40 },
              { id: "paneer-topping", name: "Paneer Topping", price: 60 },
            ],
          },
          {
            id: "farmhouse-medium",
            name: "Farmhouse (Medium)",
            description: "Loaded veggie pizza",
            price: 349,
            isVeg: true,
            addons: [
              { id: "extra-cheese", name: "Extra Cheese", price: 40 },
              { id: "paneer-topping", name: "Paneer Topping", price: 60 },
            ],
          },
        ],
      },
    ],
  },
  {
    restaurantId: "taj-mahal-abids",
    categories: [
      {
        id: "dosa",
        title: "Dosa",
        items: [
          {
            id: "plain-dosa",
            name: "Plain Dosa",
            description: "Crispy dosa served with chutney & sambar",
            price: 80,
            isVeg: true,
            addons: [
              { id: "extra-ghee", name: "Extra Ghee", price: 20 },
              { id: "onions", name: "Onions", price: 10 },
            ],
          },
          {
            id: "masala-dosa",
            name: "Masala Dosa",
            description: "Dosa stuffed with spiced potato",
            price: 100,
            isVeg: true,
            addons: [
              { id: "extra-ghee", name: "Extra Ghee", price: 20 },
              { id: "onions", name: "Onions", price: 10 },
            ],
          },
        ],
      },
    ],
  },
];
