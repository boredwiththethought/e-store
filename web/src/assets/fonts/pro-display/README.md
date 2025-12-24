# SF Pro Display Fonts

## Конвертация шрифтов

Все OTF шрифты автоматически конвертированы в формат WOFF2 для оптимальной производительности и размера.

### Доступные начертания:

- **Ultra Light Italic** (100 italic)
- **Thin Italic** (100 italic)
- **Light Italic** (300 italic)
- **Regular** (400 normal)
- **Medium** (500 normal)
- **Semi Bold Italic** (600 italic)
- **Bold** (700 normal)
- **Heavy Italic** (800 italic)
- **Black Italic** (900 italic)

### Преимущества WOFF2:

✅ **Сжатие до 67%** - файлы на 56-67% меньше оригинальных OTF
✅ **Быстрая загрузка** - оптимизированный формат для веба
✅ **Широкая поддержка** - работает во всех современных браузерах
✅ **Встроенная компрессия** - лучше чем WOFF или TTF

### Как конвертировать заново:

```bash
bun run fonts:convert
```

### Использование в коде:

```css
/* Шрифты уже подключены в src/assets/fonts.css */
font-family: "SF Pro Display", sans-serif;
```

### Статистика конвертации:

| Файл               | Исходный размер | WOFF2 размер | Экономия |
| ------------------ | --------------- | ------------ | -------- |
| Regular            | 291.94 KB       | 98.06 KB     | 66.4%    |
| Bold               | 326.88 KB       | 107.45 KB    | 67.1%    |
| Medium             | 327.65 KB       | 109.88 KB    | 66.5%    |
| Light Italic       | 155.17 KB       | 67.74 KB     | 56.3%    |
| Thin Italic        | 154.21 KB       | 67.48 KB     | 56.2%    |
| Semi Bold Italic   | 156.13 KB       | 68.25 KB     | 56.3%    |
| Heavy Italic       | 155.89 KB       | 67.59 KB     | 56.6%    |
| Black Italic       | 142.98 KB       | 61.79 KB     | 56.8%    |
| Ultra Light Italic | 153.09 KB       | 66.42 KB     | 56.6%    |

**Общая экономия**: ~1.6 MB → ~715 KB (более чем в 2 раза меньше!)
