import * as desktop from './desktop';
import * as mobile from './mobile';
import { consts } from '../utils/constants';
import "./style.scss";



const create = (layoutName, layoutType, deviceType, layoutComponent) => ({
  /**
   *  This function help to create formatted layout object
   */
  layoutName: layoutName,
  layoutType: layoutType,
  deviceType: deviceType,
  component: layoutComponent
})

/**
 *  names and types must be unique together
 */

export const names = {
  default: 'default',
  admin_v1: 'admin-v1',
  public_v1: 'public-v1'
}

export const types = {
  default: 'default',
  public: 'public',
  private: 'private'
}


const LAYOUTS = [
  /**
   *  All available layouts should declare here
   *  Use create function above
   */

  // Default --- DO NOT CHANGE THIS ----------
  create(names.default, types.public, consts.DESKTOP, desktop.PublicDefaultLayout),
  create(names.default, types.private, consts.DESKTOP, desktop.PrivateDefaultLayout),
  create(names.default, types.public, consts.MOBILE, mobile.PublicDefaultLayout),
  create(names.default, types.private, consts.MOBILE, mobile.PrivateDefaultLayout),

  // other layouts should update here for user
]


export function getDefaultLayout(deviceType){
  let privateLayout = null
  let publicLayout = null
  for (let layout of LAYOUTS) {
    // console.log(layout)
    if (layout.layoutName === names.default && layout.deviceType === deviceType){
      if (layout.layoutType === types.public){
        publicLayout = layout
      } else if (layout.layoutType === types.private){
        console.log(layout)
        privateLayout = layout
      }
    }
  }
  return {private: privateLayout.layoutName, public: publicLayout.layoutName}
}

export function getLayout(name, type, deviceType){
  for (let layout of LAYOUTS){
    if (layout.layoutName === name && layout.layoutType === type && layout.deviceType === deviceType){
      return layout
    }
  }
}




// function ErrorDefaultLayout({message}){
//   return (
//     <div>{message}</div>
//   )
// }

// export function getLayout(layoutName, layoutType, deviceType) {
//   /**
//    *  Use this function to get layout by name and device type
//    *  If layout with name not exist choose default layout
//    */
//   let defaultDesktop = null
//   let defaultMobile = null
//   for (let layout of LAYOUTS) {
//     if (layout.layoutName === layoutName && layout.deviceType === deviceType) {
//       return layout
//     }
//     // find default 
//     if (layout.layoutName === 'default') {
//       if (layout.deviceType === consts.DESKTOP) {
//         defaultDesktop = layout
//       } else if (layout.deviceType === consts.DESKTOP) {
//         defaultMobile = layout
//       }
//     }
//   }
//   if (deviceType === consts.DESKTOP) {
//     if (!defaultDesktop){
//       return <ErrorDefaultLayout message="No Default Desktop Layout"/>
//     }
//     return defaultDesktop
//   }
//   if (deviceType === consts.MOBILE) {
//     if (!defaultMobile){
//       return <ErrorDefaultLayout message="No Default Mobile Layout"/>
//     }
//     return defaultMobile
//   }
// }


// export function LayoutSelector(){
//   return (
//     <div className='layout-container'>
//       <div className='layout-selector'>
//         <div className='header'>
//           <span>Layout Selector</span>
//         </div>
//         <div className='selector'>

//         </div>
//         <div className='layout-show'> 
//           <span>Show Layouts</span>
//         </div>
//       </div>
//     </div>
//   )
// }