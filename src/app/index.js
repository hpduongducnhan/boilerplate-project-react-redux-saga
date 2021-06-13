import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, Trans } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { Spin } from 'antd';
import AppRouter from './router'
import * as layouts from '../layouts';
import * as clientAction from '../appRedux/actions/client.action';


const DESKTOP = 'desktop'
const MOBILE = 'mobile'
const DEFAULT = 'default'


function App(props) {
  /**
   *  i18n-next
   *  to translate t(key, {variables: values})
   *      t('welcome.intro', { framework: "react-i18next" })
   *  
   *  to switch other language ->>>  i18n.changeLanguage('vi')
   */
  const { t, i18n } = props


  const dispath = useDispatch();
  const clientLayout = useSelector(s => s.client.layout);
  const clientDeviceType = useSelector(state => state.client.deviceType);

  // loading State
  const [loading, setLoading] = useState(true)

  // ComponentDidMount -> 
  useEffect(() => {
    /**
     *  first time app init on client SET DEFAULT LAYOUTS and DeviceType
     *  if app has already initted, redux-persist help us to save client information
     */
    if (clientDeviceType === null || clientLayout.private === null || clientLayout.public === null) {
      let deviceType = DESKTOP
      if (isMobile) {
        deviceType = MOBILE
      }
      const defaultLayout = layouts.getDefaultLayout(deviceType)  // should like {private: string, public: string}

      dispath(clientAction.setLayoutDeviceType({
        layout: defaultLayout,
        deviceType: deviceType
      }))
    }
    // reload component to load layout
    setLoading(false)
  }, [])

  // first show loading, detect client, set default layout
  if (loading) {
    return (
      <Spin style={{ marginTop: 300 }} size='large' spinning={loading}>
        <div style={{ textAlign: "center", marginTop: 300 }}>
          Get Client Config
        </div>
      </Spin>
    )
  }

  // then let router do the routing stubs 
  return (
    <AppRouter {...props} />
  )
}


export default withTranslation('common')(App);