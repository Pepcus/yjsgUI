import styled from 'styled-components';
import Box from 'pepcus-core/lib/Box';
import Col from 'pepcus-core/lib/Col';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import FaIcon from 'pepcus-core/lib/FaIcon';
import { getThemeProps } from 'pepcus-core/utils/theme';

export const FileWrapper = styled(Box)`
    min-height: 100%;
    padding-bottom: 35px;
    padding-top: 100px;
    ${({ theme }) => theme.media.down('xl')`
        padding-top: 0;
        margin-top: 100px;
    `}
    ${({ theme }) => theme.media.down('lg')`
        padding-top: 0;
        margin-top: 0;
    `}
`;

export const BackButtonContainer = styled(Row)`
    top: 11px;
    z-index: 2;
    position: absolute;
    right: 28px;
    display: none;
    ${({ theme }) => theme.media.down('lg')`
        display: block;
        position: absolute;
        top: 66px;
        right: 0;
        z-index: 1;
    `}
    ${({ theme }) => theme.media.down('md')`
        position: absolute;
        right: 0;
        margin-top: 17px;
        z-index: 1;
    `}
`;

export const BackButtonWrapper = styled(Col)`
    display: flex;
    &:hover {
        border-radius: 4px;
        border: 1px solid ${getThemeProps('palette.primary.borderColor')};
        background-color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
    ${({ theme }) => theme.media.down('lg')`
        margin: 0 10px;
    `}
`;

export const FileListWrapper = styled(Row)`
    display: flex;
    height: 100%;
    position: absolute;
    width: 100%;
    ${({ theme }) => theme.media.down('lg')`
        padding-top: 30px;
    `}
    ${({ theme }) => theme.media.down('sm')`
        padding: 45px 10px 0;
    `}
    ${({ theme }) => theme.media.down('xs')`
        margin: 10px;
    `}
`;

export const FilesListStyled = styled(Box)`
        max-height: 523px;
        height: 100%;
        overflow-y: scroll;
        width: 300px;
        position: fixed;
        left: 0;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    ${({ theme }) => theme.media.down('lg')`
        max-height: ${props => (props.isDisplayCondition ? 'initial' : 'none')};;
        height: 100%;
        width: 260px;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')};
        overflow-y: ${props => (props.isDisplayCondition ? 'unset' : 'scroll')};
        position: fixed;
        left: 0;
        background-color: ${getThemeProps('palette.advancedSearch.color')};
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        position: relative;
    }
    ${({ theme }) => theme.media.down('md')`
        max-height: initial;
        height: 100%;
        width: ${props => (props.isDisplayCondition ? '100%' : '260px')};
        left: ${props => (props.isDisplayCondition ? 'auto' : 'none')};
        margin: 0;
        overflow-y: ${props => (props.isDisplayCondition ? 'inherit' : 'scroll')};
        position: relative;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')}
    `}
    ${({ theme }) => theme.media.down('sm')`
        margin: 0;
        display: ${props => (props.isDisplayCondition ? 'block' : 'none')}
    `}
`;

export const MessageBoxWrapper = styled(Box)`
    width: 100%;
    max-width: 100%
    padding-top: 10px;
    margin: 0 0 0 300px;
    overflow-x: hidden;
    ${({ theme }) => theme.media.down('lg')`
        display:  ${props => (props.isDisplayMessage ? 'unset' : 'none')}
        max-width: ${props => (props.isMobile ? '100%' : '100%')}
        margin: ${props => (props.isMobile ? '0' : '0 0 0 270px')};
    `}
    ${({ theme }) => theme.media.down('md')`
        padding: 0;
        max-width: ${props => (props.isMobile ? '100%' : '100%')}
        margin: ${props => (props.isMobile ? '0' : 'unset')};
        width: 100%;
    `}
`;

export const FileListTitle = styled(Typography)`
    font-size: 21px !important;
    color: ${getThemeProps('typography.titleFieldColor.color')};
    padding: 10px 20px 8px;
    ${({ theme }) => theme.media.down('lg')`
        padding: 15px 15px 10px;
    `}
    ${({ theme }) => theme.media.down('md')`
        padding: 15px 15px 0;
    `}
`;

export const ListElementWrapper = styled(Col)`
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    color: ${getThemeProps('palette.checkbox.color')};
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover{
        color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
`;

export const FaIconStyled = styled(FaIcon)`
     margin-right: 10px;
     font-size: 14px;
     color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : 'unset')};
     cursor: ${props => (props.isview === 'true' ? 'unset' : 'text')};
`;

export const ListElementStyle = styled(Typography)`
     font-size: 14px !important;
     text-overflow: ellipsis;
     overflow: hidden;
     max-width: 100%;
     white-space: nowrap;
     display: inline-block;
     color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : 'unset')};  
`;

export const FileDownloadIcon = styled('a')`
    cursor: pointer;
    margin-left: 10px;
    color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : getThemeProps('palette.checkbox.color'))};
    transition: 0.3s all;
    &:hover{
        color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
`;

export const FileUploadIcon = styled('button')`
    cursor: pointer;
    margin-left: 10px;
    color: ${props => (props.isview === 'true' ? getThemeProps('colors.header') : getThemeProps('palette.checkbox.color'))};
    transition: 0.3s all;
    &:hover{
        color: ${getThemeProps('palette.primary.borderColor')};
        transition: 0.3s all;
    }
`;

export const MobileFileListButtonStyle = styled('a')`
    display: none;
    ${({ theme }) => theme.media.down('lg')`
        display: block;
        color: ${getThemeProps('colors.WHITE')};
        background-color: ${getThemeProps('colors.header')};
        outline: none;
        text-align: center;
        padding: 7px;
        box-shadow: none;
        font-size: 14px;
        border-radius: 4px;
        &:hover{
            color: ${getThemeProps('colors.WHITE')};
            background-color: ${getThemeProps('palette.primary.borderColor')};
            transition: 0.3s all;
        }
    `}
    @media (max-width: 992px) and (orientation: landscape) {
        display: block;
        position: absolute;
        right: 10px;
        z-index: 2;
    }
    ${({ theme }) => theme.media.down('md')`
        display: block;
        position: absolute;
        right: 10px;
        z-index: 2;
    `}
    ${({ theme }) => theme.media.down('sm')`
        display: block;
        position: absolute;
        right: 0;
        z-index: 2;
    `}
    ${({ theme }) => theme.media.down('xs')`
        display: block;
        position: absolute;
        right: 0;
        z-index: 2;
    `}
`;

export const SelectMessageWrapper = styled(Box)`
    margin: ${props => (props.hasFileRoute ? 'auto' : null)};
    width: 100%;
    max-width: 78%;
    padding-top: 10px;
    margin: 0 0 0 300px;
    overflow-x: hidden;
    ${({ theme }) => theme.media.down('lg')`
        max-width: 64%;
        margin: 0 0 0 270px;
    `}
    ${({ theme }) => theme.media.down('md')`
        display: none;
    `}
`;

export const TypographyStyled = styled(Typography)`
    color: ${getThemeProps('palette.tertiary.color')};
`;

export const NoFileMessageWrapper = styled(Box)`
    width: 100%;
    padding-top: 30px;
    overflow-x: hidden;
`;

export const FileDescriptionStyled = styled(Typography)`
    color: ${getThemeProps('colors.header')},
    margin-top: ${props => (props.isMobile ? '45px' : 'unset')}
`;

export const MessageWrapper = styled(Box)`
    max-width: 50%;
    display: inline;
    text-align: center;
    background: ${getThemeProps('palette.advancedSearch.color')};
    box-shadow: 0px 1px 2px 0px ${getThemeProps('palette.footer.backgroundColor')};
    padding: 46px 78px;
    color: ${getThemeProps('palette.checkbox.color')};
    line-height: 25px;
    font-size: 16px;
    ${({ theme }) => theme.media.down('md')`
        max-width: 76%;
        padding: 46px 18px;
    `}
    ${({ theme }) => theme.media.down('sm')`
        max-width: 100%;
        padding: 46px 15px;
        line-height: 22px;
        font-size: 16px;
    `}
`;

export const DownloadFileStyle = styled('a')`
    color: ${getThemeProps('colors.WHITE')};
    background-color: ${getThemeProps('palette.checkbox.color')};
    outline: none;
    box-shadow: 0 1px 3px 0 ${getThemeProps('palette.tertiary.color')};
    display: inline-block;
    text-align: center;
    line-height: 20px;
    padding: 10px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        transition: 0.3s all;
        background-color: ${getThemeProps('typography.titleFieldColor.color')};
    }
`;

