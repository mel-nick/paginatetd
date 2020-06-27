## Simple MERN stack app with paginated API.

# Technology stack
MongoDB <br>
Express <br>
React <br>
Node

# API response
```javascript

{
    "prev": null,
    "next": "/api/users?page=2&limit=10",
    "currentPage": 1,
    "totalPages": 101,
    "users": [
        {
            "_id": "5ee78b165200ecc09c1a965b",
            "first_name": "Dennison",
            "last_name": "Voce",
            "email": "dvoce0@technorati.com"
        },
        {
            "_id": "5ee78b165200ecc09c1a965c",
            "first_name": "Maryjane",
            "last_name": "Jzak",
            "email": "mjzak1@reference.com"
        },
        {
            "_id": "5ee78b165200ecc09c1a965d",
            "first_name": "Hillery",
            "last_name": "Norcott",
            "email": "hnorcott2@nih.gov"
        },
        {
            "_id": "5ee78b165200ecc09c1a965e",
            "first_name": "Koressa",
            "last_name": "Rabley",
            "email": "krabley3@google.co.jp"
        },
        {
            "_id": "5ee78b165200ecc09c1a965f",
            "first_name": "Dreddy",
            "last_name": "Scaplehorn",
            "email": "dscaplehorn4@posterous.com"
        },
        {
            "_id": "5ee78b165200ecc09c1a9660",
            "first_name": "Conney",
            "last_name": "Di Nisco",
            "email": "cdinisco5@ebay.com"
        },
        {
            "_id": "5ee78b165200ecc09c1a9661",
            "first_name": "Kippy",
            "last_name": "Leser",
            "email": "kleser6@fda.gov"
        },
        {
            "_id": "5ee78b165200ecc09c1a9662",
            "first_name": "Lotti",
            "last_name": "Jerdein",
            "email": "ljerdein7@army.mil"
        },
        {
            "_id": "5ee78b165200ecc09c1a9663",
            "first_name": "Demetri",
            "last_name": "Lawfull",
            "email": "dlawfull8@arstechnica.com"
        },
        {
            "_id": "5ee78b165200ecc09c1a9664",
            "first_name": "Briano",
            "last_name": "Cheal",
            "email": "bcheal9@webeden.co.uk"
        }
    ]
}

```

# How to
1. in the root directory create .env file with "MONGODB_URI" variable
2. install 


# Demo link
https://paginated.herokuapp.com
