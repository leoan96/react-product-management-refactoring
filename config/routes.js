const routes = [
  {
    path: "/",
    isPrivate: false,
  },
  {
    path: "/admin",
    isPrivate: true,
  },
  {
    path: "/add-product",
    isPrivate: true,
  },
  {
    path: new RegExp("/products/details/.*", "gm"),
    isPrivate: true,
  },
];
