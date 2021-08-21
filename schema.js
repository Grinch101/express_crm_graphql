const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const { DOMAIN, commitClient } = require("./db");



const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    client_name: { type: GraphQLString },
    passkey: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const contactType = new GraphQLObjectType({
  name: "contact",
  fields: () => ({
    id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    phonenumber: { type: GraphQLInt },
    // user: { type: userType },
    // activity: { type: activityType },
    user_id: {type: GraphQLInt}
  }),
});

const activityType = new GraphQLObjectType({
  name: "activity",
  fields: () => ({
    id: { type: GraphQLInt },
    action: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    //
    user_id: { type: GraphQLInt },
    activity_id: { type: GraphQLInt },

  }),
});

const RootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async function (parent, args) {
        let client = DOMAIN.client;
        let rows = (await client.query("SELECT * FROM users;")).rows
        await commitClient()
        return rows
      },
    },
    user:{
      type: userType,
      args: {
        id : {type: GraphQLInt}
      },
      resolve: async function(parentVal, args){
        let client = DOMAIN.client;
        let rows = (await client.query("SELECT * FROM users WHERE id=$1;",[args.id])).rows
        await commitClient()
        return rows[0]
      }
    },
    contacts:{
      type: new GraphQLList(contactType),
      args:{
        user_id: {type: GraphQLInt }
      },
      resolve: async function(parentVal, args){
        let client = DOMAIN.client;
        let rows = (await client.query("SELECT * FROM contacts WHERE user_id=$1;",[args.user_id])).rows
        await commitClient()
        return rows
      }
    },
    // contact:{},
    // activities:{},
    // activity:{}
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
