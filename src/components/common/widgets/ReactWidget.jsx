import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import Col from 'pepcus-core/lib/Col';
import styled from 'styled-components';
import { getThemeProps } from 'pepcus-core/utils/theme';
import get from 'lodash/get';

const animatedComponents = makeAnimated();

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

export default function ReactWidget(props) {
  const { enumOptions } = props.options;
  const { onChange, value, placeholder, label, required, uiSchema } = props;
  const style = get(uiSchema, 'ui:options.style', {});
  const { titleStyle, fieldStyle, fieldWrapper } = style;
  console.log(props);
  return (
    <Col {...fieldWrapper} padding="0px">
      <Row width="100%" margin="0" >
        <TypographyStyled type="label" style={titleStyle}>
          {label}
          <Typography fontSize="20px" color="error" type="separator">{required && label ? '*' : null}</Typography>
        </TypographyStyled>
      </Row>
      <Row width="100%" margin="0">
        <Select
          style={{ ...fieldStyle }}
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={value}
          isMulti
          onChange={onChange}
          options={enumOptions}
          placeholder={placeholder}
        />
      </Row>
    </Col>
  );
}
