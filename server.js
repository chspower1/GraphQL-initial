import { ApolloServer, gql } from "apollo-server";

const resolvers = {
    Query: {
        allMovies() {
            return fetch("https://yts.mx/api/v2/list_movies.json") //
                .then((res) => res.json())
                .then((json) => json.data.movies);
        },
        movie(root, { id }) {
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`) //
                .then((res) => res.json())
                .then((json) => json.data.movie);
        },
    },
};

const typeDefs = gql`
    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
    }
    type Query {
        allMovies: [Movie!]!
        movie(id: String!): Movie
    }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});
