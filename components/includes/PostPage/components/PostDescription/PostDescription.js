import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";
import parse from "html-react-parser";
import {useState} from "react";

const PostDescription = ({description, translations}) => {

    const router = useRouter();

    const [descriptionValue,setDescriptionValue] = useState(()=>{
        return translations ? translations?.[router.locale] ? translations?.[router.locale]?.description || description : description : description
    });

    return (
        <div className="description" >
            <style jsx>{`
              .description {
                color: var(--post-page-info-color);
                margin: 0 5px;
              }
            `}</style>
            {descriptionValue ? parse(descriptionValue) : ''}
        </div>
    )
};
export default PostDescription;


{/*{translations ? translations[router.locale] ? translations[router.locale].description || description : description : description}*/}