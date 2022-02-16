import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LanguagesSwitcher from '../LanguagesSwitcher';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
const initialState = { id: 1 };
const mockStore = configureStore();

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    pathname: '/',
}));

describe('LanguagesSwitcher', () => {
    it('renders LanguagesSwitcher component ', () => {

        render(
            // @ts-ignore
            <Provider store={mockStore(initialState)}>
                <LanguagesSwitcher />
            </Provider>
        )
        expect(screen.getByTitle('select language')).toBeInTheDocument();
    })
})