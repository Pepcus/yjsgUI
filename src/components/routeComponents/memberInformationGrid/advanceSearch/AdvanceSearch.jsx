import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import CheckboxNew from 'pepcus-core/lib/CheckboxNew';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/esm/utils/theme';

import {
  formatMembers,
  getMultipleIdSearchResult,
  getAdvanceSearchResult,
} from 'utils/common';
import fields from 'components/common/fields';
import { getAppConstantsConfig } from 'reducers/constants';

import { schema, uiSchema } from './advanceSearchShema.json';

const AdvanceSearchWrapper = styled(Box)`
    background-color: unset;
    border-style: unset;
    display: flex;
    flex-flow: row-reverse
    width: 65%;
    ${({ theme }) => theme.media.down('xl')`
        width: 60%;
    `}
    ${({ theme }) => theme.media.down('lg')`
        width: 75%;
    `} 
    ${({ theme }) => theme.media.down('sm')`
        width: 100%
        margin: 0;
        padding: 10px 0px;
    `}
`;

const TypographyStyled = styled(Typography)`
    top: 23px;
    position: absolute;
    right: 0.5%;
    cursor: pointer;
    font-size: 17px !important;
    color: ${getThemeProps('palette.action.disabledBackground')};
`;

const BoxStyled = styled(Box)`
   display: inline-block;
   ${({ theme }) => theme.media.down('xl')`
         margin: 0 50px 0 0;
    `}
    ${({ theme }) => theme.media.down('lg')`
         margin: 0 0 15px 0;
    `}
   ${({ theme }) => theme.media.down('md')`
        padding: 10px 10px;
        margin: 0 5px;
        display: block;
        text-align: center;
        width: 100%
   `}
`;

const LabelStyled = styled.label`
    color: ${getThemeProps('palette.text.color')};
    font-size: 14px;
    margin-left: 8px;
    margin-right: 20px;
    display: inline-block;
    position: relative;
    font-weight: 500;
    vertical-align: text-top;
    ${({ theme }) => theme.media.down('md')`
        margin-right: 8px;
        margin-left: 8px;
    `}
    @media (max-width: 375px) {
        margin-right: 4px;
        margin-left: 3px;
    }
`;

const FormWrapperStyled = styled(Col)`
  position: relative;
`;

/**
 * AdvanceSearch component render common search react component
 * @type {class}
 */
class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      thresholdValue: '0.0',
      isMultipleIdSearchCheck: false,
      isDeepSearchCheck: false,
      checkedIds: [],
    };
  }

  componentDidMount() {
    const { checkedIds } = this.props;

    this.setState({
      checkedIds,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checkedIds: nextProps.checkedIds,
    });
  }

  /**
   * Method assign search value to inputValue in state
   * and maintained the check and uncheck members.
   * And in case search value is empty then reassign all members data.
   * @param {Object} event
   */
  setInputValue = (event) => {
    const { checkedIds } = this.state;
    const { members, onFilter } = this.props;

    if (isEmpty(event.formData.inputValue)) {
      const membersData = members.map((member) => {
        let finalMemberObject = member;
        checkedIds.forEach((checkedUncheckedIdObject) => {
          if (String(member.id) === String(checkedUncheckedIdObject.id)) {
            finalMemberObject = {
              ...member,
              memberId: String(checkedUncheckedIdObject.id),
              isChecked: checkedUncheckedIdObject.isChecked,
            };
          }
        });
        return finalMemberObject;
      });
      onFilter(formatMembers({ members: membersData }));
    }
    this.setState({
      formData: event.formData,
    });
  };

  /**
   * Method clear the search result
   */
  // This may be use in future
  clearFilter = () => {
    const { checkedIds, formData } = this.state;
    const { members, onFilter } = this.props;

    // set the search input value to empty string
    if (!isEmpty(formData.inputValue)) {
      this.setState({
        formData: {
          ...formData,
          inputValue: '',
        },
      });
    }
    // assign default thresholdValue to 0.0
    // And set isMultipleIdSearchCheck to false.
    this.setState({
      thresholdValue: '0.0',
      isMultipleIdSearchCheck: false,
      isDeepSearchCheck: false,
    });

    const membersData = members.map((member) => {
      let finalMemberObject = member;
      checkedIds.forEach((checkedUncheckedIdObject) => {
        if (String(member.id) === String(checkedUncheckedIdObject.id)) {
          finalMemberObject = {
            ...member,
            memberId: String(checkedUncheckedIdObject.id),
            isChecked: checkedUncheckedIdObject.isChecked,
          };
        }
      });
      return finalMemberObject;
    });
    onFilter(formatMembers({ members: membersData }));
  };

  /**
   * Method on OnChange of search option check box
   * And manage thresholdValue, isDeepSearchCheck and isMultipleIdSearchCheck value
   * according to check and uncheck check box .
   * @param {Object} event
   */
  onChangeDeepSearchCheckBox = (event) => {
    if (event.target.checked) {
      this.setState({
        thresholdValue: event.target.value,
        isDeepSearchCheck: true,
        isMultipleIdSearchCheck: false,
      });
    } else {
      this.setState({
        thresholdValue: '0.0',
        isDeepSearchCheck: false,
      });
    }
  };

  /**
   * Method set the values of
   * thresholdValue, isDeepSearchCheck and isMultipleIdSearchCheck
   * according to check or uncheck of multiple Id search option
   * @param {Object} event
   */
  onChangeMultipleIdSearchCheckBox = (event) => {
    if (event.target.checked) {
      this.setState({
        thresholdValue: '0.0',
        isDeepSearchCheck: false,
        isMultipleIdSearchCheck: true,
      });
    } else {
      this.setState({
        isMultipleIdSearchCheck: false,
      });
    }
  };

  /**
   * Method return clear button when inputValue is not empty.
   * @return {HTML}
   */
  clearButton = () => {
    const { formData } = this.state;
    if (!isEmpty(formData.inputValue)) {
      return (
        <TypographyStyled
          type="caption"
        >
          <FaIcon
            icon={faTimesCircle}
            onClick={this.clearFilter}
          />
        </TypographyStyled>
      );
    }
    return null;
  };

  /**
   * Method find the search result and also maintained check and uncheck members.
   */
  advanceSearch = () => {
    const { isMultipleIdSearchCheck, thresholdValue, formData, checkedIds } = this.state;
    const { metaData, members, onFilter } = this.props;

    // isMultipleIdSearchCheck is uncheck it do the search result according to search string
    // type of search (thresholdValue)
    if (!isMultipleIdSearchCheck) {
      const foundKeys = metaData.headerConfig.map(object => object.key);
      const options = {
        shouldSort: true,
        threshold: Number(thresholdValue),
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: foundKeys,
      };
      if (!isEmpty(formData.inputValue)) {
        const membersData = getAdvanceSearchResult({ members, options, formData, checkedIds });
        onFilter(formatMembers({ members: membersData }));
      }
    } else if (!isEmpty(formData.inputValue)) {
      const membersData = getMultipleIdSearchResult({ members, checkedIds, formData });
      onFilter(formatMembers({ members: membersData }));
    }
  };

  render() {
    const { isDeepSearchCheck, isMultipleIdSearchCheck, formData } = this.state;
    const { appConstants } = this.props;
    const {
      DEEP_SEARCH,
      MULTIPLE_ID_SEARCH,
    } = appConstants;
    return (
      <AdvanceSearchWrapper>
        <BoxStyled
          width="auto"
          padding="20px 25px"
          elevation={1}
          borderRadius="4px"
          backgroundColor="advancedSearch"
        >
          <Row alignItems="center">
            <FormWrapperStyled size={10} padding="0 0 0 20px" margin="0">
              <Form
                showErrorList={false}
                liveValidate
                externalSubmission
                schema={schema}
                uiSchema={uiSchema}
                fields={fields}
                onChange={this.setInputValue}
                formData={formData}
                onSubmit={this.advanceSearch}
              />
              {this.clearButton()}
            </FormWrapperStyled>
            <Col size={2} padding="0 20px 0 0">
              <Button
                borderRadius="0 4px 4px 0"
                noMinWidth
                noMinHeight
                padding="5px"
                height="36px"
                width="100%"
                type="submit"
                form="advanceSearch"
                value="Submit"
                title="Search"
                onClick={this.advanceSearch}
              >
                <FaIcon icon={faSearch} />
              </Button>
            </Col>
          </Row>
          {/** TODO: this button work when user want to clear a search result.
             This may be use in future. */}
          {/* <button
          type="reset"
          value="Reset"
          onClick={this.clearFilter}
          className = "advance-search-button display-none">
            <i className="fa fa-trash card-icon"/>Clear
          </button>*/}
          <Row display="block" margin="0px">
            {/** TODO: thisNormal Search search option(exact search).
               This may be use in future.*/}
            {/* <div className="input-radio-container display-none">
              <input
              type="checkbox"
              name="thresholdValue"
              value="0.0" onClick={this.onClickRadioButton}
              defaultChecked />
              <label htmlFor = "normal_search">Normal Search</label>
            </div>*/}
            <Row margin="2px 2px 0 15px" alignItems="center">
              <CheckboxNew
                inactiveColor="checkbox"
                color="checkbox"
                name="thresholdValue"
                value="0.6"
                onChange={this.onChangeDeepSearchCheckBox}
                checked={isDeepSearchCheck}
              />
              <LabelStyled htmlFor="deep_search">{DEEP_SEARCH}</LabelStyled>
              <CheckboxNew
                color="checkbox"
                inactiveColor="checkbox"
                name="thresholdValue"
                onChange={this.onChangeMultipleIdSearchCheckBox}
                checked={isMultipleIdSearchCheck}
              />
              <LabelStyled htmlFor="deep_search">{MULTIPLE_ID_SEARCH}</LabelStyled>
            </Row>
          </Row>
        </BoxStyled>
      </AdvanceSearchWrapper>
    );
  }
}

AdvanceSearch.propTypes = {
  appConstants: PropTypes.object,
  checkedIds: PropTypes.array,
  members: PropTypes.array,
  metaData: PropTypes.object,
  onFilter: PropTypes.func,
};

AdvanceSearch.defaultProps = {
  appConstants: {},
  checkedIds: [],
  members: [],
  metaData: {},
  onFilter: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(AdvanceSearch);
