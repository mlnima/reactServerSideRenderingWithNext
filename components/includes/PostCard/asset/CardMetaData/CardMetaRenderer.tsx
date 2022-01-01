import CardMetaItem from "./CardMetaItem";

const CardMetaRenderer = ({metas}) => {
    return (
           <>
                {(metas || []).filter(meta => meta?.name?.length > 1).map((meta,index) => {
                    return(

                            <CardMetaItem meta={meta} key={index}/>

                    )
                })}
            </>
    );
};

export default CardMetaRenderer;
