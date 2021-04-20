import AssetBulkAct from './AssetBulkAct';
import withRouter from 'next/dist/client/with-router'
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  select {
    border: 1px solid rgba(0,0,0,.1);
    padding: 3px 5px;
    background-color: $light100;
  }
  .asset-page-bulk-action-drop-down {
    .asset-page-bulk-action-drop-down-btn {
      border: 1px solid rgba(0,0,0,.1);
      padding: 3px 5px;
    }
  }
`;
const AssetBulkActionAndAssetTypeSelector = props => {


    const onFormatChangeHandler =e => {
          props.router.push({
              pathname:props.router.pathname,
              query:{...props.router.query,type:e.target.value}
          })
    }

    const RenderTypes = () => {
        if (props.router) {
            switch ( props.router.query.assetsType ) {
                case 'posts':
                    return (
                        <>
                            <select  onChange={e=>onFormatChangeHandler(e)}>
                                <option value='all'>All</option>
                                <option value='standard'>Standard</option>
                                <option value='video'>Video</option>
                                <option value='product'>Product</option>
                                <option value='food'>Food</option>
                                <option value='article'>Article</option>
                            </select>
                        </>
                    )
                default:
                    return null

            }
        }

    }

    return (
        <StyledDiv className='asset-page-bulk-action-asset-type-selector'>
            <AssetBulkAct { ...props }/>
            <div className="asset-page-asset-type-selector">
                <RenderTypes/>
            </div>
        </StyledDiv>
    );
};
export default withRouter(AssetBulkActionAndAssetTypeSelector);
