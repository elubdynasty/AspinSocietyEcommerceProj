# Aspin Society eCommerce

> eCommerce built with the MERN stack & Redux.


## Features

- Shopping cart feature
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- User profile w/ orders
- Admin product management
- Admin user management
- Admin order details page
- Mark orders as delivered option (Admin only)

## Usage


### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
ATLAS_URI = your mongodb uri
JWT_SECRET = <Any string will do>
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd client
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd client
npm run build
```

There is a Render postbuild script @ the package.json, whenever you push it to Render for deployment, no need to build it manually. 

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

jd@example.com (Customer)
123456

nj@example.com (Customer)
123456
```


