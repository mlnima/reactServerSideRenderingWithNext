import {Provider} from 'react-redux';
import {wrapper} from "@store_toolkit/store";
import MessengerLayoutInitializer from "@components/layouts/MessengerLayout/MessengerLayoutInitializer";
// const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});

const MessengerLayout = ({children,rest}) => {

    const {store} = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <div className='MessengerLayout'>
                <MessengerLayoutInitializer children={children}/>
            </div>
        </Provider>
    );
};
export default MessengerLayout;
