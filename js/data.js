export const data = {
    title: {
        x: '30%',
        y: '50',
        content: 'Example'
    },
    entityData: [{
        name: 'User',
        position: {
            x: 100,
            y: 100
        },
        rows: [
            {
                type: 'String',
                name: 'id'
            },
            {
                type: 'String',
                name: 'username'
            },
            {
                type: 'String',
                name: 'password'
            },
            {
                type: 'String',
                name: 'email'
            },
            {
                type: 'String',
                name: 'firstName'
            },
            {
                type: 'String',
                name: 'lastName'
            },
            {
                type: 'Date',
                name: 'createdAt'
            },
            {
                type: 'Date',
                name: 'updatedAt'
            },
            {
                type: 'User',
                name: 'createdBy'
            },
            {
                type: 'User',
                name: 'updatedBy'
            },
        ]
    },
    {
        name: 'Product',
        position: {
            x: 400,
            y: 100
        },
        rows: [
            {
                type: 'String',
                name: 'id'
            },
            {
                type: 'String',
                name: 'name'
            },
            {
                type: 'String',
                name: 'description'
            },
            {
                type: 'Date',
                name: 'createdAt'
            },
            {
                type: 'Date',
                name: 'updatedAt'
            },
            {
                type: 'User',
                name: 'createdBy'
            },
            {
                type: 'User',
                name: 'updatedBy'
            },
        ]
    }]
};
