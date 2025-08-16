import { userSchema } from '@repo/db';

const apiRequestMiddleware = async (req, res, next) => {
  const apiKey = req.body.apiKey;
  const username = req.body.username;
  try {
    const userData = await userSchema.findOne({ username }).select(['username', 'role', 'API_KEY']).lean().exec();
    if (!username || !apiKey || !userData.role || !userData.API_KEY) {
      // throw new Error('Unauthorized')

      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    if (userData.role === 'administrator' && userData.API_KEY === apiKey) {
      req.userData = userData;
      next();
    } else {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default apiRequestMiddleware;
