import { unstable_cache, unstable_cacheTag as cacheTag  } from 'next/cache';
import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from '@lib/database/databaseConnection';
import { Post } from '@repo/typescript-types';
import { postFieldRequestForCards } from '@repo/data-structures';

interface PostFilters {
  [key: string]: any;
}

interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: 1 | -1 };
}

interface IRelatedPostsArg {
  post: Post;
  relatedByFields?: string[];
  limit?: number;
}

const dev = process.env.NODE_ENV !== 'production';



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

  async getPost(identifier: string): Promise<any | null> {
    const isId = this.isValidObjectId(identifier);
    const findQuery = isId ? { _id: new ObjectId(identifier) } : { title: identifier };

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
                type: 1,
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
                type: 1,
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
                type: 1,
                imageUrl: 1,
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

  async getRelatedPosts({
    post,
    relatedByFields = ['actors', 'categories', 'tags', 'author'],
    limit = 8,
  }: IRelatedPostsArg): Promise<any[]> {
    let relatedPosts: any[] = [];
    const seenPosts = new Set<string>(); // Track seen posts to avoid duplicates

    await this.init();

    try {
      // Loop through each field in relatedByFields to find related posts
      for (const field of relatedByFields) {
        const remainingLimit = limit - relatedPosts.length; // Calculate remaining posts needed
        if (remainingLimit <= 0) break;

        const pipeline = [
          {
            $match: {
              [field]: { $in: post[field] || [] },
              _id: {
                $ne: post._id,
                $nin: Array.from(seenPosts).map((id) => new ObjectId(id)),
              },
              status: 'published', // Only published posts
            },
          },
          {
            $sort: { updatedAt: -1, createdAt: -1 },
          },
          {
            $project: postFieldRequestForCards.reduce(
              (projection, field) => {
                projection[field] = 1;
                return projection;
              },
              { _id: 1 }
            ), // Ensure `_id` is always included
          },
          {
            $limit: remainingLimit,
          },
        ];

        const postsByField = await this.collection.aggregate(pipeline).toArray();

        // Add unique posts to relatedPosts and track their IDs
        for (const p of postsByField) {
          if (!seenPosts.has(p._id.toString())) {
            seenPosts.add(p._id.toString());
            relatedPosts.push(p);
          }
        }
      }

      // Fallback loop to fill up to the limit with any published posts
      const remainingLimit = limit - relatedPosts.length;
      if (remainingLimit > 0) {
        const fallbackPipeline = [
          {
            $match: {
              _id: {
                $ne: post._id,
                $nin: Array.from(seenPosts).map((id) => new ObjectId(id)),
              },
              status: 'published',
            },
          },
          {
            $sort: { updatedAt: -1, createdAt: -1 },
          },
          {
            $project: postFieldRequestForCards.reduce(
              (projection, field) => {
                projection[field] = 1;
                return projection;
              },
              { _id: 1 }
            ), // Ensure `_id` is always included
          },
          {
            $limit: remainingLimit,
          },
        ];

        const fallbackPosts = await this.collection.aggregate(fallbackPipeline).toArray();
        relatedPosts = [...relatedPosts, ...fallbackPosts];
      }

      // Sort relatedPosts by updatedAt, then by createdAt
      relatedPosts.sort((a, b) => b.updatedAt - a.updatedAt || b.createdAt - a.createdAt);

      return relatedPosts;
    } catch (error) {
      console.error('findRelatedPosts=>', error);
      return [];
    }
  }

  static async getPostViews(_id: string): Promise<number> {

    try {
      await this.init();
      const result =  this.collection.findOne(
        { _id: new ObjectId(_id) },
        {
          projection: { views: 1 },
        }
      );

      return result?.views || 0;
    } catch (error) {
      console.error(`postController.getRelatedPosts => `, error);
      return 0;
    }

  }

  async getPostRating(_id: string): Promise<{ likes: number; disLikes: number }> {

    try {

      await this.init();
      const ratingData = await this.collection.findOne(
        { _id: new ObjectId(_id) },
        {
          projection: { likes: 1, dislikes: 1 },
        }
      );

      return {
        likes: ratingData.likes || 0,
        disLikes: ratingData.disLikes || 0,
      };
    } catch (error) {
      console.error(`postController.getRelatedPosts => `, error);
      return {
        likes: 0,
        disLikes: 0,
      };
    }

  }

  getPostCached = unstable_cache(
    async (identifier: string) => {
      return await this.getPost(identifier);
    },
    {
      // @ts-expect-error: Ts Error on revalidate but NextJs docs says we should use it like this
      revalidate: dev ? 1 : 2592000, // Cache duration in seconds (1 month)
      tags: ['post', 'cacheItem'], // might need to add unique key later depends on performance (memory usage)
    }
  );

  getRelatedPostsCached = unstable_cache(
    async ({ post, relatedByFields, limit }: IRelatedPostsArg) => {
      return await this.getRelatedPosts({
        post,
        relatedByFields,
        limit,
      });
    },
    {
      // @ts-expect-error: Ts Error on revalidate but NextJs docs says we should use it like this
      revalidate: dev ? 1 : 2592000, // Cache duration in seconds (1 month)
      tags: ['post', 'cacheItem'], // might need to add unique key later depends on performance (memory usage)
    }
  );

  // getPostViewsCached = unstable_cache(
  //   async (_id: string) => {
  //     return await this.getPostViews(_id);
  //   },
  //   {
  //     // @ts-expect-error: Ts Error on revalidate but NextJs docs says we should use it like this
  //     revalidate: dev ? 1 : 360, // Cache duration in seconds (1 month)
  //     tags: ['post', 'cacheItem'], // might need to add unique key later depends on performance (memory usage)
  //   }
  // );

  getPostRatingCached = unstable_cache(
    async (_id: string) => {
      return await this.getPostRating(_id);
    },
    {
      // @ts-expect-error: Ts Error on revalidate but NextJs docs says we should use it like this
      revalidate: 0, // Cache duration in seconds (1 month)
      tags: ['post', 'cacheItem'], // might need to add unique key later depends on performance (memory usage)
    }
  );

  async getPosts(filters: PostFilters = {}, options: QueryOptions = {}): Promise<any[]> {
    await this.init();
    const { limit = 10, skip = 0, sort = { createdAt: -1 } } = options;
    return this.collection.find(filters).skip(skip).limit(limit).sort(sort).toArray();
  }
}

export default new PostController();
