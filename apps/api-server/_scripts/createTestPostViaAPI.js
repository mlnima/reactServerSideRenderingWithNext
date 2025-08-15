const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const testPost = {
  author: '636cbf91026f1d5a8af65d31',
  title: 'Test Post Title',
  permaLink: 'test-post-title',
  company: 'Example Company',
  description: 'This is a test post description.',
  isMarkDownDescription: false,
  descriptionRenderer: 'default',
  mainThumbnail: 'https://example.com/image.jpg',
  thumbnail: '64b620156d2f4d1d8a423e22',
  images: ['64b620156d2f4d1d8a423e22'],
  videoTrailerUrl: 'https://example.com/trailer.mp4',
  quality: 'HD',
  translations: { en: 'Test Post Title', de: 'Testbeitragstitel' },
  shippingCost: '5.00',
  format: 'MP4',
  source: 'My Source',
  sourceSite: 'https://example.com',
  videoUrl: 'https://example.com/video.mp4',
  postType: 'video', // must match enum
  outPostType: 'video', // must match enum
  videoEmbedCode: '',
  videoScriptCode: '<script>console.log("video")</script>',
  downloadLink: 'https://example.com/download.mp4',
  downloadLinks: [
    {
      label: '1080p',
      url: 'https://example.com/1080p.mp4',
      size: '1.5GB',
    },
  ],
  redirectLink: 'https://example.com/redirect',
  currency: 'USD',
  iframe: '<iframe src="https://example.com"></iframe>',
  status: 'draft',
  posts: [],
  comments: [],
  categories: ['64b620426d2f4d1d8a423e33'], // Replace with valid meta ObjectIds
  actors: [],
  tags: [],
  likes: 0,
  disLikes: 0,
  views: 0,
  duration: '01:30',
  premium: false,
  rating: true,
  uniqueData: { foo: 'bar' },
};

const form = new FormData();

form.append('postData', JSON.stringify(testPost));
form.append('videoFile', fs.createReadStream('./test.mp4'));
form.append('imageFile', fs.createReadStream('./test.png'));

axios
  .post('http://localhost:4002/wp/v2/posts', form, {
    headers: form.getHeaders(), // <-- important!
  })
  .then((r) => console.log(r.data))
  .catch((e) => console.error(e.response?.data || e.message));


// form.append('videoFile', fs.createReadStream('./test.mp4'), {
//   filename: 'test.mp4',
//   contentType: 'video/mp4',
// });
//
// form.append('imageFile', fs.createReadStream('./test.png'), {
//   filename: 'test.png',
//   contentType: 'image/png',
// });

// axios
//   .post('http://localhost:4002/wp/v2/posts', testPost)
//   .then((res) => {
//     console.log('Post created:', res.data);
//   })
//   .catch((err) => {
//     if (err.response) {
//       console.error('Error response:', err.response.status, err.response.data);
//     } else {
//       console.error('Error:', err.message);
//     }
//   });
