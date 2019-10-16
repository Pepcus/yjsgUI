import cloneDeep from 'lodash/cloneDeep';
import upperFirst from 'lodash/upperFirst';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import Fuse from 'fuse.js';

import {
  gridMetaData,
} from 'constants/gridData';

/**
 * manageMembersTableWidth method is called when we have to manage table width in grid page.
 * It finds a table class and take dynamic width of it and assigned to footer class after
 * that whole table width managed accordingly.
 * Also gives styling according to the table's width and also will add or remove class according
 * to browser window width.
 * @param {Object} widthRef
 */
export const manageMembersTableWidth = (widthRef) => {
  if (widthRef.current) {
    const gridTableNode = widthRef.current.querySelector('.render-table');
    const gridTableFileNode = widthRef.current.querySelector('.file-component .render-table');
    if (gridTableNode) {
      if (window.innerWidth <= 768) {
        gridTableNode.style = 'display:grid !important';
      }
      const footer = widthRef.current.querySelector('.table-drawer__bottom');
      footer.style.width = `${gridTableNode.offsetWidth}px`;
      const fileFooterWidth = widthRef.current.querySelector('.file-component .table-drawer__bottom');
      const gridFooterNode = widthRef.current.querySelector('.table-footer-cell');
      const gridWrapperPagination = widthRef.current.querySelector('.table-drawer__bottom .wrapper-pagination-search>div:first-child');
      if (gridTableFileNode) {
        if (gridTableFileNode.offsetWidth >= 998) {
          fileFooterWidth.style.width = '100%';
        }
      }
      if (gridTableNode) {
        if (gridTableNode.offsetWidth <= 450) {
          if (gridWrapperPagination) {
            if (gridWrapperPagination.classList.contains('wrapper-pagination-column-large-width')) {
              gridWrapperPagination.classList.remove('wrapper-pagination-column-large-width');
            }
            gridWrapperPagination.classList.add('wrapper-pagination-column-small-width');
          }
          if (footer) {
            footer.classList.add('table-drawer-bottom-small-width');
          }
          if (gridFooterNode) {
            if (gridFooterNode.classList.contains('table-footer-cell-large-width')) {
              gridFooterNode.classList.remove('table-footer-cell-large-width');
            }
            gridFooterNode.classList.add('table-footer-cell-small-width');
          }
        }
      } else {
        if (gridWrapperPagination) {
          if (gridWrapperPagination.classList.contains('wrapper-pagination-column-small-width')) {
            gridWrapperPagination.classList.add('wrapper-pagination-column-large-width');
            gridWrapperPagination.classList.remove('wrapper-pagination-column-small-width');
          }
        }
        if (gridFooterNode) {
          if (gridFooterNode.classList.contains('table-footer-cell-small-width')) {
            gridFooterNode.classList.add('table-footer-cell-large-width');
            gridFooterNode.classList.remove('table-footer-cell-small-width');
          }
        }
        if (footer) {
          if (footer.classList.contains('table-drawer-bottom-small-width')) {
            footer.classList.remove('table-drawer-bottom-small-width');
          }
        }
      }
    }
  }
};
/**
 * getInitialVisibleColumnConfig method set initially all column
 * visible that is set true value of all column
 * @return {Object} temporaryVisibleColumnConfig
 */
export const getInitialVisibleColumnConfig = () => {
  const temporaryVisibleColumnConfig = {};
  gridMetaData.forEach((columnOption) => {
    temporaryVisibleColumnConfig[columnOption.key] = true;
  });
  return temporaryVisibleColumnConfig;
};
/**
 * chunkArray divide array into chunk of array
 * @param {Array} Array
 * @param {Number} chunkSize
 * @return {Array} results
 */
export const chunkArray = (Array, chunkSize) => {
  const temporaryArray = cloneDeep(Array);
  const results = [];

  while (temporaryArray.length) {
    results.push(temporaryArray.splice(0, chunkSize));
  }
  return results;
};

/**
 * getFormattedMemberId method convert the memberID into four digit memberID.
 * @param {Number} memberId
 * @return {string} memberId
 */
export const getFormattedMemberId = ({ memberId }) => {
  if (memberId.length === 1) {
    return String(`000${memberId}`);
  } else if (memberId.length === 2) {
    return String(`00${memberId}`);
  } else if (memberId.length === 3) {
    return String(`0${memberId}`);
  } return String(memberId);
};

/**
 * formatMetaData method format headerConfig of metaData according to visibleColumnConfig object
 * (set the column which should be render in DataGrid)
 * @param {Object} visibleColumnConfig
 * @param {Object} metaData
 * @param {Component} EditButton
 * @return {Object} updatedMetaData
 */
export const formatMetaData = ({ visibleColumnConfig, metaData, EditButton }) => {
  let formattedMetaData = [];
  for (const columnKey in visibleColumnConfig) {
    if (visibleColumnConfig[columnKey]) {
      if (columnKey === 'edit') {
        formattedMetaData = [{
          ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey),
          customComponent: EditButton,
        }, ...formattedMetaData];
      } else {
        formattedMetaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey));
      }
    }
  }
  return { ...metaData, headerConfig: formattedMetaData };
};

/**
 * Method is call back function pass to the DataGrid
 * which gives the selected and unselected members Id with isChecked flag.
 * and modify the member object according to isChecked flag.
 * @param {Array} idCheckStatusList
 * @param {Array} members
 * @return {Array} checkedMembers
 */
export const getSelectedMembers = ({ idCheckStatusList, members }) => {
  const checkedMembers = [];
  idCheckStatusList.forEach((idCheckStatusObject) => {
    members.forEach((member) => {
      if (idCheckStatusObject.isChecked) {
        if (Number(member.id) === idCheckStatusObject.id) {
          checkedMembers.push({ ...member, memberId: String(member.id) });
        }
      }
    });
  });
  return checkedMembers;
};

/**
 * setAllMembersAsUnchecked method make isChecked to false in member object
 * @param {Array} members
 * @return {Array}
 */
export const setAllMembersAsUnchecked = ({ members }) => members.map(member => ({ id: member.id, isChecked: false }));

/**
 * Method format members array in which assign id as memberId to object.
 * @param {Array} members
 * @return {Array} members
 */
export const formatMembers = ({ members }) => members.map((item) => {
  if (!('memberId' in item)) {
    return ({ ...item, memberId: String(item.id), isChecked: false });
  }
  return item;
},
);

// TODO by Pratik: Need to be refactored
export const getChangedVisibleColumnConfig = ({ selectValue, temporaryVisibleColumnConfig }) => {
  if (selectValue) {
    for (const key in temporaryVisibleColumnConfig) {
      if (Object.prototype.hasOwnProperty.call(temporaryVisibleColumnConfig, key)) {
        temporaryVisibleColumnConfig[key] = true;
      }
    }
  } else if (!selectValue) {
    for (const key in temporaryVisibleColumnConfig) {
      if (Object.prototype.hasOwnProperty.call(temporaryVisibleColumnConfig, key)) {
        temporaryVisibleColumnConfig[key] = false;
      }
    }
  }
  return temporaryVisibleColumnConfig;
};

/**
 * extractMembersId method set the selected members Id into memberId Array
 * @param {Array} selectedStudents
 * @return {*}
 */
export const extractMembersId = ({ selectedMembers }) => selectedMembers.map(member => String(member.memberId));

export const getStyled = ({ width }) => {
  let style = {};
  if (width > 1200) {
    style = {
      padding: '0',
      left: '-9%',
    };
  } else if (width === 1024) {
    style = {
      padding: '0',
      left: '-10%',
    };
  } else if (width < 770) {
    style = {
      left: '0',
      padding: '0',
    };
  }
  return style;
};

/**
 * Convert first character into upper case of all word for sentence
 * @param {String} sentence
 * @return {Array} words
 */
export const convertFirstCharacterInUpperCase = ({ sentence }) => {
  const words = sentence ? sentence.split(' ') : [sentence];

  words.forEach((character, index) => {
    words[index] = character ? upperFirst(`${words[index].toLocaleLowerCase()} `) : '';
  });
  return words;
};

/**
 * Set the value of edit column on the basis of any column selected on not.
 * @param {Object} visibleColumnConfig
 * @return {Object} changedVisibleColumnConfig
 */
export const getUpdatedVisibleColumnConfig = ({ visibleColumnConfig }) => {
  let count = 0;
  let changedVisibleColumnConfig = {};

  for (const key in visibleColumnConfig) {
    if (Object.prototype.hasOwnProperty.call(visibleColumnConfig, key)) {
      if (visibleColumnConfig[key]) {
        count += 1;
      }
      if (count > 0) {
        changedVisibleColumnConfig = { ...visibleColumnConfig, edit: true };
      } else {
        changedVisibleColumnConfig = { ...visibleColumnConfig, edit: false };
      }
    }
  }
  return changedVisibleColumnConfig;
};

export const getMultipleIdSearchResult = ({ members, checkedIds, formData }) => {
  // isMultipleIdSearchCheck is check it do the search result according to search Ids.
  const searchMembersIds = formData.inputValue.split(',');
  const searchResult = [];
  searchMembersIds.forEach((element) => {
    const result = members.filter(member =>
      member.id === Number(element));
    searchResult.push(...result);
  });
  const uniqSearchResult = uniqWith(searchResult, isEqual);
  return uniqSearchResult.map((member) => {
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
};

export const getAdvanceSearchResult = ({ members, options, formData, checkedIds }) => {
  const fuse = new Fuse(members, options);
  const result = fuse.search(formData.inputValue);
  return result.map((member) => {
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
};

