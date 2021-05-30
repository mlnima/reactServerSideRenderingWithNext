import {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext'
import Link from 'next/link'
import MetaElementImage from "./MetaElementImage";

const MetaElement = ({type,translations,name,_id,noImageUrl,imageUrl,count,postElementSize}) => {
    const contextData = useContext(AppContext);
    const showCount = false
    // useEffect(() => {
    //     console.log(postElementSize)
    // }, [postElementSize]);

    const classNameForMetaElement = postElementSize ? `meta-page-item-link-${postElementSize}` : `meta-page-item-link-small`
    if (count > 0) {
        return (
            <Link key={name}
                  as={contextData.state.activeLanguage !== 'default' ?
                      `/${type}/${translations ?
                          translations[contextData.state.activeLanguage] ?
                              translations[contextData.state.activeLanguage].name || name : name : name}?metaId=${_id}` :
                      `/${type}/${name}?metaId=${_id}`}
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
                    />
                    <div className='meta-item-data'>
                        <p>{translations ? translations[contextData.state.activeLanguage] ? translations[contextData.state.activeLanguage].name || name : name : name} {showCount?`(${count})`:null}</p>

                    </div>
                </a>
            </Link>
        );
    } else return null

};
export default MetaElement;
