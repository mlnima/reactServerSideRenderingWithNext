import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LanguagesSwitcher from '../LanguagesSwitcher';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-utils';
const initialState = { id: 1 };
const mockStore = configureStore();
//@ts-ignore
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
    pathname: '/',
}));
//@ts-ignore
describe('LanguagesSwitcher', () => {
    //@ts-ignore
    it('renders LanguagesSwitcher component ', () => {

        render(
            // @ts-ignore
            <Provider store={mockStore(initialState)}>
                <LanguagesSwitcher />
            </Provider>
        )
        //@ts-ignore
        expect(screen.getByTitle('select language')).toBeInTheDocument();
    })
})