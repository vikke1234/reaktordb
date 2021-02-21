function get_manufacturers(products) {
  let manufactuers = new Set;
  products.map(product => product.map(item => {
    manufactuers.add(item.manufactuer);
  }))
}