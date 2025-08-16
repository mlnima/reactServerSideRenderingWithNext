const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const testPost = {
  title: 'Test Post Title',
  quality: 'HD',
  postType: 'video',
  status: 'draft',
  categories: ['64b620426d2f4d1d8a423e33'], // Replace with valid meta ObjectIds
  duration: '01:30',
};

const form = new FormData();

form.append('postData', JSON.stringify(testPost));
form.append('apiKey', 'TQ7H9X5-GGR4REM-GCX13EG-4BZK5PS');
form.append('username', 'Admin');
form.append('skipDuplicate', 'true');
form.append('videoFile', fs.createReadStream('./test.mp4'));
form.append('imageFile', fs.createReadStream('./test.png'));

axios
  .post('http://localhost:4002/wp/v2/posts', form, {
    headers: form.getHeaders(), // <-- important!
  })
  .then((r) => console.log(r.data))
  .catch((e) => console.error(e.response?.data || e.message));
