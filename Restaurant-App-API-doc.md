# Restaurant App API Documentation

## Endpoints :

- `POST /users`
- `POST /categories`
- `POST /food`

- `GET /users`
- `GET /categories`
- `GET /food`

- `GET /users/:id`
- `GET /categories/:id`
- `GET /food/:id`

- `DELETE /users/:id`
- `DELETE /categories/:id`
- `DELETE /food/:id`

- `POST /login`
- `GET /auth/google-sign-in`
- `PUT /food`

- `PATCH /food`
- `GET /histories`
- `POST /public/register`

- `POST /public/login`
- `GET /public/auth/google-sign-in`
- `GET /public/food`

- `GET /public/food/:id`
- `GET /public/favorites`
- `POST /public/favorites`

- `GET /public/qrcode`
- `GET /public/categories`
- `DELETE /public/favorites/:id`

&nbsp;

## 1. POST /register

Description:
- Create new Admin user

Request:

- body:

```json
{
	"username": "string",
	"email": "string | unique | email format | required",
	"password": "string | min length 5 | required",
	"phoneNumber": "string",
	"address": "string"
}
```

_Response (201 - Created)_

```json
{
	"access_token": "sagfuklayrgluawhf.wklaufhkuyagrarg.wufhwaluifeweifugwla",
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Staff",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
	"Email cannot be empty",
	"Email must be email format",
	"This email is already registered",
        "Password cannot be empty",
	"Password must be 5 letter long minimum"
    ]
}
```

&nbsp;

## 2. POST /categories

Description:
- Create new food category

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"name": "string | required"
}
```

_Response (201 - Created)_

```json
{
    "category": {
        "id": 4,
        "name": "Sides",
        "updatedAt": "2022-11-15T00:13:21.198Z",
        "createdAt": "2022-11-15T00:13:21.198Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        "Category.name cannot be null"
    ]
}
```

&nbsp;

## 3. POST /food

Description:
- Create new food

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"name": "string | required",
	"description": "string | required",
	"price": "integer | min 5000 | required",
	"imgUrl": "string | required",
	"categoryId": "integer | required"
}
```

_Response (201 - Created)_

```json
{
    "food": {
        "id": 14,
        "name": "Pan Cake",
        "description": "This very cheap Pan Cake comes with the good ol pan",
        "price": 5000,
        "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "updatedAt": "2022-11-15T00:24:44.059Z",
        "createdAt": "2022-11-15T00:24:44.059Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        "Food.name cannot be null",
        "Food.description cannot be null",
        "Food.price cannot be null",
        "Food.imgUrl cannot be null"
    ]
}
```

&nbsp;


## 4. GET /users

Description:
- Get all user

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
[
    {
        "username": null,
        "email": "wscally0@ihg.com",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Lyle Futcher",
        "email": "lfutcher1@columbia.edu",
        "role": "Admin",
        "phoneNumber": "+7-495-119-7816",
        "address": "55 Bayside Plaza",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": null,
        "email": "dchamberlaine2@wired.com",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Brigit McElwee",
        "email": "bmcelwee3@umich.edu",
        "role": "Staff",
        "phoneNumber": "+51-497-976-4691",
        "address": "78242 Russell Center",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Maje Gilchrest",
        "email": "mgilchrest4@dedecms.com",
        "role": "Staff",
        "phoneNumber": "+51-794-539-1191",
        "address": "405 Commercial Road",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": null,
        "email": "sdanelut5@rakuten.co.jp",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Thatcher Nijs",
        "email": "tnijs6@parallels.com",
        "role": "Staff",
        "phoneNumber": "+51-350-366-6358",
        "address": "338 Rowland Crossing",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Dedie Eshmade",
        "email": "deshmade7@usnews.com",
        "role": "Staff",
        "phoneNumber": "+351-367-894-0074",
        "address": "22 John Wall Way",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Issi Linklater",
        "email": "ilinklater8@mashable.com",
        "role": "Staff",
        "phoneNumber": "+86-147-171-4077",
        "address": "8128 Golden Leaf Way",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Bryan Nys",
        "email": "bnys9@google.co.uk",
        "role": "Staff",
        "phoneNumber": "+86-427-463-7701",
        "address": "19682 Sachs Circle",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Shena Varian",
        "email": "svariana@miibeian.gov.cn",
        "role": "Staff",
        "phoneNumber": "+7-211-913-4921",
        "address": "532 Riverside Terrace",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Pattie Hazelton",
        "email": "phazeltonb@unc.edu",
        "role": "Admin",
        "phoneNumber": "+62-845-739-1119",
        "address": "38 Randy Alley",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Tiffy Hansford",
        "email": "thansfordc@redcross.org",
        "role": "Staff",
        "phoneNumber": "+46-954-194-0494",
        "address": "879 Portage Way",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": null,
        "email": "bgodmard@webs.com",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "West Whatman",
        "email": "wwhatmane@ask.com",
        "role": "Staff",
        "phoneNumber": "+385-825-287-2127",
        "address": "8892 Redwing Hill",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Darryl Ondra",
        "email": "dondraf@wisc.edu",
        "role": "Staff",
        "phoneNumber": "+86-753-538-3775",
        "address": "94 Goodland Trail",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Janeva Tainton",
        "email": "jtaintong@umich.edu",
        "role": "Staff",
        "phoneNumber": "+970-660-197-6015",
        "address": "9 Utah Hill",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Kaycee Olyfant",
        "email": "kolyfanth@amazon.co.uk",
        "role": "Staff",
        "phoneNumber": "+54-238-981-2345",
        "address": "291 Caliangt Lane",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": null,
        "email": "mgraybeali@nsw.gov.au",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Bourke Francesco",
        "email": "bfrancescoj@booking.com",
        "role": "Admin",
        "phoneNumber": "+81-869-309-1803",
        "address": "262 Park Meadow Crossing",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    },
    {
        "username": "Someone You Love",
        "email": "someoneyl123@gmail.com",
        "role": "Staff",
        "phoneNumber": "0898327684872425",
        "address": "Wall Street Washington DC, Russia",
        "createdAt": "2022-11-15T00:05:37.719Z",
        "updatedAt": "2022-11-15T00:05:37.719Z"
    }
]
```

&nbsp;

## 5. GET /categories

Description:
- Get all category

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
[
    {
        "name": "appetizer",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "main course",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "dessert",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "Sides",
        "createdAt": "2022-11-15T00:13:21.198Z",
        "updatedAt": "2022-11-15T00:13:21.198Z"
    }
]
```

&nbsp;

## 6. GET /food

Description:
- Get all food

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 11,
        "name": "Cake - Miini Cheesecake Cherry",
        "description": "Nondisp fx of dist phalanx of unsp fngr, 7thD",
        "price": 441758,
        "imgUrl": "https://www.mybakingaddiction.com/wp-content/uploads/2018/06/mini-cherry-almond-cheesecakes-16-of-19.jpg",
	"status": "Active",
        "authorId": 2,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 2,
            "username": "Lyle Futcher",
            "email": "lfutcher1@columbia.edu",
            "role": "Admin",
            "phoneNumber": "+7-495-119-7816",
            "address": "55 Bayside Plaza",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 10,
        "name": "Pork Ham Prager",
        "description": "Other specified injuries of unspecified foot, init encntr",
        "price": 201244,
        "imgUrl": "https://www.theblackpeppercorn.com/wp-content/uploads/2017/06/How-to-Cook-a-Picnic-Shoulder-Ham-hires-1024x683.jpg",
	"status": "Active",
        "authorId": 7,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 7,
            "username": "Thatcher Nijs",
            "email": "tnijs6@parallels.com",
            "role": "Staff",
            "phoneNumber": "+51-350-366-6358",
            "address": "338 Rowland Crossing",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 7,
        "name": "Shrimp - 16 - 20 Cooked, Peeled",
        "description": "Disp fx of navicular of left foot, subs for fx w malunion",
        "price": 443778,
        "imgUrl": "https://cdn.shopify.com/s/files/1/0267/7830/4535/products/CenSea16.20CookedDisplayEdit_1728x.jpg?v=1588461582",
	"status": "Active",
        "authorId": 6,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 6,
            "username": null,
            "email": "sdanelut5@rakuten.co.jp",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 1,
        "name": "Wine - Fontanafredda Barolo",
        "description": "Laceration w foreign body of finger w damage to nail, subs",
        "price": 262999,
        "imgUrl": "https://images.absolutdrinks.com/ingredient-images/Raw/Absolut/49a02e2a-4c6c-4e5b-bec7-94d7eb80de8b.jpg",
	"status": "Active",
        "authorId": 3,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 3,
            "username": null,
            "email": "dchamberlaine2@wired.com",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 13,
        "name": "Lamb Leg - Bone - In Nz",
        "description": "Asphyxiation due to cave-in or falling earth, sequela",
        "price": 198258,
        "imgUrl": "https://www.beckandbulow.com/wp-content/uploads/2020/05/roasted-stuffed-leg-of-lamb-P7YNHM3-scaled.jpg",
	"status": "Active",
        "authorId": 8,
        "categoryId": 2,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 2,
            "name": "main course",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 8,
            "username": "Dedie Eshmade",
            "email": "deshmade7@usnews.com",
            "role": "Staff",
            "phoneNumber": "+351-367-894-0074",
            "address": "22 John Wall Way",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 12,
        "name": "Beef - Shank",
        "description": "Other chronic hematogenous osteomyelitis, tibia and fibula",
        "price": 107427,
        "imgUrl": "http://msbelly.com/wp-content/uploads/2013/09/beef-shankspom-11.jpg",
	"status": "Active",
        "authorId": 7,
        "categoryId": 2,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 2,
            "name": "main course",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 7,
            "username": "Thatcher Nijs",
            "email": "tnijs6@parallels.com",
            "role": "Staff",
            "phoneNumber": "+51-350-366-6358",
            "address": "338 Rowland Crossing",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 9,
        "name": "Pork - Back, Short Cut, Boneless",
        "description": "Precipitate labor",
        "price": 153155,
        "imgUrl": "https://momsdinner.net/wp-content/uploads/2019/08/Instant-Pot-Boneless-Pork-Rib-Recipe-6-1075x1536.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 2,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 2,
            "name": "main course",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 6,
            "username": null,
            "email": "sdanelut5@rakuten.co.jp",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 8,
        "name": "Soup Campbells Turkey Veg.",
        "description": "Rheumatoid lung disease with rheumatoid arthritis",
        "price": 113199,
        "imgUrl": "https://lh6.googleusercontent.com/proxy/lMeUHnDIO1Dfj7v_-_XcgkqD3iWG5GsbwT5Z9F-i6BH3t6QiJ1uA06v_nLKPvg8duTVt4Abn344sOdd0hmqEKqhoTWeC6z1XtZCOUoJjUkqfkw03KSPGXixz5vM9tNsmflKIwesVIR5CWSy3rIOmvE82VxRWsmX25o0nJfyyLiJnYQcm=w1200-h630-p-k-no-nu",
	"status": "Active",
        "authorId": 3,
        "categoryId": 2,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 2,
            "name": "main course",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 3,
            "username": null,
            "email": "dchamberlaine2@wired.com",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 14,
        "name": "Pan Cake",
        "description": "This very cheap Pan Cake comes with the good ol pan",
        "price": 5000,
        "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "createdAt": "2022-11-15T00:24:44.059Z",
        "updatedAt": "2022-11-15T00:24:44.059Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 6,
            "username": null,
            "email": "sdanelut5@rakuten.co.jp",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 6,
        "name": "Club Soda - Schweppes, 355 Ml",
        "description": "Toxic effect of cadmium and its compounds, assault, subs",
        "price": 364588,
        "imgUrl": "https://d2d8wwwkmhfcva.cloudfront.net/800x/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_46553c8e-5ebb-4808-a011-505e9ab50cdd.png",
	"status": "Active",
        "authorId": 2,
        "categoryId": 3,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 2,
            "username": "Lyle Futcher",
            "email": "lfutcher1@columbia.edu",
            "role": "Admin",
            "phoneNumber": "+7-495-119-7816",
            "address": "55 Bayside Plaza",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 5,
        "name": "Cookie Double Choco",
        "description": "Unsp inj intrinsic musc/fasc/tend l idx fngr at wrs/hnd lv",
        "price": 84157,
        "imgUrl": "https://simplyhomecooked.com/wp-content/uploads/2020/05/chocolate-fudge-cookies-n-3-scaled.jpg",
	"status": "Active",
        "authorId": 8,
        "categoryId": 3,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    id": 8,
            "username": "Dedie Eshmade",
            "email": "deshmade7@usnews.com",
            "role": "Staff",
            "phoneNumber": "+351-367-894-0074",
            "address": "22 John Wall Way",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 4,
        "name": "Coffee - Decaffeinato Coffee",
        "description": "Erysipeloid",
        "price": 110209,
        "imgUrl": "https://www.pasticceriabrembati.com/wp-content/uploads/2020/10/caffe-2.jpg",
	"status": "Active",
        "authorId": 7,
        "categoryId": 3,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 7,
            "username": "Thatcher Nijs",
            "email": "tnijs6@parallels.com",
            "role": "Staff",
            "phoneNumber": "+51-350-366-6358",
            "address": "338 Rowland Crossing",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 3,
        "name": "Wine - Touraine Azay - Le - Rideau",
        "description": "War op w fragmt of improv explosv device, civilian, subs",
        "price": 146555,
        "imgUrl": "https://pariswinecompany.com/wp-content/uploads/2020/12/rose-surprise-768x2506.png",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 6,
            "username": null,
            "email": "sdanelut5@rakuten.co.jp",
            "role": "Staff",
            "phoneNumber": null,
            "address": null,
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    },
    {
        "id": 2,
        "name": "Juice - Apple Cider",
        "description": "Therapeutic and rehab ophthalmic devices assoc w incdt",
        "price": 80011,
        "imgUrl": "https://cdn.healthyrecipes101.com/wp-content/uploads/2021/07/how-much-apple-cider-vinegar-should-you-drink.jpeg",
	"status": "Active",
        "authorId": 5,
        "categoryId": 3,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 3,
            "name": "dessert",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
        "User": {
	    "id": 5,
            "username": "Maje Gilchrest",
            "email": "mgilchrest4@dedecms.com",
            "role": "Staff",
            "phoneNumber": "+51-794-539-1191",
            "address": "405 Commercial Road",
            "createdAt": "2022-11-14T22:28:18.148Z",
            "updatedAt": "2022-11-14T22:28:18.148Z"
        }
    }
]
```

&nbsp;


## 7. GET /users/:id

Description:
- Get user with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "username": "Lyle Futcher",
    "email": "lfutcher1@columbia.edu",
    "role": "Admin",
    "phoneNumber": "+7-495-119-7816",
    "address": "55 Bayside Plaza",
    "createdAt": "2022-11-14T22:28:18.148Z",
    "updatedAt": "2022-11-14T22:28:18.148Z"
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;

## 8. GET /categories/:id

Description:
- Get category with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "name": "main course",
    "createdAt": "2022-11-14T22:28:18.193Z",
    "updatedAt": "2022-11-14T22:28:18.193Z"
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;

## 9. GET /food/:id

Description:
- Get food with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "name": "Juice - Apple Cider",
    "description": "Therapeutic and rehab ophthalmic devices assoc w incdt",
    "price": 80011,
    "imgUrl": "https://cdn.healthyrecipes101.com/wp-content/uploads/2021/07/how-much-apple-cider-vinegar-should-you-drink.jpeg",
    "status": "Active",
    "authorId": 5,
    "categoryId": 3,
    "createdAt": "2022-11-14T22:28:18.212Z",
    "updatedAt": "2022-11-14T22:28:18.212Z",
    "Category": {
        "id": 3,
        "name": "dessert",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    "User": {
	"id": 5,
        "username": "Maje Gilchrest",
        "email": "mgilchrest4@dedecms.com",
        "role": "Staff",
        "phoneNumber": "+51-794-539-1191",
        "address": "405 Commercial Road",
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    }
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;


## 10. DELETE /users/:id

Description:
- Delete user with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "message": "null with id 1 success to delete",
    "user": {
        "username": null,
        "email": "wscally0@ihg.com",
        "role": "Staff",
        "phoneNumber": null,
        "address": null,
        "createdAt": "2022-11-14T22:28:18.148Z",
        "updatedAt": "2022-11-14T22:28:18.148Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
	"error": "Key (id)=(1) is still referenced from table \"Food\"."
}
```
_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;

## 11. DELETE /categories/:id

Description:
- Delete category with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "message": "Sides with id 4 success to delete",
    "category": {
        "id": 4,
        "name": "Sides",
        "createdAt": "2022-11-15T00:13:21.198Z",
        "updatedAt": "2022-11-15T00:13:21.198Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
	"error": "Key (id)=(4) is still referenced from table \"Food\"."
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;

## 12. DELETE /food/:id

Description:
- Delete food with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "message": "Pan Cake with id 14 success to delete",
    "food": {
        "id": 14,
        "name": "Pan Cake",
        "description": "This very cheap Pan Cake comes with the good ol pan",
        "price": 5000,
        "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "createdAt": "2022-11-15T00:24:44.059Z",
        "updatedAt": "2022-11-15T00:24:44.059Z"
    }
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

&nbsp;

## 13. POST /login

Description:
- Login user

Request:

- header:

For token validation.

```json
{
	"access_token": "string | required"
}
```

OR

- body:

```json
{
	"email": "string | email format | required",
	"password": "string | required",
}
```

_Response (200 - OK)_

```json
{
	"access_token": "gflaujkhrwklghlaieuwrghlawiruhg.gwerguyhweurkygfwayurgwrg.ilwurghuwygfolwigyfew",
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Staff",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Invalid username or password",
}
```

&nbsp;

## 14. GET /auth/google-sign-in

Description:

- Login with Google

Request:

- headers:

```json
{
	"google_auth": "string token | required"
}
```

_Response (201 - Created)_

```json
{
	"access_token": "sufaguikawygrfawrgerhg.asdkfyghwikygefwyfgkwygfwargfa.gsfolduygfesikrygoalrewybgaewyrg"
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Staff",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (200 - OK)_

```json
{
	"access_token": "sufaguikawygrfawrgerhg.asdkfyghwikygefwyfgkwygfwargfa.gsfolduygfesikrygoalrewybgaewyrg"
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Staff",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

&nbsp;

## 15. PUT /food

Description:
- Update food

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"name": "string | required",
	"description": "string | required",
	"price": "integer | min 5000 | required",
	"imgUrl": "string | required",
	"categoryId": "integer | required"
}
```

_Response (200 - OK)_

```json
{
    "food": {
        "id": 14,
        "name": "Pan Cake",
        "description": "This very cheap Pan Cake comes with the good ol pan",
        "price": 5000,
        "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "updatedAt": "2022-11-15T00:24:44.059Z",
        "createdAt": "2022-11-15T00:24:44.059Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
        "Food.name cannot be null",
        "Food.description cannot be null",
        "Food.price cannot be null",
        "Food.imgUrl cannot be null"
    ]
}
```

&nbsp;

## 16. PATCH /food

Description:
- Update food status

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"status": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "food": {
        "id": 14,
        "name": "Pan Cake",
        "description": "This very cheap Pan Cake comes with the good ol pan",
        "price": 5000,
        "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	"status": "Active",
        "authorId": 6,
        "categoryId": 3,
        "updatedAt": "2022-11-15T00:24:44.059Z",
        "createdAt": "2022-11-15T00:24:44.059Z"
    }
}
```

&nbsp;

## 17. GET /histories

Description:
- Get all histories

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 6,
        "name": "Shrimp - 16 - 20 Cooked, Peeled",
        "description": "Menu status with id 7 has been updated from Active to Inactive",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:37:57.323Z",
        "updatedAt": "2022-11-21T13:37:57.323Z"
    },
    {
        "id": 5,
        "name": "Beef - Shank",
        "description": "Menu status with id 12 has been updated from Active to Active",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:37:01.195Z",
        "updatedAt": "2022-11-21T13:37:01.195Z"
    },
    {
        "id": 4,
        "name": "Pork - Back, Short Cut, Boneless",
        "description": "Menu status with id 9 has been updated from Active to Active",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:36:55.900Z",
        "updatedAt": "2022-11-21T13:36:55.900Z"
    },
    {
        "id": 3,
        "name": "Shrimp - 16 - 20 Cooked, Peeled",
        "description": "Menu status with id 7 has been updated from Active to Active",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:36:49.827Z",
        "updatedAt": "2022-11-21T13:36:49.827Z"
    },
    {
        "id": 2,
        "name": "Wine - Touraine Azay - Le - Rideau",
        "description": "Menu status with id 3 has been updated from Active to Active",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:35:10.676Z",
        "updatedAt": "2022-11-21T13:35:10.676Z"
    },
    {
        "id": 1,
        "name": "Wine - Fontanafredda Barolo",
        "description": "Menu status with id 1 has been updated from Active to Active",
        "updatedBy": "kolyfanth@amazon.co.uk",
        "createdAt": "2022-11-21T13:35:03.939Z",
        "updatedAt": "2022-11-21T13:35:03.939Z"
    }
]
```

&nbsp;

## 18. POST /public/register

Description:
- Create new Customer user

Request:

- body:

```json
{
	"username": "string",
	"email": "string | unique | email format | required",
	"password": "string | min length 5 | required",
	"phoneNumber": "string",
	"address": "string"
}
```

_Response (201 - Created)_

```json
{
	"access_token": "sagfuklayrgluawhf.wklaufhkuyagrarg.wufhwaluifeweifugwla",
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Customer",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
	"Email cannot be empty",
	"Email must be email format",
	"This email is already registered",
        "Password cannot be empty",
	"Password must be 5 letter long minimum"
    ]
}
```

&nbsp;

## 19. POST /public/login

Description:
- Login user

Request:

- header:

For token validation.

```json
{
	"access_token": "string | required"
}
```

OR

- body:

```json
{
	"email": "string | email format | required",
	"password": "string | required",
}
```

_Response (200 - OK)_

```json
{
	"access_token": "gflaujkhrwklghlaieuwrghlawiruhg.gwerguyhweurkygfwayurgwrg.ilwurghuwygfolwigyfew",
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Customer",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Invalid username or password"
}
```
OR
```json
{
	"error": "Public endpoint can only be accessed by customer"
}
```

&nbsp;

## 20. GET /public/auth/google-sign-in

Description:

- Login with Google

Request:

- headers:

```json
{
	"google_auth": "string token | required"
}
```

_Response (201 - Created)_

```json
{
	"access_token": "sufaguikawygrfawrgerhg.asdkfyghwikygefwyfgkwygfwargfa.gsfolduygfesikrygoalrewybgaewyrg"
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Customer",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

_Response (200 - OK)_

```json
{
	"access_token": "sufaguikawygrfawrgerhg.asdkfyghwikygefwyfgkwygfwargfa.gsfolduygfesikrygoalrewybgaewyrg"
	"user": {
	    "username": "Cut Nyak Dine",
	    "email": "wscally0@ihg.com",
	    "role": "Customer",
	    "phoneNumber": 23573894756,
	    "address": "Jl. Cut nyak Dien, Jaksel"
	}
}
```

&nbsp;

## 21. GET /public/food

Description:
- Get all food

_Response (200 - OK)_

```json
[
    "pageInfo": {
	"totalItems": 12,
	"itemsPerPage": 9,
	"currentPage": 1,
    },
    "food": [
	{
	    "id": 11,
	    "name": "Cake - Miini Cheesecake Cherry",
	    "description": "Nondisp fx of dist phalanx of unsp fngr, 7thD",
	    "price": 441758,
	    "imgUrl": "https://www.mybakingaddiction.com/wp-content/uploads/2018/06/mini-cherry-almond-cheesecakes-16-of-19.jpg",
	    "status": "Active",
	    "authorId": 2,
	    "categoryId": 1,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 1,
		"name": "appetizer",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 10,
	    "name": "Pork Ham Prager",
	    "description": "Other specified injuries of unspecified foot, init encntr",
	    "price": 201244,
	    "imgUrl": "https://www.theblackpeppercorn.com/wp-content/uploads/2017/06/How-to-Cook-a-Picnic-Shoulder-Ham-hires-1024x683.jpg",
	    "status": "Active",
	    "authorId": 7,
	    "categoryId": 1,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 1,
		"name": "appetizer",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 7,
	    "name": "Shrimp - 16 - 20 Cooked, Peeled",
	    "description": "Disp fx of navicular of left foot, subs for fx w malunion",
	    "price": 443778,
	    "imgUrl": "https://cdn.shopify.com/s/files/1/0267/7830/4535/products/CenSea16.20CookedDisplayEdit_1728x.jpg?v=1588461582",
	    "status": "Active",
	    "authorId": 6,
	    "categoryId": 1,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 1,
		"name": "appetizer",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 1,
	    "name": "Wine - Fontanafredda Barolo",
	    "description": "Laceration w foreign body of finger w damage to nail, subs",
	    "price": 262999,
	    "imgUrl": "https://images.absolutdrinks.com/ingredient-images/Raw/Absolut/49a02e2a-4c6c-4e5b-bec7-94d7eb80de8b.jpg",
	    "status": "Active",
	    "authorId": 3,
	    "categoryId": 1,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 1,
		"name": "appetizer",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 13,
	    "name": "Lamb Leg - Bone - In Nz",
	    "description": "Asphyxiation due to cave-in or falling earth, sequela",
	    "price": 198258,
	    "imgUrl": "https://www.beckandbulow.com/wp-content/uploads/2020/05/roasted-stuffed-leg-of-lamb-P7YNHM3-scaled.jpg",
	    "status": "Active",
	    "authorId": 8,
	    "categoryId": 2,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 2,
		"name": "main course",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 12,
	    "name": "Beef - Shank",
	    "description": "Other chronic hematogenous osteomyelitis, tibia and fibula",
	    "price": 107427,
	    "imgUrl": "http://msbelly.com/wp-content/uploads/2013/09/beef-shankspom-11.jpg",
	    "status": "Active",
	    "authorId": 7,
	    "categoryId": 2,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 2,
		"name": "main course",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 9,
	    "name": "Pork - Back, Short Cut, Boneless",
	    "description": "Precipitate labor",
	    "price": 153155,
	    "imgUrl": "https://momsdinner.net/wp-content/uploads/2019/08/Instant-Pot-Boneless-Pork-Rib-Recipe-6-1075x1536.jpg",
	    "status": "Active",
	    "authorId": 6,
	    "categoryId": 2,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 2,
		"name": "main course",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 8,
	    "name": "Soup Campbells Turkey Veg.",
	    "description": "Rheumatoid lung disease with rheumatoid arthritis",
	    "price": 113199,
	    "imgUrl": "https://lh6.googleusercontent.com/proxy/lMeUHnDIO1Dfj7v_-_XcgkqD3iWG5GsbwT5Z9F-i6BH3t6QiJ1uA06v_nLKPvg8duTVt4Abn344sOdd0hmqEKqhoTWeC6z1XtZCOUoJjUkqfkw03KSPGXixz5vM9tNsmflKIwesVIR5CWSy3rIOmvE82VxRWsmX25o0nJfyyLiJnYQcm=w1200-h630-p-k-no-nu",
	    "status": "Active",
	    "authorId": 3,
	    "categoryId": 2,
	    "createdAt": "2022-11-14T22:28:18.212Z",
	    "updatedAt": "2022-11-14T22:28:18.212Z",
	    "Category": {
		"id": 2,
		"name": "main course",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	},
	{
	    "id": 14,
	    "name": "Pan Cake",
	    "description": "This very cheap Pan Cake comes with the good ol pan",
	    "price": 5000,
	    "imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
	    "status": "Active",
	    "authorId": 6,
	    "categoryId": 3,
	    "createdAt": "2022-11-15T00:24:44.059Z",
	    "updatedAt": "2022-11-15T00:24:44.059Z",
	    "Category": {
		"id": 3,
		"name": "dessert",
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    },
	}
    ]
]
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Public endpoint can only be accessed by customer"
}
```

&nbsp;

## 22. GET /public/food/:id

Description:
- Get food with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "name": "Juice - Apple Cider",
    "description": "Therapeutic and rehab ophthalmic devices assoc w incdt",
    "price": 80011,
    "imgUrl": "https://cdn.healthyrecipes101.com/wp-content/uploads/2021/07/how-much-apple-cider-vinegar-should-you-drink.jpeg",
    "status": "Active",
    "authorId": 5,
    "categoryId": 3,
    "createdAt": "2022-11-14T22:28:18.212Z",
    "updatedAt": "2022-11-14T22:28:18.212Z",
    "Category": {
        "id": 3,
        "name": "dessert",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    "FavoriteFoods": [
	{
	    "id": 1
	    "UserId": 1,
	    "FoodId": 2,
	    "createdAt": "2022-11-14T22:28:18.193Z",
	    "updatedAt": "2022-11-14T22:28:18.193Z"
	}
    ]
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Not Found"
}
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Public endpoint can only be accessed by customer"
}
```

&nbsp;

## 23. GET /public/favorites

Description:
- Get all user's favorite food

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 11,
        "name": "Cake - Miini Cheesecake Cherry",
        "description": "Nondisp fx of dist phalanx of unsp fngr, 7thD",
        "price": 441758,
        "imgUrl": "https://www.mybakingaddiction.com/wp-content/uploads/2018/06/mini-cherry-almond-cheesecakes-16-of-19.jpg",
	"status": "Active",
        "authorId": 2,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
	"FavoriteFoods": [
	    {
		"id": 1
		"UserId": 1,
		"FoodId": 11,
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    }
	]
    },
    {
        "id": 10,
        "name": "Pork Ham Prager",
        "description": "Other specified injuries of unspecified foot, init encntr",
        "price": 201244,
        "imgUrl": "https://www.theblackpeppercorn.com/wp-content/uploads/2017/06/How-to-Cook-a-Picnic-Shoulder-Ham-hires-1024x683.jpg",
	"status": "Active",
        "authorId": 7,
        "categoryId": 1,
        "createdAt": "2022-11-14T22:28:18.212Z",
        "updatedAt": "2022-11-14T22:28:18.212Z",
        "Category": {
            "id": 1,
            "name": "appetizer",
            "createdAt": "2022-11-14T22:28:18.193Z",
            "updatedAt": "2022-11-14T22:28:18.193Z"
        },
	"FavoriteFoods": [
	    {
		"id": 2
		"UserId": 1,
		"FoodId": 10,
		"createdAt": "2022-11-14T22:28:18.193Z",
		"updatedAt": "2022-11-14T22:28:18.193Z"
	    }
	]
    },
]
```

&nbsp;

## 24. POST /public/favorites

Description:
- Create new user's favorite food

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"FoodId": "number | required"
}
```

_Response (201 - Created)_

```json
{
	"id": 1
	"UserId": 1,
	"FoodId": 1,
	"createdAt": "2022-11-14T22:28:18.193Z",
	"updatedAt": "2022-11-14T22:28:18.193Z"
	
}
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Public endpoint can only be accessed by customer"
}
```

_Response (400 - Bad Request)_

```json
{
    "errors": [
    	"User Id can't be empty",
	"Food Id can't be empty",
	"This menu is already in your favorite list"
    ]
}
```

&nbsp;

## 25. GET /public/qrcode

Description:
- Generate QR Code from provided code

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

- body:

```json
{
	"code": "string | required"
}
```

_Response (200 - OK)_

```json
{
	"success": true,
	"qrcode": "base64 string data",
	"size": {
		"width": 400,
		"height": 400
	}
}
```

_Response (401 - Unauthorized)_

```json
{
	"error": "Public endpoint can only be accessed by customer"
}
```

_Response (400 - Bad Request)_

```json
{
	"success": false,
	"error": "string"
}
```

&nbsp;

## 26. GET /public/categories

Description:
- Get all category

_Response (200 - OK)_

```json
[
    {
        "name": "appetizer",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "main course",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "dessert",
        "createdAt": "2022-11-14T22:28:18.193Z",
        "updatedAt": "2022-11-14T22:28:18.193Z"
    },
    {
        "name": "Sides",
        "createdAt": "2022-11-15T00:13:21.198Z",
        "updatedAt": "2022-11-15T00:13:21.198Z"
    }
]
```

&nbsp;

## 27. DELETE /public/favorites/:id

Description:
- Delete favorites with id

Request:

- headers:
```js
{
	"access_token": "string | required"
}
```

_Response (200 - OK)_

```json
{
	"id": 2
	"UserId": 1,
	"User": {
		"id": 1,
		"username": "Lyle Futcher",
		"email": "lfutcher1@columbia.edu",
		"role": "Customer",
		"phoneNumber": "+7-495-119-7816",
		"address": "55 Bayside Plaza",
		"createdAt": "2022-11-14T22:28:18.148Z",
		"updatedAt": "2022-11-14T22:28:18.148Z"
	},
	"FoodId": 2,
	"Food": {
		"id": 2,
		"name": "Pan Cake",
		"description": "This very cheap Pan Cake comes with the good ol pan",
		"price": 5000,
		"imgUrl": "https://thumbs.dreamstime.com/b/frying-pan-pancakes-22359773.jpg",
		"status": "Active",
		"authorId": 6,
		"categoryId": 3,
		"updatedAt": "2022-11-15T00:24:44.059Z",
		"createdAt": "2022-11-15T00:24:44.059Z"
	},
	"createdAt": "2022-11-14T22:28:18.193Z",
	"updatedAt": "2022-11-14T22:28:18.193Z"
}
```

_Response (404 - Not Found)_

```json
{
	"error": "Favorite not found"
}
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
	"error": "Invalid token"
}
```

_Response (400 - Forbidden)_

```json
{
	"error": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
	"error": "Internal server error"
}
```
OR
```json
{
	"errors": [
		{
		  "message": "Internal server error"
		},
		{
		  "message": "Internal server error 2"
		}
	]
}
```
