export const fetchAllPosts = `*[_type == "post"] {
  image{
    asset->{
      url
    }
  },
   _id,
  title,
     about,
  category,
  referenceToUser->{
      _id,
        userName,
        image
      },
     like[]{
       _key,
       referenceToUser->{
         _id
       }
     },
  save[]{
        _key,
        referenceToUser->{
          _id,
          userName,
          image
        },
      },
    }`;

export const postDetailQuery = (postId: string) => {
  const query = `*[_type == "post" && _id == '${postId}']{
        image{
          asset->{
            url
          }
        },
        _id,
        title, 
        about,
        category,
        referenceToUser->{
          _id,
          userName,
          image
        },
       save[]{
        _key,
        referenceToUser->{
            _id,
            userName,
            image
          },
        },
        like[]{
          _key,
          referenceToUser->{
            _id
          }
        },
        comments[]{
          comment,
          _key,
          referenceToUser->{
            _id,
            userName,
            image
          },
        }
      }`;
  return query;
};

export const userQuery = (userId: string) => {
  return `*[_type == "user" && _id == '${userId}']`;
};
