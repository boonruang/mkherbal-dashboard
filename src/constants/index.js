// Login Page
export const APP_INIT = 'APP_INIT'

// User Page
export const HTTP_USER_FETCHING = 'HTTP_USER_FETCHING'
export const HTTP_USER_SUCCESS = 'HTTP_USER_SUCCESS'
export const HTTP_USER_FAILED = 'HTTP_USER_FAILED'
export const HTTP_USERINFO_SUCCESS = 'HTTP_USERINFO_SUCCESS'

// User Edit Page
export const HTTP_USEREDIT_FETCHING = 'HTTP_USEREDIT_FETCHING'
export const HTTP_USEREDIT_SUCCESS = 'HTTP_USEREDIT_SUCCESS'
export const HTTP_USEREDIT_FAILED = 'HTTP_USEREDIT_FAILED'

// Login Page
export const HTTP_LOGIN_FETCHING = 'HTTP_LOGIN_FETCHING'
export const HTTP_LOGIN_SUCCESS = 'HTTP_LOGIN_SUCCESS'
export const HTTP_LOGIN_FAILED = 'HTTP_LOGIN_FAILED'
export const HTTP_LOGOUT = 'HTTP_LOGOUT'

// Register Page
export const HTTP_REGISTER_FETCHING = 'HTTP_REGISTER_FETCHING'
export const HTTP_REGISTER_SUCCESS = 'HTTP_REGISTER_SUCCESS'
export const HTTP_REGISTER_FAILED = 'HTTP_REGISTER_FAILED'

// Land Page
export const HTTP_LAND_FETCHING = 'HTTP_LAND_FETCHING'
export const HTTP_LAND_SUCCESS = 'HTTP_LAND_SUCCESS'
export const HTTP_LAND_FAILED = 'HTTP_LAND_FAILED'

// Marketplace Page
export const HTTP_MARKETPLACE_FETCHING = 'HTTP_MARKETPLACE_FETCHING'
export const HTTP_MARKETPLACE_SUCCESS = 'HTTP_MARKETPLACE_SUCCESS'
export const HTTP_MARKETPLACE_FAILED = 'HTTP_MARKETPLACE_FAILED'

// Farm Page
export const HTTP_FARMERGROUP_FETCHING = 'HTTP_FARMERGROUP_FETCHING'
export const HTTP_FARMERGROUP_SUCCESS = 'HTTP_FARMERGROUP_SUCCESS'
export const HTTP_FARMERGROUP_FAILED = 'HTTP_FARMERGROUP_FAILED'
export const HTTP_FARMERGROUP_SELECTED = 'HTTP_FARMERGROUP_SELECTED'

// CONSTANTS
export const INIT = 'INIT';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';
// export const SET_MAP_PERSPECTIVE = 'SET_MAP_PERSPECTIVE';


// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK'

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  'Cannot connect to server, Please try again.'
export const NETWORK_TIMEOUT_MESSAGE =
  'A network timeout has occurred, Please try again.'
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  'An error has occurred. The photo was unable to upload.'

// export const apiUrl = 'https://coral-app-hwkgh.ondigitalocean.app/api/v2'
const serviceUrl = process.env.REACT_APP_SERVIC_URL
export const apiUrl = `${serviceUrl}/api/v2`

// export const imageUrl = 'http://61.19.101.249:3000'
export const imageUrl = `${serviceUrl}:3000`

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const TOKEN = 'KerbHukToken'

export const server = {
  LOGIN_URL: `user/login`,
  REGISTER_URL: `user/register`,
  USER_URL: `user`,
  VERIFY_URL: `user/verify`,
  AUTH_URL: `authen`,
  SYSTEM_URL: `system`,
  LOGIN_PASSED: `yes`,
  LAND_URL: `geoland`,
  SOIL_URL: `geosoil`,
  SALT_URL: `geosalt`,
  MARKETPLACE_URL: `marketplace`,
  FARMERGROUP_URL: `farmergroup`,
}
