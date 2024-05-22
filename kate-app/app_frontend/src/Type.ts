export type SanityPostResponseType = {
  image: {
    asset: {
      url: string
    }
  }
  _id: string
  title: string
  about: string
  category: string
  referenceToUser: {
    _id: string
    userName: string
    image: string
  }
  like?: {
    _key: string
    referenceToUser: {
      _id: string
      userName: string
      image: string
    }
  }[]

  save?: {
    _key: string
    referenceToUser: {
      _id: string
      userName: string
      image: string
    }
  }[]
}
