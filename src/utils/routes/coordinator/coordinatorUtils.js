import { isEmpty } from 'pepcus-core';

export const updateCoordinatorDepartmentsInFormConfig = ({
  formConfig = {},
  coordinatorDepartments = [],
}) => {
  const { schema: { properties: { interestedDepartments = {} } } } = formConfig;
  const enumValues = getEnumValuesFromCoordinatorDepartments(coordinatorDepartments);
  const enumNames = getEnumNamesFromCoordinatorDepartments(coordinatorDepartments);
  interestedDepartments.enum = enumValues;
  interestedDepartments.enumNames = enumNames;
  return {
    ...formConfig,
  };
};

export const getEnumValuesFromCoordinatorDepartments = (coordinatorDepartments = []) => {
  const enumValues = [];
  coordinatorDepartments.forEach(department => {
    enumValues.push(department.id);
  });
  return enumValues;
};

export const getEnumNamesFromCoordinatorDepartments = (coordinatorDepartments = []) => {
  const enumNames = [];
  coordinatorDepartments.forEach(department => {
    enumNames.push(department.displayName);
  });
  return enumNames;
};


export const updateFormConfigForAssignDepartmentPopup = ({
  formConfig = {},
  coordinatorDepartments = [],
}) => {
  const { schema } = formConfig;
  const { definitions: { departmentEntity } } = schema;
  const {
    properties: departmentEntityProperties,
    required: departmentEntityRequired,
  } = departmentEntity;
  const departmentEntityDependencies = {
    departmentType: {
      oneOf: []
    }
  };
  const { departmentType: departmentTypeProperties } = departmentEntityProperties;
  departmentTypeProperties.enum = getEnumValuesFromCoordinatorDepartments(coordinatorDepartments);
  departmentTypeProperties.enumNames = getEnumNamesFromCoordinatorDepartments(coordinatorDepartments);

  const { departmentType: { oneOf = [] } } = departmentEntityDependencies;

  coordinatorDepartments.forEach((coordinatorDepartmentData, index) => {
    if (!isEmpty(coordinatorDepartmentData.departmentValues)) {
      oneOf.push({
        properties: {
          departmentType: {
            "enum": [coordinatorDepartmentData.id],
            enumNames: [coordinatorDepartmentData.displayName]
          },
          departmentValue: {
            title: 'Department Value',
            "enum": getEnumValuesFromCoordinatorDepartments(coordinatorDepartmentData.departmentValues),
            enumNames: getEnumNamesFromCoordinatorDepartments(coordinatorDepartmentData.departmentValues),
          }
        },
      });
    } else {
      oneOf.push({
        properties: {
          departmentType: {
            "enum": [coordinatorDepartmentData.id],
            enumNames: [coordinatorDepartmentData.displayName]
          },
        },
      });
    }
  });

  departmentEntity.dependencies = departmentEntityDependencies;

  return {
    ...formConfig,
  };
};

