import {useContext, useEffect,useState} from 'react';
import {AppContext} from '../../../context/AppContext'
import Link from 'next/link'
import MetaElementImage from "./MetaElementImage";

const MetaElement = ({type,translations,name,_id,noImageUrl,imageUrl,count,postElementSize}) => {
    const contextData = useContext(AppContext);
    const showCount = false
    const [imageSize,setImageSize] = useState(()=>{
        return  postElementSize === 'list' ? {width:116.6,height:65.6} :
                postElementSize === 'smaller' ? {width:209.8,height:118}:
                postElementSize === 'small' ? {width:255.8,height:143.95}:
                postElementSize === 'medium' ? {width:320,height:180}:
                {width:255.8,height:143.95}
    })
    const classNameForMetaElement = postElementSize ? `meta-page-item-link-${postElementSize}` : `meta-page-item-link-small`
    return (
        <Link key={name} as={contextData.state.activeLanguage !== 'default' ? `/${type}/${translations ? translations[contextData.state.activeLanguage] ?
              translations[contextData.state.activeLanguage].name || name : name : name}?metaId=${_id}` :`/${type}/${name}?metaId=${_id}`}
              href={{
                  pathname: `/posts`,
                  query: {
                      metaId: _id,
                      metaName: name,
                      metaType: type,
                  }
              }}
              scroll={false}
        >
            <a className={`meta-page-item-link ${classNameForMetaElement}`} onClick={() => contextData.dispatchState({...contextData.state, loading: true})}>

                <style jsx>{`
                    .meta-page-item-link,.meta-page-item-link-smaller,.meta-page-item-link-small,.meta-page-item-link-medium{
                        width: 48vw;
                        max-width: 320px;
                        cursor: pointer;
                    }
                    .meta-item-data {
                        width: 100%;
                        height: auto;
                        text-align: center;
                    }
                    p {
                        color: var(--post-element-text-color);
                    }
                    @media only screen and (min-width: 768px) {
                            .meta-page-item-link{
                                margin: 10px auto;
                               // width: 320px;
                            }
                            .meta-page-item-link-smaller{
                               width: 209.8px;
                            }
                            .meta-page-item-link-small{
                               width: 255px;
                            }
                            
                            .meta-page-item-link-medium{
                               width: 320px;
                            }
                            .meta-item-data {
                                width: 100%;
                                margin: auto;
                                color: white;
                            }
                        }
                  
                `}</style>

                <MetaElementImage
                    imageUrl={imageUrl || noImageUrl}
                    imageSize={imageSize}
                    postElementSize={postElementSize}
                />

                <div className='meta-item-data'>
                    <p>{translations ? translations[contextData.state.activeLanguage] ? translations[contextData.state.activeLanguage].name || name : name : name} {showCount?`(${count})`:null}</p>

                </div>
            </a>
        </Link>
    );

};
export default MetaElement;
