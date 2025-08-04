import styled from 'styled-components';
import {lightTheme} from '@/themes';
import {Button} from 'antd';

export const Container = styled.div({
  padding: lightTheme.token?.paddingLG
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%'
});

export const CustomButton = styled(Button)({
  backgroundColor: lightTheme.token?.colorPrimary,
  color: lightTheme.token?.colorWhite,
  padding: lightTheme.token?.paddingSM,
  borderRadius: lightTheme.token?.borderRadiusLG,
  border: 'none',
  cursor: 'pointer',
  marginBottom: lightTheme.token?.marginSM
});
