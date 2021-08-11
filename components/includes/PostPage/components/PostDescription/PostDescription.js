import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";
import parse from "html-react-parser";

const PostDescription = ({description, translations}) => {
    const router = useRouter()
    return (
        <div className="description" >
            <style jsx>{`
              .description {
                color: var(--post-page-info-color);
                margin: 0 5px;
              }
            `}</style>
            {parse(translations ? translations[router.locale] ? translations[router.locale].description || description : description : description)}
        </div>
    )
};
export default PostDescription;


{/*{translations ? translations[router.locale] ? translations[router.locale].description || description : description : description}*/}