import styled from 'styled-components';
import { MdSettingsSuggest } from 'react-icons/md';
import { RiPlayList2Fill } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export const MenuContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #ffff;
  padding-left: 40px;
  padding-right: 40px;
  height: 40px;
  margin-top: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffff;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledMdSettingsSuggest = styled(MdSettingsSuggest)`
  color: #2B7595;
  width: 40px;
  height: 25px;
`;

export const StyledRiPlayList2Fill = styled(RiPlayList2Fill)`
  color: #2B7595;
  width: 40px;
  height: 25px;
`;

export const StyledFaHome = styled(FaHome)`
  color: #2B7595;
  width: 40px;
  height: 25px;
`;

export const StyledFiLogOut = styled(FiLogOut)`
  color: #2B7595;
  width: 40px;
  height: 25px;
`;

export const Textmenu = styled.p`
  color: #30BBF6;
`;
