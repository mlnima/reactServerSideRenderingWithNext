import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";

const PostDescription = ({description, translations}) => {
    const router = useRouter()

    return (
        <div className="description">
            <style jsx>{`
              .description {
                color: var(--post-page-info-color);
                margin: 0 5px;
              }
            `}</style>
            {translations ? translations[router.locale] ? translations[router.locale].description || description : description : description}
        </div>
    )
};
export default PostDescription;
