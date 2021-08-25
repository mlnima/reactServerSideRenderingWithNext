const DropDownWidget = props => {

    if (props.postData.postType !== 'video' && props.type === 'actors') {
        return null
    } else if (props.postData.postType === props.renderFor || props.renderFor === 'all') {
        return (
            <div className='post-drop-down-section'>
                <style jsx>{`
                  .post-drop-down-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 95%;
                    padding: 10px;

                    .post-drop-down-section-header {
                      height: 30px;
                      width: 100%;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 0 10px;
                      margin-bottom: 1px;
                      background-color: white;
                      
                    }

                    .post-drop-down-component {
                      padding: 10px;
                      width: 100%;
                      background-color: white;
                    }
                  }
                `}</style>
                <div className='post-drop-down-section-header'>
                    <p className='post-drop-down-section-header-title'>{props.title}</p>
                </div>
                <div className="post-drop-down-component">
                    <props.component {...props}/>
                </div>
            </div>
        );
    } else return null

};
export default DropDownWidget;