const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} = require("graphql");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    client_name: { type: GraphQLString },
    email: { type: GraphQLString },
    passkey: { type: GraphQLString },
  }),
});

const contactType = new GraphQLObjectType({
    name: "contact",
    fields: ()=>({
        id : {type: GraphQLInt},
        firstname : {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        phonenumber: {type: GraphQLInt},
        user_id: {type: userType}
    })
})


const activityType = new GraphQLObjectType({
    name: 'activity',
    fields: ()=>({
        id : {type: GraphQLInt},
        action : {type: GraphQLString},
        description : {type: GraphQLString},
        date: {type: GraphQLString},
        time: {type: GraphQLString},
        user_id: {type: userType},
        contact_id: {type: contactType}
    })
})