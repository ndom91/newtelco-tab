import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const cypressLogin = Providers.Credentials({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize() {
    const user = new Promise(function (resolve) {
      resolve({
        id: 1,
        name: 'J Smith',
        email: 'jsmith@example.com',
        image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
      })
    })
    await user
    return user
  },
})

const Auth = NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    process.env.NEXT_PUBLIC_ENV === 'CI' && cypressLogin,
  ],
  // pages: {
  //   signIn: '/auth/signin',
  // },
  secret: 'cbb2c95e88ba3463ed5c458408d0e3c89c5baf955c4676ff9c39dc269d9eb8d0',
  session: {
    jwt: true,
  },
  jwt: {
    secret: '2232b2aa87fa3194739de95a534da03d9d1ffff8504f3996c8e6e87563118239',
  },
  debug: false,
})

export default Auth
