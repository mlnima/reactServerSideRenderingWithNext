// @ts-nocheck
import got from 'got';
import jsdom from 'jsdom';
import { convertSecondsToTimeString } from '@repo/utils/dist/src';

const { JSDOM } = jsdom;

const xHScrapper = async (url) => {
  try {
    return await got(url).then(async (videoPageData) => {
      const videoPageDom = new JSDOM(videoPageData.body.toString()).window.document;
      let videoData = {
        tags: [],
        categories: [],
        actors: [],
        postType: 'video',
        sourceSite: 'xhamster',
      };

      const initialsScript = videoPageDom?.querySelector('#initials-script');
      const initialsScriptAsText = initialsScript?.textContent;

      const initialsScriptContent = initialsScriptAsText ? initialsScriptAsText.replace('window.initials=', '') : null;
      const videoDataJson = initialsScriptContent ? initialsScriptContent.slice(0, -1) : null;

      if (videoDataJson) {
        try {
          const parsedObject = eval('(' + videoDataJson + ')');
          const videoModel = parsedObject?.['videoModel'];

          videoData.quality = videoModel?.isUHD ? '4K' : videoModel?.isHD ? 'HD' : 'SD';
          videoData.duration = videoModel?.duration ? convertSecondsToTimeString(videoModel?.duration) : '00:00';
          videoData.videoTrailerUrl = videoModel?.trailerURL || '';
          videoData.mainThumbnail = videoModel?.thumbURL || '';
          videoData.title = videoModel?.title || videoPageDom?.querySelector('h1')?.textContent;
          videoData.description = videoModel?.description || '';
          videoData.videoEmbedCode = `https://xhamster.com/embed/${videoModel?.idHashSlug || videoModel?.id || ''}`;
          videoData.source = videoModel?.pageURL || url;
        } catch (error) {
          console.log('Error Parsing VideoData=> ', error);
        }
      }

      const metaPurifier = async (type, elementsList) => {
        if (elementsList && elementsList.length > 0) {
          for await (const elementItem of elementsList) {
            const elementItemName = elementItem?.textContent?.trim();
            if (elementItemName && elementItemName !== 'Pornstars' && elementItemName !== 'In English') {
              videoData[type] = [
                ...(videoData?.[type] || []),
                {
                  name: elementItemName,
                  type: type,
                },
              ];
              if (elementItemName === 'HD Videos' && videoData.quality !== '4K') {
                videoData.quality = 'HD';
              }
              if (elementItemName === '4K Porn') {
                videoData.quality = '4K';
              }
            }
          }
        }
      };

      const videoTagListContainer = videoPageDom.querySelector('#video-tags-list-container');
      const actorsElements = videoTagListContainer.querySelectorAll('a[href^="https://xhamster.com/pornstars"]');
      const tagsElements = videoTagListContainer.querySelectorAll('a[href^="https://xhamster.com/tags"]');
      const categoriesElements = videoTagListContainer.querySelectorAll('a[href^="https://xhamster.com/categories"]');

      await metaPurifier('actors', actorsElements);
      await metaPurifier('categories', categoriesElements);
      await metaPurifier('tags', tagsElements);

      return videoData;
    });
  } catch (error) {
    console.log(error);
  }
};

export default xHScrapper;
