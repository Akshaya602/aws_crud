import dynamoose from 'dynamoose';

const crudSchema = new dynamoose.Schema(
    {
        id:{
            type: Number,
            hashKey:true,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        createdOn: {
            type: String,
            default: new Date().toISOString(),
        },
    },
    { autoCreate: false }  
);

const userModel = dynamoose.model('User', crudSchema, { tableName: ''});

export { userModel };