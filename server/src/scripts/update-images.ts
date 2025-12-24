import * as fs from "fs";
import * as path from "path";

const PRODUCTS_DIR = path.join(__dirname, "../../data/products");

// Real working image URLs from Unsplash for each category
const categoryImages: Record<string, string[]> = {
  phones: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886f2b?w=800&q=80",
    "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",
  ],
  smartwatches: [
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80",
    "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
    "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&q=80",
  ],
  cameras: [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&q=80",
    "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&q=80",
    "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&q=80",
    "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80",
    "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&q=80",
    "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&q=80",
  ],
  headphones: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&q=80",
  ],
  computers: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
  ],
  gaming: [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80",
    "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&q=80",
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80",
    "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80",
    "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=800&q=80",
  ],
};

function getRandomImage(category: string, index: number): string {
  const images = categoryImages[category] || categoryImages.phones;
  return images[index % images.length];
}

function updateProductImages() {
  console.log("🖼️  Updating product images...\n");

  const categories = fs.readdirSync(PRODUCTS_DIR);
  let updatedCount = 0;

  for (const category of categories) {
    const categoryPath = path.join(PRODUCTS_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith(".json"));
    console.log(`📁 ${category}: ${files.length} products`);

    files.forEach((file, index) => {
      const filePath = path.join(categoryPath, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const product = JSON.parse(content);

        // Get images for this product
        const img1 = getRandomImage(category, index * 2);
        const img2 = getRandomImage(category, index * 2 + 1);

        // Update images based on colors
        if (product.colors && Array.isArray(product.colors)) {
          const newImages: Record<string, string[]> = {};
          product.colors.forEach((color: string, i: number) => {
            const imgIndex =
              (index * 2 + i) % categoryImages[category]?.length || 0;
            newImages[color] = [getRandomImage(category, imgIndex)];
          });
          product.images = newImages;
        } else {
          // Simple image array
          product.images = [img1, img2];
        }

        fs.writeFileSync(filePath, JSON.stringify(product, null, 2));
        updatedCount++;
      } catch (err) {
        console.error(`  ❌ Error updating ${file}:`, err);
      }
    });
  }

  console.log(`\n✅ Updated ${updatedCount} products with working images!`);
}

updateProductImages();
