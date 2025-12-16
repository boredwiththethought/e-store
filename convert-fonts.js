import { readFileSync, writeFileSync, readdirSync } from "fs";
import { compress } from "wawoff2";
import { join } from "path";

const fontsDir = "./web/src/assets/fonts";

console.log("🔄 Конвертация OTF шрифтов в WOFF2...\n");

try {
  const files = readdirSync(fontsDir);
  const otfFiles = files.filter((file) => file.toUpperCase().endsWith(".OTF"));

  console.log(`Найдено ${otfFiles.length} OTF файлов:\n`);

  for (const file of otfFiles) {
    const inputPath = join(fontsDir, file);
    const outputPath = join(fontsDir, file.replace(/\.OTF$/i, ".woff2"));

    console.log(`  Converting: ${file}...`);

    try {
      const input = readFileSync(inputPath);
      const output = await compress(input);
      writeFileSync(outputPath, output);

      const originalSize = (input.length / 1024).toFixed(2);
      const compressedSize = (output.length / 1024).toFixed(2);
      const ratio = ((1 - output.length / input.length) * 100).toFixed(1);

      console.log(`    ✅ ${file.replace(/\.OTF$/i, ".woff2")}`);
      console.log(
        `    📊 ${originalSize} KB → ${compressedSize} KB (${ratio}% меньше)\n`
      );
    } catch (error) {
      console.error(`    ❌ Ошибка конвертации ${file}:`, error.message);
    }
  }

  console.log("✅ Конвертация завершена!");
} catch (error) {
  console.error("❌ Ошибка:", error.message);
  process.exit(1);
}
