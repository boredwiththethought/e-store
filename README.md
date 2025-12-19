# E-Store# E-Store

Современный интернет-магазин электроники на **Bun + React + Express + MongoDB + TypeScript**.Современный интернет-магазин электроники на **Bun + React + Express + TypeScript**.

## 🚀 Быстрый старт## 🚀 Быстрый старт

`bash`bash

# Установка зависимостей# Установка зависимостей

bun run install:allbun run install:all

# Запуск разработки (server + web)# Запуск разработки (server + web)

bun run devbun run dev

```



- **Web**: http://localhost:5173- **Web**: http://localhost:5173

- **API**: http://localhost:3000- **API**: http://localhost:3000



## 📁 Структура проекта## 📁 Структура проекта



```

e-store/e-store/

├── server/ # Backend (Express + MongoDB)├── server/ # Backend API (Express + TypeScript)

│ └── src/│ └── src/

│ ├── index.ts # Entry point│ └── index.ts

│ ├── db/ # MongoDB connection├── web/ # Frontend (React + Vite + Tailwind CSS v4)

│ ├── routes/ # API routes (auth)│ └── src/

│ └── types/ # TypeScript types│ ├── assets/

││ │ └── fonts/ # SF Pro Display (WOFF2)

├── web/ # Frontend (React + Vite + Tailwind)│ ├── components/

│ └── src/│ │ ├── icons/ # SVG иконки (по размерам)

│ ├── assets/fonts/ # SF Pro Display (WOFF2)│ │ ├── logo/ # Логотип компонент

│ ├── components/│ │ └── header/ # Header компонент

│ │ ├── icons/ # SVG иконки (16px - 56px)│ └── App.tsx

│ │ ├── inputs/ # Input компоненты├── package.json # Корневые скрипты (concurrently)

│ │ ├── header/ # Header + Navigation└── README.md

│ │ ├── footer/ # Footer```

│ │ ├── logo/ # Logo

│ │ └── ui/ # UI компоненты## 📜 Скрипты

│ ├── context/ # React Context (Auth)

│ ├── hooks/ # Custom hooks| Команда | Описание |

│ ├── pages/| ----------------------- | -------------------------------- |

│ │ ├── auth/ # SignIn, SignUp, ForgotPassword| `bun run dev` | Запуск server + web в dev режиме |

│ │ └── legal/ # Terms, Privacy| `bun run build` | Сборка server + web |

│ └── App.tsx| `bun run start` | Запуск production сборки |

│| `bun run install:all` | Установка всех зависимостей |

├── package.json # Root scripts (concurrently)| `bun run clean` | Очистка node_modules и dist |

└── README.md| `bun run fonts:convert` | Конвертация OTF → WOFF2 |

````

## 🎨 Шрифты

## 📜 Скрипты

Используется **SF Pro Display** в формате WOFF2:

| Команда               | Описание                         |

| --------------------- | -------------------------------- |- Regular (400), Medium (500), Bold (700)

| `bun run dev`         | Запуск server + web в dev режиме |- Italic варианты: Light, Semibold, Heavy, Black

| `bun run build`       | Сборка server + web              |

| `bun run install:all` | Установка всех зависимостей      |Шрифт автоматически применяется через Tailwind CSS:

| `bun run clean`       | Очистка node_modules и dist      |

```tsx

## 🔐 Аутентификация<p className="font-medium">Текст в SF Pro Display Medium</p>

````

- **JWT** токены (access token)

- **bcryptjs** для хеширования паролей## 🎯 Иконки

- **Remember Me** (localStorage / sessionStorage)

- MongoDB Atlas для хранения пользователейSVG иконки организованы по размерам:

### API Endpoints```tsx

import { CartIcon, SearchIcon, BurgerIcon } from "@/components/icons";

````

POST /api/auth/signup    - Регистрация<CartIcon className="h-8 w-8" />

POST /api/auth/signin    - Вход<SearchIcon className="h-8 w-8 text-gray-600" />

GET  /api/auth/me        - Текущий пользователь```

GET  /api/health         - Health check

```| Папка | Размер | Назначение                     |

| ----- | ------ | ------------------------------ |

## 🎨 Компоненты| 16px  | 16×16  | Social Media                   |

| 24px  | 24×24  | UI, категории, характеристики  |

### Input компоненты (`@/components/inputs`)| 32px  | 32×32  | Header (cart, search, user)    |

| 40px  | 40×40  | Mobile menu (burger)           |

| Компонент               | Описание                           || 48px  | 48×48  | Категории (большие)            |

| ----------------------- | ---------------------------------- || 56px  | 56×56  | Преимущества (delivery, stock) |

| `Input`                 | Базовый input с label, hint, error |

| `CVVInput`              | CVV с eye toggle (show/hide)       |## 🛠 Технологии

| `CardNumberInput`       | Номер карты с авто-форматированием |

| `Select`                | Dropdown с поиском                 |### Frontend

| `QuantityInput`         | Селектор количества (+/-)          |

| `RatingSelect`          | Фильтр по рейтингу (звёзды)        |- **React 19** + TypeScript

| `StarRating`            | Отображение рейтинга               |- **Vite 7** + Hot Reload

| `InteractiveStarRating` | Кликабельные звёзды                |- **Tailwind CSS v4**

| `PriceRangeSlider`      | Слайдер цен (min/max)              |- **vite-plugin-svgr** для SVG



### UI компоненты (`@/components/ui`)### Backend



| Компонент       | Описание                    |- **Express 4** + TypeScript

| --------------- | --------------------------- |- **Bun** runtime

| `PasswordInput` | Пароль с strength indicator |- **CORS** + **dotenv**

| `SearchInput`   | Поиск                       |

## 🚢 Деплой

### Layout компоненты

Готов к деплою на **Vercel**:

| Компонент    | Описание                        |

| ------------ | ------------------------------- |- Frontend: автоматический деплой web/

| `Header`     | Responsive header с mobile menu |- Backend: Vercel Functions или отдельный сервер

| `Footer`     | Footer с навигацией и соцсетями |

| `MobileMenu` | Slide-out мобильное меню        |## 📝 TODO

| `Navigation` | Навигация с NavLink             |

- [ ] Header с бургер-меню (mobile)

## 🎨 Шрифты- [ ] Каталог товаров

- [ ] Страница товара

**SF Pro Display** (WOFF2):- [ ] Корзина

- [ ] Авторизация

- Regular (400), Medium (500), Bold (700)- [ ] API для товаров

- Italic варианты

```tsx
<p className="font-medium">SF Pro Display Medium</p>
````

## 🎯 Иконки

SVG иконки по размерам:

```tsx
import { CartIcon, SearchIcon, EyeIcon } from "@/components/icons";
```

| Папка | Размер | Назначение   |
| ----- | ------ | ------------ |
| 16px  | 16×16  | Social Media |
| 24px  | 24×24  | UI, Actions  |
| 32px  | 32×32  | Header       |
| 40px  | 40×40  | Mobile menu  |
| 48px  | 48×48  | Категории    |
| 56px  | 56×56  | Преимущества |

## 🛠 Технологии

### Frontend

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- React Router v7
- vite-plugin-svgr

### Backend

- Express 4 + TypeScript
- MongoDB + Mongoose
- JWT + bcryptjs
- Bun runtime

## ✅ Готово

- [x] Bun + Concurrently monorepo
- [x] MongoDB подключение
- [x] Auth система (SignIn/SignUp)
- [x] Header responsive с mobile menu
- [x] Footer с навигацией
- [x] Input компоненты для e-commerce
- [x] Terms of Service / Privacy Policy

## 🔜 В разработке

- [ ] Product Cards
- [ ] Products API + загрузка из JSON
- [ ] Cart система
- [ ] Favorites
- [ ] Checkout
