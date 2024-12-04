import { unstable_cache } from 'next/cache'
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '@lib/database/databaseConnection';

const dev = process.env.NODE_ENV !== 'production';

interface PostFilters {
  [key: string]: any;
}

interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: 1 | -1 };
}

class PostController {
  private collection: any;

  private async init() {
    if (!this.collection) {
      const db = await connectToDatabase();
      this.collection = db.collection('posts');
    }
  }

  isValidObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  }

  async getPost(
      identifier: string
  ): Promise<any | null> {
    const isId = this.isValidObjectId(identifier);
    const findQuery = isId
        ? { _id: new ObjectId(identifier) }
        : { title: identifier };

    await this.init();

    const pipeline = [
      { $match: findQuery },
      {
        $lookup: {
          from: 'users', // Replace with the actual collection for authors
          localField: 'author',
          foreignField: '_id',
          as: 'authorData',
        },
      },
      {
        $lookup: {
          from: 'metas',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                type:1
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'files',
          localField: 'images',
          foreignField: '_id',
          as: 'imageData',
        },
      },
      {
        $lookup: {
          from: 'metas',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                type:1
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'metas',
          localField: 'actors',
          foreignField: '_id',
          as: 'actors',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                "type":1,
                imageUrl:1
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'files', // Replace with the actual collection for thumbnail files
          localField: 'thumbnail',
          foreignField: '_id',
          as: 'thumbnailData',
        },
      },
      {
        $project: {
          comments: 0,
          views: 0,
          likes: 0,
          disLikes: 0,
        },
      },
    ];

    const result = await this.collection.aggregate(pipeline).toArray();
    return result.length ? result[0] : null;
  }

  getPostCached = unstable_cache(
      async (identifier: string) => {
        return await this.getPost(identifier);
      },
      {
        // @ts-expect-error: Ts Error on revalidate but NextJs docs says we should use it like this
        revalidate: dev ? 1 : 2592000, // Cache duration in seconds (1 month)
        tags: ['post','cacheItem'], // might need to add unique key later depends on performance (memory usage)
      }
  );



  // WITH NO POPULATION EXAMPLE
  // async getPost(
  //   identifier: string
  // ): Promise<{ title: string; views: number } | null> {
  //   const isId = this.isValidObjectId(identifier);
  //   const findQuery = isId
  //     ? { _id: new ObjectId(identifier) }
  //     : { title: identifier };
  //   await this.init();
  //   return this.collection.findOne(findQuery, {
  //     projection: { comments: 0, views: 0, likes: 0, disLikes: 0 },
  //   });
  // }

  async getPosts(
    filters: PostFilters = {},
    options: QueryOptions = {}
  ): Promise<any[]> {
    await this.init();
    const { limit = 10, skip = 0, sort = { createdAt: -1 } } = options;
    return this.collection
      .find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray();
  }
}

export default new PostController();


// import connectToDatabase from "@lib/database/mongodb"
// import { ObjectId } from 'mongodb';
//
// const db = await connectToDatabase();
// const collection = db.collection('posts');
//
// const testPost = await collection.findOne(
//     {_id:new ObjectId(identifier)},
//     { projection: { title: 1, views: 1 } }
// )
//
// console.log(`post=> `,testPost)