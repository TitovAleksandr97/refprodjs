import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '@/store/index.js';
import { logout } from '@/store/slices/authSlice';
import { injectStore } from '@/api/api';

injectStore(store.dispatch, logout); // Вызываем injectStore здесь, передавая dispatch и logout

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
