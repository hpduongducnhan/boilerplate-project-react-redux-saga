import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Switch, Route } from 'react-router-dom';
import './AppWrapper.scss';
import configureStore, { history } from './appRedux';
import App from './app'
import common_vi from "./translations/vi/common.json";
import common_en from "./translations/en/common.json";

const { store, persistor } = configureStore()

// init i18n
// remember wrap App by translate('namespace')(App) then export the wrapper
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    vi: {
      common: common_vi
    },
  },
});


function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route component={App}/>
            </Switch>
          </ConnectedRouter>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper;
