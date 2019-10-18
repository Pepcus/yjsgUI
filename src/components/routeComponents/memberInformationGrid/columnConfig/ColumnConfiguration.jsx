import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import CheckboxNew from 'pepcus-core/lib/CheckboxNew';
import Container from 'pepcus-core/lib/Container';
import Col from 'pepcus-core/lib/Col';
import Form from 'pepcus-core/lib/Form';
import Modal from 'pepcus-core/lib/Modal';
import Typography from 'pepcus-core/lib/Typography';
import Row from 'pepcus-core/lib/Row';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  chunkArray,
  getChangedVisibleColumnConfig,
  getStyled,
} from 'utils/common';
import { getConstants } from 'reducers/constants';

import { schema, uiSchema } from './columnConfig.json';

// TODO by Pratik: Make it passed down from the route JSON config
const columnsList = [
  {
    'label': 'ID',
    'key': 'memberId',
  },
  {
    'label': 'Name',
    'key': 'name',
  },
  {
    'label': 'Father Name',
    'key': 'fatherName',
  },
  {
    'label': 'Gender',
    'key': 'gender',
  },
  {
    'label': 'Age',
    'key': 'age',
  },
  {
    'label': 'Education',
    'key': 'education',
  },
  {
    'label': 'Occupation',
    'key': 'occupation',
  },
  {
    'label': 'Mobile',
    'key': 'mobile',
  },
  {
    'label': 'Email',
    'key': 'email',
  },
  {
    'label': 'Address',
    'key': 'address',
  },
  {
    'label': 'Bus Number',
    'key': 'busNumber',
  },
  {
    'label': 'Bus Stop',
    'key': 'busStop',
  },
  {
    'label': 'Print Status',
    'key': 'printStatus',
  },
  {
    'label': 'Remark',
    'key': 'remark',
  },
  {
    'label': 'Secret Key',
    'key': 'secretKey',
  },
  {
    'label': '2016 Class Attended',
    'key': 'classAttended2016',
  },
  {
    'label': '2017 Class Attended',
    'key': 'classAttended2017',
  },
  {
    'label': '2018 Class Attended',
    'key': 'classAttended2018',
  },
  {
    'label': '2019 Class Attended',
    'key': 'classAttended2019',
  },
  {
    'label': '2016 Class Room No.',
    'key': 'classRoomNo2016',
  },
  {
    'label': '2017 Class Room No.',
    'key': 'classRoomNo2017',
  },
  {
    'label': '2018 Class Room No.',
    'key': 'classRoomNo2018',
  },
  {
    'label': '2019 Class Room No.',
    'key': 'classRoomNo2019',
  },
  {
    'label': '2016 Attendance',
    'key': 'attendance2016',
  },
  {
    'label': '2017 Attendance',
    'key': 'attendance2017',
  },
  {
    'label': '2018 Attendance',
    'key': 'attendance2018',
  },
  {
    'label': '2019 Attendance',
    'key': 'attendance2019',
  },
  {
    'label': '2016 Marks',
    'key': 'marks2016',
  },
  {
    'label': '2017 Marks',
    'key': 'marks2017',
  },
  {
    'label': '2018 Marks',
    'key': 'marks2018',
    'type': 'Number',
  },
  {
    'label': '2019 Marks',
    'key': 'marks2019',
  },
  {
    'label': '2018 Opt In',
    'key': 'optIn2018',
  },
  {
    'label': '2019 Opt In',
    'key': 'optIn2019',
  },
  {
    'label': 'Day 1',
    'key': 'day1',
  },
  {
    'label': 'Day 2',
    'key': 'day2',
  },
  {
    'label': 'Day 3',
    'key': 'day3',
  },
  {
    'label': 'Day 4',
    'key': 'day4',
  },
  {
    'label': 'Day 5',
    'key': 'day5',
  },
  {
    'label': 'Day 6',
    'key': 'day6',
  },
  {
    'label': 'Day 7',
    'key': 'day7',
  },
  {
    'label': 'Day 8',
    'key': 'day8',
  },
  {
    'label': 'Created Date',
    'key': 'createdDate',
  },
  {
    'label': 'Last Modified Date',
    'key': 'lastModifiedDate',
  },
];


const ContainerStyled = styled(Container)`
    padding: 0 10px 20px 20px;
    display: flex;
    max-height: 300px;
    min-height: 299px;
    overflow: auto;
    ${({ theme }) => theme.media.down('xl')`
    margin: 0 15px 20px 15px;
    padding: 0 0 20px 0;
  `}
    ${({ theme }) => theme.media.down('lg')`
        padding: 0 10px 20px 20px;
        margin: 0 20px 20px 20px;
        display: block;
        padding: 0;
        overflow-y: auto;
        max-height: 600px;
    `}
    ${({ theme }) => theme.media.down('md')`
        display: block;
        padding: 0;
        margin-left: 10px;
        overflow-y: auto;
    `}
    ${({ theme }) => theme.media.down('sm')`
        max-height: 345px;
        overflow-y: auto;
        padding-left: 10px;
    `}
`;

const RowStyled = styled(Row)`
    background: ${getThemeProps('colors.header')};
`;

const ButtonStyled = styled(Button)`
     float: right;
`;

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('palette.white.color')};
`;

const BoxStyled = styled(Box)`
  width: 1065px
  ${({ theme }) => theme.media.down('xl')`
    width: 970px;
  `}
  ${({ theme }) => theme.media.down('lg')`
    width: 370px;
  `}
  ${({ theme }) => theme.media.down('md')`
    width: 300px
  `}
  ${({ theme }) => theme.media.down('sm')`
    width: 285px
 `}
`;

const ColumnOptionBoxStyled = styled(Box)`
 ${({ theme }) => theme.media.down('xl')`
    padding: 16px 5px;
 `}
  ${({ theme }) => theme.media.down('lg')`
    padding: 0 12px;
    margin: 0;
 `}
`;

const CloseButtonWrapperStyled = styled(Col)`
   ${({ theme }) => theme.media.down('xl')`
     flex-basis: 80%;
     max-width: 80%;
 `}
 ${({ theme }) => theme.media.down('lg')`
     flex-basis: 55%;
     max-width: 55%;
 `}
`;

const SaveButtonWrapperStyled = styled(Col)`
   ${({ theme }) => theme.media.down('xl')`
     flex-basis: 20%;
     max-width: 20%;
 `}
 ${({ theme }) => theme.media.down('lg')`
     flex-basis: 35%;
     max-width: 35%;
 `}
`;

/**
 * ColumnConfig component render column config option
 * @type {Class}
 */
class ColumnConfiguration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };
  }

  componentWillMount() {
    const { visibleColumnConfig, selectValue } = this.props;
    const { formData } = this.state;

    this.setState({
      formData: { ...formData, visibleColumnConfig, selectValue },
    });
  }

  /**
   * Method render the column options in column config.
   * @return {HTML}
   */
  renderColumnOptions = () => {
    const { formData } = this.state;
    const columnsListTemporary = cloneDeep(columnsList);
    let columnListChunks = [];
    const chunkLength = Math.ceil(columnsList.length / 4);

    if (chunkLength >= 10) {
      columnListChunks = chunkArray(columnsListTemporary, chunkLength);
    } else {
      columnListChunks = chunkArray(columnsListTemporary, 10);
    }

    return (
      <ContainerStyled width="auto" margin="0 20px 20px 20px">
        { columnListChunks.map(columnChunk => (
          <ColumnOptionBoxStyled
            margin="0 0 16px 0"
            backgroundColor="unset"
            borderStyle="none"
            key={shortId.generate()}
          >
            {
              columnChunk.map(option => (
                <Row alignItems="center" key={shortId.generate()}>
                  <CheckboxNew
                    inactiveColor="checkbox"
                    color="checkbox"
                    name={option.key}
                    onChange={this.handleChange}
                    checked={!!formData.visibleColumnConfig[option.key]}
                  />
                  <Typography padding="8px 0 0 15px" fontSize="18px">{option.label}</Typography>
                </Row>
              ))
            }
          </ColumnOptionBoxStyled>
        ))
        }
      </ContainerStyled>
    );
  };

  /**
   * Method call callBack setValuesOfVisibleColumnConfig()
   * and call closeColumnOption() method.
   */
  setValuesOfVisibleColumnConfig = () => {
    const { formData } = this.state;
    const { visibleColumnConfig, selectValue } = formData;
    const { setValuesOfVisibleColumnConfig, closeColumnOption } = this.props;

    setValuesOfVisibleColumnConfig({
      visibleColumnConfig,
      selectValue,
    });
    closeColumnOption();
  };

  /**
   * Method set value of selectValue(select all)(true or false) and on the basis
   * of selectValue value set the value of visibleColumnConfig(all column value)
   * @param {Object} formData
   */
  setCheckValue = ({ formData }) => {
    const { formData: previousFormData } = this.state;
    const temporaryVisibleColumnConfig = cloneDeep(previousFormData.visibleColumnConfig);
    const { selectValue } = previousFormData;

    if (selectValue !== formData.selectValue) {
      this.setState({
        formData: {
          ...previousFormData,
          selectValue: formData.selectValue,
          visibleColumnConfig: getChangedVisibleColumnConfig({
            selectValue: formData.selectValue,
            temporaryVisibleColumnConfig }),
        },
      });
    } else {
      this.setState({
        formData,
      });
    }
  };

  /**
   * Method set value of visibleColumnConfig(all columns value)
   * @param {Object} event
   */
  handleChange = (event) => {
    const { formData } = this.state;

    if (event.target.checked) {
      this.setState({
        formData: {
          ...formData,
          visibleColumnConfig: {
            ...formData.visibleColumnConfig,
            [event.target.name]: true,
          },
        },
      });
    } else if (!event.target.checked) {
      this.setState({
        formData: {
          ...formData,
          visibleColumnConfig: {
            ...formData.visibleColumnConfig,
            [event.target.name]: false,
            'edit': false,
          },
        },
      });
    }
  };

  render() {
    const { closeColumnOption, columnOptionIsOpen, constants } = this.props;
    const { PLEASE_SELECT_COLUMNS_TEXT, CLOSE, SAVE } = constants;
    const UiSchema = {
      ...uiSchema,
      visibleColumnConfig: {
        ...uiSchema.visibleColumnConfig,
        'ui:widget': () => (
          this.renderColumnOptions()
        ),
      },
    };
    const { formData } = this.state;
    const style = getStyled({ width: window.innerWidth });

    return (
      <Modal
        open={columnOptionIsOpen}
        onClose={closeColumnOption}
        style={style}
      >
        <BoxStyled
          padding="0"
          backgroundColor="modal"
          margin="0"
          width="auto"
        >
          <RowStyled
            padding="10px"
            margin="-1px"
          >
            <TypographyStyled
              gutterLeft="15px"
              fontSize="20px"
            >
              {PLEASE_SELECT_COLUMNS_TEXT}
            </TypographyStyled>
          </RowStyled>
          <Form
            enableDirtyCheck
            externalSubmission
            showErrorList={false}
            liveValidate
            schema={schema}
            uiSchema={UiSchema}
            onChange={this.setCheckValue}
            formData={formData}
          />
          <Row margin="0 0 20px 0">
            <CloseButtonWrapperStyled padding="0" size={10}>
              <ButtonStyled
                color="secondary"
                border
                noMinWidth
                onClick={closeColumnOption}
              >
                { CLOSE }
              </ButtonStyled>
            </CloseButtonWrapperStyled>
            <SaveButtonWrapperStyled padding="0" size={2}>
              <Button
                margin="0 0 0 30px"
                noMinWidth
                onClick={this.setValuesOfVisibleColumnConfig}
              >
                { SAVE }
              </Button>
            </SaveButtonWrapperStyled>
          </Row>
        </BoxStyled>
      </Modal>
    );
  }
}

ColumnConfiguration.propTypes = {
  constants: PropTypes.object,
  closeColumnOption: PropTypes.func,
  columnOptionIsOpen: PropTypes.bool,
  selectValue: PropTypes.bool,
  setValuesOfVisibleColumnConfig: PropTypes.func,
  visibleColumnConfig: PropTypes.object,
};

ColumnConfiguration.defaultProps = {
  constants: {},
  closeColumnOption: () => {},
  columnOptionIsOpen: false,
  selectValue: true,
  setValuesOfVisibleColumnConfig: () => {},
  visibleColumnConfig: {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});
export default connect(
  mapStateToProps,
  null,
)(ColumnConfiguration);
