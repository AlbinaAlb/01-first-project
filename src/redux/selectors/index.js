export function isAuthenticated(state)  {
  return state.auth.isAuth
}

export function isCaptchaUrl(state) {
  return state.auth.captchaUrl
}
