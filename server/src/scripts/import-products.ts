import { MongoClient } from "mongodb";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://suzu:Ildds143@e-store.zhad70z.mongodb.net/?appName=e-store";
const DB_NAME = process.env.DB_NAME || "e-store";
const PRODUCTS_DIR = path.join(__dirname, "../../data/products");

interface ProductFile {
  path: string;
  category: string;
  data: Record<string, unknown>;
}

async function findAllProductFiles(dir: string): Promise<ProductFile[]> {
  const products: ProductFile[] = [];

  function walkDir(currentDir: string, category: string = "") {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // First level directories are categories
        const newCategory = category || item;
        walkDir(fullPath, newCategory);
      } else if (item.endsWith(".json")) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          const data = JSON.parse(content);
          products.push({
            path: fullPath,
            category: category,
            data: data,
          });
        } catch (error) {
          console.error(`Error parsing ${fullPath}:`, error);
        }
      }
    }
  }

  walkDir(dir);
  return products;
}

async function importProducts() {
  console.log("🚀 Starting product import...\n");

  // Check if products directory exists
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error(`❌ Products directory not found: ${PRODUCTS_DIR}`);
    process.exit(1);
  }

  // Find all product JSON files
  const productFiles = await findAllProductFiles(PRODUCTS_DIR);
  console.log(`📁 Found ${productFiles.length} product files\n`);

  if (productFiles.length === 0) {
    console.log("No products to import.");
    process.exit(0);
  }

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db(DB_NAME);
    const productsCollection = db.collection("products");

    // Clear existing products (optional - comment out if you want to keep existing)
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing products\n`);

    // Prepare products for insertion
    const products = productFiles.map((file) => ({
      ...file.data,
      category: file.data.category || file.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert products
    const insertResult = await productsCollection.insertMany(products);
    console.log(`✅ Imported ${insertResult.insertedCount} products\n`);

    // Create indexes for better query performance
    console.log("📊 Creating indexes...");
    await productsCollection.createIndex({ id: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ brand: 1 });
    await productsCollection.createIndex({ price: 1 });
    await productsCollection.createIndex({ name: "text", brand: "text" });
    await productsCollection.createIndex({ "filterSpecs.screenDiagonal": 1 });
    await productsCollection.createIndex({ "filterSpecs.batteryCapacity": 1 });
    await productsCollection.createIndex({ "filterSpecs.builtInMemory": 1 });
    console.log("✅ Indexes created\n");

    // Print summary by category
    console.log("📊 Products by category:");
    const categories = await productsCollection
      .aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
      .toArray();

    for (const cat of categories) {
      console.log(`   ${cat._id}: ${cat.count}`);
    }

    console.log("\n🎉 Import completed successfully!");
  } catch (error) {
    console.error("❌ Import error:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run import
importProducts();
