import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import * as shortId from 'shortid';
import Barcode from 'react-barcode';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import { getFormattedMemberId, convertFirstCharacterInUpperCase } from 'utils/common';
import { getBusCoordinators } from 'reducers/assetFilesReducer';
import { getConstants } from 'reducers/constants';
import { getLogoPathConfig } from 'reducers/logoPathConfig';

import CoordinatorInformation from './CoordinatorInformation';

const BoxStyled = styled(Box)`
   float: left;
   border-color: ${getThemeProps('palette.idCard.colors')}
`;

const TypographyStyled = styled(Typography)`
   background-color: ${getThemeProps('colors.smallHeader')};
`;

const RowStyled = styled(Row)`
   z-index: 1;
   font-size: 9px;
   align-items: end;
`;

const CardFieldWrapper = styled(RowStyled)`
   display: unset !important;
`;

const TwoIdCardWrapperStyled = styled(Box)`
   display: flex;
   justify-content: center;
   align-items: center;
   align-content: center;
   overflow: hidden;
   :nth-child(4n){
        page-break-after: always;
    }
`;

const CardTextWrapper = styled(Typography)`
   min-height: 18px;
   max-height: 100%;
`;

const BarcodeWrapperStyled = styled(Row)`
    z-index: 1;
    font-size: 9px;
    max-height: 20px;
    min-height: 100%;
    svg g {
    transform: translate(10px, 0px)
    }
    svg > g > text {
    display: none !important;
   }
`;

const MemberInformationWrapper = styled(Box)`
    margin: 5px;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('${props => props.logoPath}');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: contain;
    ::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${getThemeProps('palette.transparent.color')};
}
`;

const FooterWrapperStyle = styled(Typography)`
    background-color: ${getThemeProps('palette.idCard.colors')}
    display: flex;
    min-height: 25px;
    max-height: 100%;
    justify-content: space-between;
`;

const MemberIdCardWrapper = styled(Box)`
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    @media print {
      height: auto;
      visibility: visible;
    }
`;

const SmallHeadingWrapper = styled(Typography)`
    background-color: ${getThemeProps('palette.idCard.colors')}
`;

/**
 * MembersIdCard render members IdCard
 * @type {Class}
 */
class MembersIdCard extends Component {
  constructor(props) {
    super(props);
    this.renderMembersIdCard = this.renderMembersIdCard.bind(this);
  }

  /**
   * Method render Members Id card
   * @param {Array} selectedMembers
   * @return {HTML}
   */
  renderMembersIdCard({ selectedMembers }) {
    const { constants, logoPathConfig, busCoordinators = {} } = this.props;
    const { LOGO } = logoPathConfig;
    const {
      MEMBER_ID_CARD_SMALL_HEADING,
      MEMBER_ID_CARD_MAIN_HEADING,
      NAME,
      CLASS,
      ROOM,
      FATHER_NAME,
      MOBILE_NO,
      BUS_STOP,
      BUS_NO,
      ADDRESS,
      STUDENT_ID,
    } = constants;
    const membersIdCards = selectedMembers.map((member) => {
      const memberId = getFormattedMemberId({ memberId: member.memberId });
      const name = convertFirstCharacterInUpperCase({ sentence: member.name });
      const fatherName = convertFirstCharacterInUpperCase({ sentence: member.fatherName });
      const addressString = member.address ? member.address.replace(/,/g, ', ') : member.address;
      const address = convertFirstCharacterInUpperCase({ sentence: addressString });

      return (
        <BoxStyled
          borderRadius="0"
          width="45%"
          margin="15px 10px 15px"
          padding="0"
        >
          <Typography
            color="white"
            fontWeight="600"
            padding="0"
            fontFamily="'Roboto Condensed', Serif"
          >
            <BoxStyled
              width="50px"
              margin="0 0 0 5px"
              padding="0"
              borderStyle="none"
              backgroundColor="unset"
            >
              <img
                src={LOGO}
                alt="header-logo"
                style={{ 'maxWidth': '100%' }}
              />
            </BoxStyled>
            <SmallHeadingWrapper
              gutterBottom="0"
              fontSize="13px"
              type="body"
              fontWeight="100"
              padding="1px"
              align="center"
            >
              {MEMBER_ID_CARD_SMALL_HEADING}
            </SmallHeadingWrapper>
            <TypographyStyled
              color="dark"
              padding="2px"
              gutterBottom="0"
              fontWeight="bold"
              fontFamily="Roboto Condensed"
              align="center"
              fontSize="18px"
            >
              {MEMBER_ID_CARD_MAIN_HEADING}
            </TypographyStyled>
          </Typography>
          <MemberInformationWrapper
            logoPath={LOGO}
            padding="0"
            backgroundColor="unset"
            borderStyle="none"
          >
            <Row
              margin="0"
              padding="0"
              display="flex"
            >
              <RowStyled flex="1" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {NAME}
                </Typography>
                <CardTextWrapper
                  fontSize="9px"
                  type="caption"
                  padding="0 0 0 3px"
                >
                  {name}
                </CardTextWrapper>
              </RowStyled>
              <RowStyled flex="1" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {CLASS}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 3px"
                >
                  {member.education}
                </CardTextWrapper>
              </RowStyled>
              <RowStyled flex="1" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {ROOM}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 3px"
                >
                  {member.classRoomNo2019}
                </CardTextWrapper>
              </RowStyled>
            </Row>
            <Row
              margin="0"
              padding="0"
              display="flex"
            >
              <RowStyled flex="1" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {FATHER_NAME}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 3px"
                >
                  {fatherName}
                </CardTextWrapper>
              </RowStyled>
              <RowStyled flex="0.5 0 0" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {MOBILE_NO}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 3px"
                >
                  {member.mobile}
                </CardTextWrapper>
              </RowStyled>
            </Row>
            <Row
              margin="0"
              display="flex"
              padding="0"
            >
              <CardFieldWrapper
                gutter={false}
                height="10px"
                flex="1"
                margin="0 0 0 3px"
              >
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >{BUS_STOP}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 10px"
                >
                  {member.busStop}
                </CardTextWrapper>
              </CardFieldWrapper>
              <RowStyled flex="0.5 0 0" margin="0 0 0 3px">
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {BUS_NO}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 3px"
                >
                  {member.busNumber}
                </CardTextWrapper>
              </RowStyled>
            </Row>
            <Row
              margin="0 0 8px 0"
              padding="0"
              display="flex"
            >
              <CardFieldWrapper
                gutter={false}
                height="10px"
                flex="1"
                margin="0 0 0 4px"
              >
                <Typography
                  type="caption"
                  gutterLeft="0"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {ADDRESS}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontSize="9px"
                  padding="0 0 0 10px"
                >
                  {address}
                </CardTextWrapper>
              </CardFieldWrapper>
            </Row>
            <Row
              padding="0"
              display="flex"
              justify="space-around"
              alignItems="center"
              margin="0 0 8px 0"
            >
              <RowStyled flex="0 0 auto" margin="3px 0 0 0">
                <Typography
                  type="caption"
                  fontWeight="bold"
                  gutterTop="2px"
                  gutterLeft="0"
                  fontSize="13px"
                  fontFamily="Roboto Condensed"
                >
                  {STUDENT_ID}
                </Typography>
                <CardTextWrapper
                  type="caption"
                  fontWeight="bold"
                  gutterTop="2px"
                  fontSize="13px"
                  padding="0 0 0 3px"
                >
                  {member.memberId}
                </CardTextWrapper>
              </RowStyled>
              <BarcodeWrapperStyled flex="0 0 auto" margin="3px 0 0 0">
                <Barcode
                  height={25}
                  width={3}
                  format="CODE128"
                  background="transparent"
                  fontSize={16}
                  textPosition="left"
                  value={memberId}
                />
              </BarcodeWrapperStyled>
            </Row>
          </MemberInformationWrapper>
          <FooterWrapperStyle
            color="white"
            gutterTop="0"
            gutterBottom="0"
            fontSize="9px"
            type="body"
            fontWeight="bold"
            padding="0 5px"
            align="center"
          >
            <CoordinatorInformation
              busNumber={member.busNumber}
              value="coordinatorName"
              label="Coordinator name"
              busCoordinators={busCoordinators}
            />
            <CoordinatorInformation
              busNumber={member.busNumber}
              value="contactNumber"
              label="Coordinator contact"
              busCoordinators={busCoordinators}
            />
          </FooterWrapperStyle>
        </BoxStyled>);
    });
    const membersTemplate = [];
    let groupOfTwoMembers = [];

    membersIdCards.forEach((obj) => {
      if (groupOfTwoMembers.length !== 2) {
        groupOfTwoMembers.push(obj);
      } else {
        membersTemplate.push((
          <TwoIdCardWrapperStyled
            borderColor="unset"
            borderStyle="none"
            padding="0"
            margin="0"
            key={shortId.generate()}
          >
            {groupOfTwoMembers}
          </TwoIdCardWrapperStyled>
        ));
        groupOfTwoMembers = [];
        groupOfTwoMembers.push(obj);
      }
    },
    );
    if (!isEmpty(groupOfTwoMembers)) {
      membersTemplate.push((
        <TwoIdCardWrapperStyled
          borderColor="unset"
          borderStyle="none"
          padding="0"
          margin="0"
          key={shortId.generate()}
        >
          {groupOfTwoMembers}
        </TwoIdCardWrapperStyled>
      ));
    }
    if (!isEmpty(membersTemplate)) {
      return (
        <MemberIdCardWrapper
          borderColor="unset"
          borderStyle="none"
          padding="0"
          margin="0"
        >
          {membersTemplate}
        </MemberIdCardWrapper>
      );
    }
    return null;
  }

  render() {
    const { selectedMembers } = this.props;
    return (
      <Box
        padding="0"
        margin="0"
        backgroundColor="unset"
        borderStyle="none"
      >
        {this.renderMembersIdCard({ selectedMembers })}
      </Box>
    );
  }
}

MembersIdCard.propTypes = {
  constants: PropTypes.object,
  busCoordinators: PropTypes.object,
  logoPathConfig: PropTypes.object,
  selectedMembers: PropTypes.array,
};

MembersIdCard.defaultProps = {
  constants: {},
  busCoordinators: {},
  logoPathConfig: {},
  selectedMembers: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  busCoordinators: getBusCoordinators(state),
  logoPathConfig: getLogoPathConfig(state),
});

export default connect(mapStateToProps, null)(MembersIdCard);
