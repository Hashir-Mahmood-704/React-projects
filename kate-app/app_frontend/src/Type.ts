export type SanityPostResponseType = {
  image: {
    asset: {
      url: string;
    };
  };
  _id: string;
  title: string;
  about: string;
  category: string;
  referenceToUser: {
    _id: string;
    userName: string;
    image: string;
  };
  like?: {
    _key: string;
    referenceToUser: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];

  save?: {
    _key: string;
    referenceToUser: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
};

export type SanityPostDetailsResponseType = SanityPostResponseType & {
  comments?: {
    _key: string;
    comment: string;
    referenceToUser: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
};

export type SanityUserResponseType = {
  image: string;
  userName: string;
  _id: string;
};
