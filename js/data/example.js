export const data = {
    "title": {
        "position": {
            "x": "30%",
            "y": "50"
        },
        "description": "Example"
    },
    "entityData": [
        {
            "name": "User",
            "id": "user",
            "position": {
                "x": 61,
                "y": 51
            },
            "primaryKey": "id",
            "rows": [
                {
                    "type": "String",
                    "name": "id"
                },
                {
                    "type": "String",
                    "name": "username"
                },
                {
                    "type": "String",
                    "name": "password"
                },
                {
                    "type": "String",
                    "name": "email"
                },
                {
                    "type": "String",
                    "name": "firstName"
                },
                {
                    "type": "String",
                    "name": "lastName"
                },
                {
                    "type": "Date",
                    "name": "createdAt"
                },
                {
                    "type": "Date",
                    "name": "updatedAt"
                },
                {
                    "type": "User",
                    "name": "createdBy"
                },
                {
                    "type": "User",
                    "name": "updatedBy"
                }
            ]
        },
        {
            "name": "Product",
            "id": "product",
            "position": {
                "x": 584,
                "y": 121
            },
            "primaryKey": "id",
            "rows": [
                {
                    "type": "String",
                    "name": "id"
                },
                {
                    "type": "String",
                    "name": "name"
                },
                {
                    "type": "String",
                    "name": "description"
                },
                {
                    "type": "Date",
                    "name": "createdAt"
                },
                {
                    "type": "Date",
                    "name": "updatedAt"
                },
                {
                    "type": "User",
                    "name": "createdBy"
                },
                {
                    "type": "User",
                    "name": "updatedBy"
                }
            ]
        },
        {
            "name": "Order",
            "id": "order",
            "position": {
                "x": 340,
                "y": 380
            },
            "primaryKey": "id",
            "rows": [
                {
                    "type": "String",
                    "name": "id"
                },
                {
                    "type": "User",
                    "name": "user"
                },
                {
                    "type": "Array",
                    "name": "productItems"
                },
                {
                    "type": "Enum",
                    "name": "status"
                },
                {
                    "type": "Address",
                    "name": "address"
                },
                {
                    "type": "Date",
                    "name": "createdAt"
                },
                {
                    "type": "Date",
                    "name": "updatedAt"
                },
                {
                    "type": "User",
                    "name": "createdBy"
                },
                {
                    "type": "User",
                    "name": "updatedBy"
                }
            ]
        }
    ],
    "refs": [
        {
            "type": null,
            "fromTable": "Order",
            "toTable": "User",
            "fromField": "user",
            "toField": "id"
        },
        {
            "type": null,
            "fromTable": "Order",
            "toTable": "Product",
            "fromField": "productItems",
            "toField": "id"
        }
    ]
}
