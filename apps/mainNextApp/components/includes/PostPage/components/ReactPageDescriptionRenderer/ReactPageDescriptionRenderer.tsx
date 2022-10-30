// import slate from '@react-page/plugins-slate';
// import Editor from '@react-page/editor';
// import image from '@react-page/plugins-image';
// import spacer from '@react-page/plugins-spacer';
// import divider from '@react-page/plugins-divider';
// import html5video from '@react-page/plugins-html5-video';
// import video from '@react-page/plugins-video';
// import background, {ModeEnum} from '@react-page/plugins-background';
// import codeSnippet from '../../../../adminIncludes/TextEditors/TextEditorReactPage/plugins/codeSnippet';
// import styled from "styled-components";
// import '@react-page/editor/lib/index.css';
// import '@react-page/plugins-slate/lib/index.css';
// import '@react-page/plugins-image/lib/index.css';
//
// const cellPlugins = [slate(), background({
//     // imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
//     enabledModes:
//         ModeEnum.COLOR_MODE_FLAG |
//         ModeEnum.IMAGE_MODE_FLAG |
//         ModeEnum.GRADIENT_MODE_FLAG,
// }), image, spacer, divider, codeSnippet, html5video, video];
//
// const ReactPageDescriptionRendererStyledDiv = styled.div`
//   color: var(--post-page-info-color, #ccc);
//   margin: 0 5px;
//   padding: 50px 0;
//   width: fit-content;
//   max-width: 98vw;
//   @media only screen and (min-width: 768px) {
//     max-width: 1300px;
//     .crayons-article__body{
//       max-width: 100%;
//       .js-code-highlight{
//       }
//     }
//   }
// `
// interface LearnTypePostPageDescriptionPropTypes {
//     description: string |object,
// }
//
// const ReactPageDescriptionRenderer = ({description}: LearnTypePostPageDescriptionPropTypes) => {
//
//     return (
//         <ReactPageDescriptionRendererStyledDiv>
//             {/*// @ts-ignore*/}
//             <Editor cellPlugins={cellPlugins} value={description} readOnly/>
//         </ReactPageDescriptionRendererStyledDiv>
//     );
// };
//
// export default ReactPageDescriptionRenderer;