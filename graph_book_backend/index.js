const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://full_stack:sPBBR2xjxtkvInfQ@cluster0-mbype.mongodb.net/library?retryWrites=true&w=majority'

console.log('commecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  }
)

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }
  type Author {
    name: String!,
    born: Int,
    bookCount: Int
  }
  type User {
    username: String!,
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String! 
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.find({}).length,
    allBooks: async (root, args) => {
      if (args.author) {
        return Book.find({}).populate({path: "author", match: {name: args.author}})
      }
      if (args.genre) {
        return Book.find({ genres: args.genre })
      }
      const books = await Book.find({}).populate({path: "author"})
      console.log(books)
      return books.filter(book => book.author)
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // if (!(authors.filter(author => author.name == args.author).length)) {
      //   const newAuthor = { id: uuid(), name: args.author }
      //   authors = authors.concat(newAuthor)
      // }
      // const book = { ...args, id: uuid() }
      // books = books.concat(book)
      // return book
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try {
        let author = await Author.findOne({name: args.author})
        if (!author) {
          author = new Author({name: args.author})
          await author.save()
        }
        const book = new Book({ ...args, author: author })

        console.log(book)
        await book.save()
        author.books = [...author.books, book]
        await author.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = Number(args.setBornTo)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})