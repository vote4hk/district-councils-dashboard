import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#FF8F00' },
  secondary: { main: '#00E676' }
};
const themeName = 'Pizazz Spring Green Falcon';

const typography =  {
  useNextVariants: true,
  fontFamily: "'Noto Sans TC', sans-serif"
}

export default createMuiTheme({ palette, themeName, typography });
