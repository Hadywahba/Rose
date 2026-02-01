
declare module "next-auth" {
    /**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
interface User {
    accessToken:string;
    user: {
        "_id": string,
        "firstName": string,
        "lastName": string,
        "email": string,
        "gender": string,
        "phone": number,
        "photo": string,
        "role": string,
        "wishlist": [],
        "addresses": [
            {
                "street": string,
                "phone": number,
                "city": string,
                "lat": string,
                "long": string,
                "username": string,
                "_id": string
            },
            {
                "street": string,
                "phone": string,
                "city": string,
                "lat": string,
                "long": string,
                "username": string,
                "_id": string
            },
            {
                "street": string,
                "phone": string,
                "city": string,
                "lat": string,
                "long": string,
                "username": string,
                "_id": string
            }
        ],
        "createdAt": string
    },
}   
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  type Session = User ["user"]
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type JWT = User ;
}