# E-Store 🛒# E-Store# E-Store

Современный интернет-магазин электроники на **Bun + React 19 + Express + MongoDB + TypeScript**.Современный интернет-магазин электроники на **Bun + React + Express + MongoDB + TypeScript**.Современный интернет-магазин электроники на **Bun + React + Express + TypeScript**.

![React](https://img.shields.io/badge/React-19.2-blue)## 🚀 Быстрый старт## 🚀 Быстрый старт

![Vite](https://img.shields.io/badge/Vite-7.3-purple)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan)`bash`bash

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

![Bun](https://img.shields.io/badge/Bun-Runtime-orange)# Установка зависимостей# Установка зависимостей

## 🚀 Быстрый стартbun run install:allbun run install:all

````bash# Запуск разработки (server + web)# Запуск разработки (server + web)

# Установка зависимостей

bun run install:allbun run devbun run dev



# Запуск разработки (server + web)```

bun run dev

````

- **Web**: http://localhost:5173- **Web**: http://localhost:5173- **Web**: http://localhost:5173

- **API**: http://localhost:3000

- **API**: http://localhost:3000- **API**: http://localhost:3000

## 📁 Структура проекта

````

e-store/## 📁 Структура проекта## 📁 Структура проекта

├── server/                 # Backend API (Express + TypeScript)

│   └── src/

│       ├── index.ts        # Entry point

│       ├── db/             # MongoDB connection```

│       ├── routes/         # API routes (auth, products, favorites)

│       ├── middleware/     # JWT auth middlewaree-store/e-store/

│       ├── scripts/        # Import scripts

│       └── types/          # TypeScript types├── server/ # Backend (Express + MongoDB)├── server/ # Backend API (Express + TypeScript)

│

├── web/                    # Frontend (React + Vite + Tailwind CSS v4)│ └── src/│ └── src/

│   └── src/

│       ├── assets/│ ├── index.ts # Entry point│ └── index.ts

│       │   └── fonts/      # SF Pro Display (WOFF2)

│       ├── components/│ ├── db/ # MongoDB connection├── web/ # Frontend (React + Vite + Tailwind CSS v4)

│       │   ├── footer/     # Footer компонент

│       │   ├── header/     # Header + MobileMenu│ ├── routes/ # API routes (auth)│ └── src/

│       │   ├── icons/      # SVG иконки

│       │   ├── inputs/     # Input компоненты│ └── types/ # TypeScript types│ ├── assets/

│       │   ├── logo/       # Логотип

│       │   └── ui/         # UI компоненты (Breadcrumbs, buttons)││ │ └── fonts/ # SF Pro Display (WOFF2)

│       ├── config/         # API configuration

│       ├── context/        # React Context (Auth, Cart)├── web/ # Frontend (React + Vite + Tailwind)│ ├── components/

│       ├── hooks/          # Custom hooks

│       ├── pages/│ └── src/│ │ ├── icons/ # SVG иконки (по размерам)

│       │   ├── auth/       # SignIn, SignUp, ForgotPassword

│       │   ├── cart/       # Корзина│ ├── assets/fonts/ # SF Pro Display (WOFF2)│ │ ├── logo/ # Логотип компонент

│       │   ├── checkout/   # Оформление заказа

│       │   ├── favorites/  # Избранное│ ├── components/│ │ └── header/ # Header компонент

│       │   ├── home/       # Главная страница

│       │   ├── legal/      # Terms, Privacy│ │ ├── icons/ # SVG иконки (16px - 56px)│ └── App.tsx

│       │   ├── product-detail/ # Страница товара

│       │   └── products-page/  # Каталог товаров│ │ ├── inputs/ # Input компоненты├── package.json # Корневые скрипты (concurrently)

│       ├── types/          # TypeScript types

│       └── App.tsx         # Роутинг│ │ ├── header/ # Header + Navigation└── README.md

│

├── package.json            # Корневые скрипты (concurrently)│ │ ├── footer/ # Footer```

└── README.md

```│ │ ├── logo/ # Logo



## 📜 Скрипты│ │ └── ui/ # UI компоненты## 📜 Скрипты



| Команда               | Описание                         |│ ├── context/ # React Context (Auth)

| --------------------- | -------------------------------- |

| `bun run dev`         | Запуск server + web в dev режиме |│ ├── hooks/ # Custom hooks| Команда | Описание |

| `bun run build`       | Сборка server + web              |

| `bun run start`       | Запуск production сборки         |│ ├── pages/| ----------------------- | -------------------------------- |

| `bun run install:all` | Установка всех зависимостей      |

| `bun run clean`       | Очистка node_modules и dist      |│ │ ├── auth/ # SignIn, SignUp, ForgotPassword| `bun run dev` | Запуск server + web в dev режиме |

| `bun run fonts:convert` | Конвертация OTF → WOFF2        |

│ │ └── legal/ # Terms, Privacy| `bun run build` | Сборка server + web |

## 🔐 API Endpoints

│ └── App.tsx| `bun run start` | Запуск production сборки |

### Auth

```│| `bun run install:all` | Установка всех зависимостей |

POST /api/auth/signup     - Регистрация

POST /api/auth/signin     - Вход├── package.json # Root scripts (concurrently)| `bun run clean` | Очистка node_modules и dist |

GET  /api/auth/me         - Текущий пользователь

POST /api/auth/forgot-password - Сброс пароля└── README.md| `bun run fonts:convert` | Конвертация OTF → WOFF2 |

````

````

### Products

```## 🎨 Шрифты

GET  /api/products        - Все товары (с фильтрами)

GET  /api/products/:id    - Товар по ID## 📜 Скрипты

GET  /api/products?category=phones - По категории

```Используется **SF Pro Display** в формате WOFF2:



### Favorites| Команда               | Описание                         |

```

GET    /api/favorites     - Список избранного| --------------------- | -------------------------------- |- Regular (400), Medium (500), Bold (700)

POST   /api/favorites/:id - Добавить в избранное

DELETE /api/favorites/:id - Удалить из избранного| `bun run dev`         | Запуск server + web в dev режиме |- Italic варианты: Light, Semibold, Heavy, Black

```

| `bun run build`       | Сборка server + web              |

### Other

```| `bun run install:all` | Установка всех зависимостей      |Шрифт автоматически применяется через Tailwind CSS:

GET  /api/health          - Health check

POST /api/seed            - Заполнить БД тестовыми данными| `bun run clean`       | Очистка node_modules и dist      |

```

```tsx

## 🎨 Компоненты

## 🔐 Аутентификация<p className="font-medium">Текст в SF Pro Display Medium</p>

### Input компоненты (`@/components/inputs`)

````

| Компонент | Описание |

| ----------------------- | ---------------------------------- |- **JWT** токены (access token)

| `Input` | Базовый input с label, hint, error |

| `CVVInput` | CVV с eye toggle (show/hide) |- **bcryptjs** для хеширования паролей## 🎯 Иконки

| `CardNumberInput` | Номер карты с авто-форматированием |

| `Select` | Dropdown с поиском |- **Remember Me** (localStorage / sessionStorage)

| `QuantityInput` | Селектор количества (+/-) |

| `RatingSelect` | Фильтр по рейтингу (звёзды) |- MongoDB Atlas для хранения пользователейSVG иконки организованы по размерам:

| `StarRating` | Отображение рейтинга |

| `InteractiveStarRating` | Кликабельные звёзды |### API Endpoints```tsx

| `PriceRangeSlider` | Слайдер цен (min/max) |

import { CartIcon, SearchIcon, BurgerIcon } from "@/components/icons";

### UI компоненты (`@/components/ui`)

`````

| Компонент        | Описание                     |

| ---------------- | ---------------------------- |POST /api/auth/signup    - Регистрация<CartIcon className="h-8 w-8" />

| `Breadcrumbs`    | Навигационные хлебные крошки |

| `PasswordInput`  | Пароль с strength indicator  |POST /api/auth/signin    - Вход<SearchIcon className="h-8 w-8 text-gray-600" />

| `SearchInput`    | Поиск                        |

| `PrimaryButton`  | Основная кнопка              |GET  /api/auth/me        - Текущий пользователь```

| `SecondaryButton`| Второстепенная кнопка        |

GET  /api/health         - Health check

### Layout компоненты

```| Папка | Размер | Назначение                     |

| Компонент    | Описание                        |

| ------------ | ------------------------------- || ----- | ------ | ------------------------------ |

| `Header`     | Responsive header с mobile menu |

| `Footer`     | Footer с навигацией и соцсетями |## 🎨 Компоненты| 16px  | 16×16  | Social Media                   |

| `MobileMenu` | Slide-out мобильное меню        |

| 24px  | 24×24  | UI, категории, характеристики  |

## 📱 Страницы

### Input компоненты (`@/components/inputs`)| 32px  | 32×32  | Header (cart, search, user)    |

| Страница           | URL                    | Описание                |

| ------------------ | ---------------------- | ----------------------- || 40px  | 40×40  | Mobile menu (burger)           |

| Home               | `/`                    | Главная с баннером и табами |

| Products           | `/products`            | Каталог всех товаров    || Компонент               | Описание                           || 48px  | 48×48  | Категории (большие)            |

| Category           | `/category/:category`  | Товары по категории     |

| Product Detail     | `/product/:id`         | Страница товара         || ----------------------- | ---------------------------------- || 56px  | 56×56  | Преимущества (delivery, stock) |

| Cart               | `/cart`                | Корзина                 |

| Checkout           | `/checkout`            | Оформление заказа       || `Input`                 | Базовый input с label, hint, error |

| Favorites          | `/favorites`           | Избранное               |

| Sign In            | `/auth/signin`         | Вход                    || `CVVInput`              | CVV с eye toggle (show/hide)       |## 🛠 Технологии

| Sign Up            | `/auth/signup`         | Регистрация             |

| Forgot Password    | `/auth/forgot-password`| Восстановление пароля   || `CardNumberInput`       | Номер карты с авто-форматированием |

| Terms              | `/terms`               | Условия использования   |

| Privacy            | `/privacy`             | Политика конфиденциальности || `Select`                | Dropdown с поиском                 |### Frontend



## 🎨 Шрифты| `QuantityInput`         | Селектор количества (+/-)          |



Используется **SF Pro Display** в формате WOFF2:| `RatingSelect`          | Фильтр по рейтингу (звёзды)        |- **React 19** + TypeScript



- Regular (400), Medium (500), Bold (700)| `StarRating`            | Отображение рейтинга               |- **Vite 7** + Hot Reload

- Italic варианты: Light, Semibold, Heavy, Black

| `InteractiveStarRating` | Кликабельные звёзды                |- **Tailwind CSS v4**

```tsx

<p className="font-medium">Текст в SF Pro Display Medium</p>| `PriceRangeSlider`      | Слайдер цен (min/max)              |- **vite-plugin-svgr** для SVG

```



## 🎯 Иконки

### UI компоненты (`@/components/ui`)### Backend

SVG иконки организованы по размерам в `@/components/icons`:



```tsx

import { CartIcon, SearchIcon, BurgerIcon } from "@/components/icons";| Компонент       | Описание                    |- **Express 4** + TypeScript



<CartIcon className="h-8 w-8" />| --------------- | --------------------------- |- **Bun** runtime

<SearchIcon className="h-8 w-8 text-gray-600" />

```| `PasswordInput` | Пароль с strength indicator |- **CORS** + **dotenv**



| Папка | Размер | Назначение                     || `SearchInput`   | Поиск                       |

| ----- | ------ | ------------------------------ |

| 16px  | 16×16  | Social Media                   |## 🚢 Деплой

| 24px  | 24×24  | UI, категории, характеристики  |

| 32px  | 32×32  | Header (cart, search, user)    |### Layout компоненты

| 40px  | 40×40  | Mobile menu (burger)           |

| 48px  | 48×48  | Категории (большие)            |Готов к деплою на **Vercel**:

| 56px  | 56×56  | Преимущества (delivery, stock) |

| Компонент    | Описание                        |

## 🛠 Технологии

| ------------ | ------------------------------- |- Frontend: автоматический деплой web/

### Frontend

- **React 19.2** + TypeScript| `Header`     | Responsive header с mobile menu |- Backend: Vercel Functions или отдельный сервер

- **Vite 7.3** + Hot Reload

- **Tailwind CSS v4.1** (новый @theme синтаксис)| `Footer`     | Footer с навигацией и соцсетями |

- **React Router v7** + SPA

- **@heroicons/react** для иконок| `MobileMenu` | Slide-out мобильное меню        |## 📝 TODO

- **vite-plugin-svgr** для SVG

| `Navigation` | Навигация с NavLink             |

### Backend

- **Express 4** + TypeScript- [ ] Header с бургер-меню (mobile)

- **MongoDB 7** (MongoDB Atlas)

- **JWT** + **bcryptjs** для аутентификации## 🎨 Шрифты- [ ] Каталог товаров

- **Bun** runtime

- [ ] Страница товара

## 🚢 Деплой на Vercel

**SF Pro Display** (WOFF2):- [ ] Корзина

### Настройка

- [ ] Авторизация

**1. Деплой сервера:**

```bash- Regular (400), Medium (500), Bold (700)- [ ] API для товаров

cd server

vercel- Italic варианты

```

```tsx

**2. Деплой веба:**<p className="font-medium">SF Pro Display Medium</p>

```bash````

cd web

vercel## 🎯 Иконки

```

SVG иконки по размерам:

### Environment Variables

```tsx

**Server (.env):**import { CartIcon, SearchIcon, EyeIcon } from "@/components/icons";

```env```

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/estore

JWT_SECRET=your-secret-key| Папка | Размер | Назначение   |

SEED_SECRET_KEY=your-seed-key| ----- | ------ | ------------ |

```| 16px  | 16×16  | Social Media |

| 24px  | 24×24  | UI, Actions  |

**Web (.env.production):**| 32px  | 32×32  | Header       |

```env| 40px  | 40×40  | Mobile menu  |

VITE_API_URL=https://your-server.vercel.app/api| 48px  | 48×48  | Категории    |

```| 56px  | 56×56  | Преимущества |



## ✅ Реализовано## 🛠 Технологии



- [x] Bun + Concurrently monorepo### Frontend

- [x] MongoDB Atlas подключение

- [x] Auth система (SignIn/SignUp/ForgotPassword)- React 19 + TypeScript

- [x] JWT аутентификация- Vite 7

- [x] Header responsive с mobile menu- Tailwind CSS v4

- [x] Footer с навигацией и соцсетями- React Router v7

- [x] Products API + Categories- vite-plugin-svgr

- [x] Каталог товаров с фильтрами

- [x] Страница товара### Backend

- [x] Корзина (Cart) с Context

- [x] Checkout (4 шага)- Express 4 + TypeScript

- [x] Favorites (localStorage + API)- MongoDB + Mongoose

- [x] Breadcrumbs навигация- JWT + bcryptjs

- [x] Полностью responsive дизайн- Bun runtime

- [x] Готов к деплою на Vercel

## ✅ Готово

## 📝 TODO

- [x] Bun + Concurrently monorepo

- [ ] Поиск товаров (Search)- [x] MongoDB подключение

- [ ] Отзывы на товары- [x] Auth система (SignIn/SignUp)

- [ ] История заказов- [x] Header responsive с mobile menu

- [ ] Профиль пользователя- [x] Footer с навигацией

- [ ] Email уведомления- [x] Input компоненты для e-commerce

- [ ] Интеграция платежей- [x] Terms of Service / Privacy Policy



## 📄 Лицензия## 🔜 В разработке



MIT- [ ] Product Cards

- [ ] Products API + загрузка из JSON
- [ ] Cart система
- [ ] Favorites
- [ ] Checkout
`````
