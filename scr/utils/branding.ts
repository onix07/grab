export const branding = {
  font: {
    xl: 20,
    lg: 18,
    md: 16,
    normal: 14,
    sm: 12,
    xs: 10,
  },
  /**
   * color should be this format
   * color: {
   *    black: {
   *      100: #000,
   *      200: ...
   *    }
   * }
   *
   * so you can call the function like this
   * branding.color.black[100] and so on...
   */
  color: {
    black: '#000000',
    grey: '#f2f2f2',
    darkGrey: '#5A5A5A',
    green: '#03C04A',
    red: '#E90A00',
    white: '#ffffff',
    orange: '#FE6600',
    blue: '#1e81b0',
  },
  fontFamily: {
    primary: 'Avenir-Medium',
    bold: 'Avenir-black',
  },
}
