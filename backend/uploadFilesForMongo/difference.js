const fs = require('fs');

const currentProductsJson = fs.readFileSync('_products.json', 'utf-8');
const currentProducts = JSON.parse(currentProductsJson)

const allProducts = require("../data/posetraProducts.js");

function findProductDifferences(currentProducts, allProducts) {
  const currentProductIds = new Set(currentProducts.map(p => p.productId));
  const allProductIds = new Set(allProducts.map(p => p.productId));

  // Find missing products in currentProducts
  const missingProducts = allProducts.filter(p => !currentProductIds.has(p.productId));

  // Find extra products in currentProducts
  const extraProducts = currentProducts.filter(p => !allProductIds.has(p.productId));

  return {
    missingProducts,
    extraProducts
  };
}

const { missingProducts, extraProducts } = findProductDifferences(currentProducts, allProducts);
fs.writeFileSync('missing_products.json', JSON.stringify(missingProducts, null, 2));
fs.writeFileSync('extra_products.json', JSON.stringify(extraProducts, null, 2));
