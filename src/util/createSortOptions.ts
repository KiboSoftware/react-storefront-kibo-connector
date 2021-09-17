export default function createSortOptions() {
  return [
    { name: "Default", code: "" },
    { name: "Price: Low to High", code: "price asc" },
    { name: "Price: High to Low", code: "price desc" },
    { name: "Alphabetical: A-Z", code: "productName asc" },
    { name: "Alphabetical: Z-A", code: "productName desc" },
    { name: "Date Added: Most Recent First", code: "createDate desc" },
    { name: "Date Added: Most Recent Last", code: "createDate asc" }
  ]
}


