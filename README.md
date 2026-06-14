# 🚀 First GraphQL API with TypeScript & Apollo Server

Welcome to **First GraphQL**, a type-safe, lightweight GraphQL API built using **TypeScript**, **Apollo Server 5**, and **Node.js**. This project demonstrates the core concepts of GraphQL, including schema definitions (SDL), queries, mock database integration, and relational resolvers (one-to-many and nested relationships).

---

## 🌟 Features

- **Apollo Server v5**: Powered by the latest standalone Apollo Server for quick setup and playground sandbox interaction.
- **Strict TypeScript**: Fully configured TypeScript compilation for compile-time safety.
- **Relational Resolvers**: 
  - Products linked to their parent Categories.
  - Categories resolving list of associated Products.
  - Products displaying user Reviews.
- **Mock Database Integration**: In-memory JavaScript arrays representing `products`, `categories`, and `reviews` for instant execution without setting up a heavyweight database server.
- **Hot Reloading / Auto Compile**: Fully integrated watcher scripts compilation (`tsc -w`) paired with `nodemon` for active developer convenience.

---

## 📂 Project Structure

Below is the directory structure of the project, outlining the clean separation of concerns between schema declarations, database mock-ups, resolvers, and application entrypoint.

```text
first-graphql/
├── dist/                          # Compiled JavaScript output (ignored in Git)
├── src/                           # Source files
│   ├── gql/                       # GraphQL configuration files
│   │   ├── resolvers/             
│   │   │   └── index.ts           # Query and relational resolvers (Product, Category, etc.)
│   │   └── schema/                
│   │       └── index.ts           # Schema Definitions (typeDefs) using GraphQL SDL
│   ├── db.ts                      # In-memory mock database containing products, categories, & reviews data
│   └── index.ts                   # App entrypoint (initializes & starts Apollo Server on port 4000)
├── .gitignore                     # Git configuration files
├── package.json                   # Project scripts and dependencies definition
├── tsconfig.json                  # TypeScript compiler settings
├── yarn.lock                      # Dependency lockfile
└── README.md                      # Documentation (This file)
```

---

## 🛠️ Tech Stack & Dependencies

- **Runtime**: Node.js
- **Language**: TypeScript
- **GraphQL Engine**: Apollo Server (`@apollo/server`, `graphql`)
- **Developer Tools**: `nodemon` (auto restarts node server), `tsc` (compiler)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and either [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) installed on your machine.

### 2. Clone and Install Dependencies
Navigate to the project directory and install the packages:

```bash
# Using Yarn
yarn install

# Or using NPM
npm install
```

### 3. Run the Development Server
To start development with watch compile and automatic server restart:

#### Option A: Running separately (Highly Recommended)
Open two terminal windows:
- **Terminal 1** (Watch and compile TS files to JS):
  ```bash
  yarn compile  # runs "tsc --w"
  ```
- **Terminal 2** (Run local server with nodemon auto-restart):
  ```bash
  yarn dev      # runs "nodemon ./dist/index.js"
  ```

#### Option B: Clean Start & Run (Single Command)
Builds/compiles once, then runs the server:
```bash
yarn start      # runs "npm run compile && node ./dist/index.js"
```

Once started, the server will output:
```text
🚀 Server ready at: http://localhost:4000/
```

Open `http://localhost:4000/` in your browser to launch the **Apollo Sandbox Explorer**, where you can visually write and test queries.

---

## 📐 GraphQL Schema (SDL)

The schema definitions can be found inside [src/gql/schema/index.ts](file:///f:/my-projects/GraphQL-Project/first-graphql/src/gql/schema/index.ts). Below are the defined types:

```graphql
type Product {
  id: ID!
  name: String
  image: String
  description: String
  price: Float
  quantity: Int
  onStock: Boolean
  categoryId: String
  category: Category
  reviews: [Review]
}

type Category {
  id: ID!
  name: String
  products: [Product]
}

type Review {
  id: ID!
  review: String
  rating: Float
  date: String
  productId: String
}

type Query {
  products: [Product]
  product(productId: ID!): Product
  categories: [Category]
  category(categoryId: ID!): Category
}
```

---

## 🔍 Example GraphQL Queries

You can execute the following queries in the Apollo Sandbox:

### 1. Fetch All Products with Nested Category & Reviews
Fetches all products and resolves the nested categories and reviews details for each product.
```graphql
query GetAllProducts {
  products {
    id
    name
    price
    onStock
    category {
      id
      name
    }
    reviews {
      id
      review
      rating
    }
  }
}
```

### 2. Fetch a Single Product by ID
```graphql
query GetProductDetail {
  product(productId: "2a089dca-d882-4305-9e25-d1dfeb93fd12") {
    name
    price
    description
    quantity
    category {
      name
    }
  }
}
```

### 3. Fetch All Categories with Nested Products list
```graphql
query GetCategoriesAndProducts {
  categories {
    id
    name
    products {
      id
      name
      price
    }
  }
}
```

### 4. Fetch a Single Category
```graphql
query GetSingleCategory {
  category(categoryId: "1b6c2e31-2e03-4487-bedd-d1139c7e5571") {
    id
    name
    products {
      name
      price
    }
  }
}
```

---

## 📝 License

This project is licensed under the **MIT License**.
