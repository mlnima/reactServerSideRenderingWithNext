import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

class VideoStreamController {
  static async streamVideo(req: Request, res: Response) {
    const videoPath = path.join(process.cwd(), 'public/uploads', req.url || '');
    if (!fs.existsSync(videoPath)) return res.status(404).send('Video not found');

    const videoSize = fs.statSync(videoPath).size;
    const range = req.headers.range;
    const chunkSize = 5 * 1024 * 1024; // 5MB

    if (!range) {
      res.writeHead(200, {
        'Content-Length': videoSize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000',
      });

      const stream = fs.createReadStream(videoPath);
      return pipeline(stream, res, (err) => {
        if (err) res.status(500).end();
      });
    }

    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize - 1, videoSize - 1);
    const contentLength = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000',
    });

    const stream = fs.createReadStream(videoPath, { start, end });
    pipeline(stream, res, (err) => {
      if (err) res.status(500).end();
    });
  }
}

export default VideoStreamController;


// import {Request, Response} from 'express';
// import fsExtra from 'fs-extra';
// import fs from 'fs';
// import path from 'path';
// import { generateVideoToken, verifyVideoToken } from '@repo/utils-server'
//
//
// class VideoStreamController{
//   static dev = process.env.NODE_ENV !== 'production';
//   static publicFolderPath = path.join(__dirname);
//
//   static async streamVideo(req: Request, res: Response){
//    // const chunkSize = 10 ** 6 / 8; // 1MB
//     const chunkSize = 1 * 1024 * 1024;
//     const range = req.headers.range;
//     const videoPath = path.join(process.cwd(), '/public/uploads' + req.url);
//     let videoSize = 0;
//
//     try {
//       videoSize = fs.statSync(videoPath).size;
//     } catch (err) {
//       return res.status(404).send('Video not found');
//     }
//
//     if (!range) {
//       const start = 0;
//       const end = Math.min(chunkSize - 1, videoSize - 1);
//       const contentLength = end - start + 1;
//
//       const headers = {
//         'Content-Range': `bytes ${start}-${end}/${videoSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': contentLength,
//         'Content-Type': 'video/mp4',
//       };
//
//       res.writeHead(206, headers);
//       res.setHeader('Cache-Control', 'public, max-age=31536000');
//       res.setHeader('Accept-Ranges', 'bytes');
//       res.setHeader('Content-Type', 'video/mp4');
//       const videoStream = fs.createReadStream(videoPath, { start, end });
//       return videoStream.pipe(res);
//     }
//
//
//     const start = Number(range.replace(/\D/g, ''));
//     const end = Math.min(start + chunkSize, videoSize - 1);
//     const contentLength = end - start + 1;
//
//     const headers = {
//       'Content-Range': `bytes ${start}-${end}/${videoSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': contentLength,
//       'Content-Type': 'video/mp4',
//     };
//
//     res.writeHead(206, headers);
//     const videoStream = fs.createReadStream(videoPath, { start, end });
//     videoStream.pipe(res);
//   }
// }
//
// export default VideoStreamController