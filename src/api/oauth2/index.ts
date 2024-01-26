import { getGuestToken } from "./guest-token";
import { getUserInfo } from "./userinfo";

export const oauth2 = {
  getUserInfo: getUserInfo,
  getGuestToken: getGuestToken
};
