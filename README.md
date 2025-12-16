# E-Store

Современный интернет-магазин электроники на **Bun + React + Express + TypeScript**.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
bun run install:all

# Запуск разработки (server + web)
bun run dev
```

- **Web**: http://localhost:5173
- **API**: http://localhost:3000

## 📁 Структура проекта

```
e-store/
├── server/                 # Backend API (Express + TypeScript)
│   └── src/
│       └── index.ts
├── web/                    # Frontend (React + Vite + Tailwind CSS v4)
│   └── src/
│       ├── assets/
│       │   └── fonts/      # SF Pro Display (WOFF2)
│       ├── components/
│       │   ├── icons/      # SVG иконки (по размерам)
│       │   ├── logo/       # Логотип компонент
│       │   └── header/     # Header компонент
│       └── App.tsx
├── package.json            # Корневые скрипты (concurrently)
└── README.md
```

## 📜 Скрипты

| Команда                 | Описание                         |
| ----------------------- | -------------------------------- |
| `bun run dev`           | Запуск server + web в dev режиме |
| `bun run build`         | Сборка server + web              |
| `bun run start`         | Запуск production сборки         |
| `bun run install:all`   | Установка всех зависимостей      |
| `bun run clean`         | Очистка node_modules и dist      |
| `bun run fonts:convert` | Конвертация OTF → WOFF2          |

## 🎨 Шрифты

Используется **SF Pro Display** в формате WOFF2:

- Regular (400), Medium (500), Bold (700)
- Italic варианты: Light, Semibold, Heavy, Black

Шрифт автоматически применяется через Tailwind CSS:

```tsx
<p className="font-medium">Текст в SF Pro Display Medium</p>
```

## 🎯 Иконки

SVG иконки организованы по размерам:

```tsx
import { CartIcon, SearchIcon, BurgerIcon } from "@/components/icons";

<CartIcon className="h-8 w-8" />
<SearchIcon className="h-8 w-8 text-gray-600" />
```

| Папка | Размер | Назначение                     |
| ----- | ------ | ------------------------------ |
| 16px  | 16×16  | Social Media                   |
| 24px  | 24×24  | UI, категории, характеристики  |
| 32px  | 32×32  | Header (cart, search, user)    |
| 40px  | 40×40  | Mobile menu (burger)           |
| 48px  | 48×48  | Категории (большие)            |
| 56px  | 56×56  | Преимущества (delivery, stock) |

## 🛠 Технологии

### Frontend

- **React 19** + TypeScript
- **Vite 7** + Hot Reload
- **Tailwind CSS v4**
- **vite-plugin-svgr** для SVG

### Backend

- **Express 4** + TypeScript
- **Bun** runtime
- **CORS** + **dotenv**

## 🚢 Деплой

Готов к деплою на **Vercel**:

- Frontend: автоматический деплой web/
- Backend: Vercel Functions или отдельный сервер

## 📝 TODO

- [ ] Header с бургер-меню (mobile)
- [ ] Каталог товаров
- [ ] Страница товара
- [ ] Корзина
- [ ] Авторизация
- [ ] API для товаров
