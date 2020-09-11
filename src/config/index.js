export const STORAGE_KEY = "Hey";
export const REGEX_HASHTAG = /\#[A-Za-z0-9][A-Za-z0-9\.\-]+/g;
export const FULL_SOCKET = false;

export const STYLE_CONFIG = {
  letterSpace: 1
};
export const CONFIG = {
  allowOffline: true,
  allow_private_groups: true,
  allow_private_channels: true
};

let STRIPE_PUBLIC_KEY, DEFAULT_API_URL;
// dev
if (process.env.NODE_ENV === "development") {
  // DEFAULT_API_URL = "https://stagingapi.hey.network";
  DEFAULT_API_URL = "https://api.hey.network";
  STRIPE_PUBLIC_KEY = "pk_test_BQE94zyQ2Hzp5VhmXOJ4TDMI";
}
// prod
else {
  DEFAULT_API_URL = "https://api.hey.network";
  STRIPE_PUBLIC_KEY = "pk_live_2TXlPhm7isIJNI6NBXggua0k";
}
export { DEFAULT_API_URL, STRIPE_PUBLIC_KEY };
