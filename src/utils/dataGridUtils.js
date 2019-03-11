import {
  gridMetaData,
} from '../components/GridData';

/**
 * manageStudentTableWidth method is called when we have to manage table width in grid page.
 * It finds a table class and take dynamic width of it and assigned to footer class after that whole table width managed accordingly.
 * Also gives styling according to the table's width and also will add or remove class according to browser window width.
 * @param {Object} widthRef
 */
export const manageStudentTableWidth = (widthRef) => {
  if (widthRef.current) {
    const gridTableNode = widthRef.current.querySelector('.render-table');
    if (gridTableNode) {
      if (window.innerWidth <= 768) {
        gridTableNode.style = 'display:grid !important';
      }
      const footer = widthRef.current.querySelector('.table-drawer__bottom');
      footer.style.width = `${gridTableNode.offsetWidth}px`;
      const gridFooterNode = widthRef.current.querySelector('.table-footer-cell');
      const gridWrapperPagination = widthRef.current.querySelector('.table-drawer__bottom .wrapper-pagination-search>div:first-child');
      if (gridTableNode.offsetWidth <= 450) {
        if (gridWrapperPagination.classList.contains('wrapper-pagination-column-large-width')) {
          gridWrapperPagination.classList.remove('wrapper-pagination-column-large-width');
        }
        gridWrapperPagination.classList.add('wrapper-pagination-column-small-width');
        footer.classList.add('table-drawer-bottom-small-width');
        if (gridFooterNode.classList.contains('table-footer-cell-large-width')) {
          gridFooterNode.classList.remove('table-footer-cell-large-width');
        }
        gridFooterNode.classList.add('table-footer-cell-small-width');
      } else {
        if (gridWrapperPagination.classList.contains('wrapper-pagination-column-small-width')) {
          gridWrapperPagination.classList.add('wrapper-pagination-column-large-width');
          gridWrapperPagination.classList.remove('wrapper-pagination-column-small-width');
        }
        if (gridFooterNode.classList.contains('table-footer-cell-small-width')) {
          gridFooterNode.classList.add('table-footer-cell-large-width');
          gridFooterNode.classList.remove('table-footer-cell-small-width');
        }
        if (footer.classList.contains('table-drawer-bottom-small-width')) {
          footer.classList.remove('table-drawer-bottom-small-width');
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