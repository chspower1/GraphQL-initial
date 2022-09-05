import { ApolloServer, gql } from "apollo-server";

const tweets = [
    {
        id: "1",
        text: "first!",
    },
    { id: "2", text: "Second!" },
];

const users = [
    {
        id: "1",
        firstName: "Hosung",
        lastName: "Cho",
    },
    {
        id: "2",
        firstName: "Hanuel",
        lastName: "Kim",
    },
];

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(root, { id }) {
            console.log(root);
            return tweets.find((tweet) => tweet.id === id);
        },
        allUsers() {
            return users;
        },
    },
    Mutation: {
        postTweet(root, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(root, { id }) {
            if (tweets.find((tweet) => tweet.id === id)) {
                const targetIndex = tweets.findIndex((tweet) => tweet.id === id);
                tweets.splice(targetIndex, 1);
                return true;
            } else {
                return false;
            }
        },
    },
    User: {
        fullName({ firstName, lastName }) {
            console.log(firstName, lastName);
            return `${firstName}${lastName}`;
        },
    },
};

const typeDefs = gql`
    type User {
        id: ID!
        fullName: String
        firstName: String
        lastName: String
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Query {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        ping: String!
        pong: String!
    }
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});
