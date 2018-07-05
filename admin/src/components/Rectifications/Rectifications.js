import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'theme/Tabs.css';

import ReactPaginate from 'react-paginate';
import 'theme/Paginate.css';

import moment from 'moment';

import Loader from 'components/core/cards/dashboard/Loader';
import Card from 'components/core/cards/dashboard/Card';

const Rectifications = ({
  isLoading,
  tabs,
  selectedTab,
  onTabSelect,
  pageCount,
  currentPage,
  onPageSelected,
  data
}) => {
  function renderTableHeading(showStatus = false) {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Created at</th>
          <th>Reason</th>
          {showStatus && <th>Status</th>}
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  function renderTableBody(showStatus = false) {
    return (
      <tbody>
        {data.map((value, index) => (
          <tr key={index}>
            <td>{value.id}</td>
            <td>{moment(value.created_at).format('LLL')}</td>
            <td>{value.request_reason}</td>
            {showStatus && <td>{value.status}</td>}
            <td>
              <button className="ui-action btn" onClick={e => {}}>
                Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  function handlePageClick(page) {
    onPageSelected(page);
  }

  function renderPagination() {
    return (
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={pageCount}
        initialPage={currentPage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handlePageClick(selected + 1)}
        disableInitialCallback={true}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    );
  }

  function renderPendingRequests() {
    return (
      <React.Fragment>
        <div className="content">
          <table className="responsive-table">
            {renderTableHeading()}
            {renderTableBody()}
          </table>
        </div>
        <div className="content">{renderPagination()}</div>
      </React.Fragment>
    );
  }

  function renderRequestsArchive() {
    return (
      <React.Fragment>
        <div className="content">
          <table className="responsive-table">
            {renderTableHeading(true)}
            {renderTableBody(true)}
          </table>
        </div>
        <div className="content">{renderPagination()}</div>
      </React.Fragment>
    );
  }

  function renderLoader() {
    return (
      <div className="content">
        <Loader />
      </div>
    );
  }

  return (
    <section className="cards">
      <div className="action-bar">
        <div className="text">
          <h4>Rectification requests</h4>
          <p>
            Here you can manage requests from users who want to execute their right to rectify the
            data stored about them.
          </p>
        </div>
      </div>
      <Tabs selectedIndex={selectedTab} onSelect={onTabSelect}>
        <TabList>{tabs.map((value, index) => <Tab key={index}>{value}</Tab>)}</TabList>
        <TabPanel>
          <div className="row">
            <Card cols={8}>{!isLoading ? renderPendingRequests() : renderLoader()}</Card>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="row">
            <Card cols={8}>{!isLoading ? renderRequestsArchive() : renderLoader()}</Card>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

Rectifications.propTypes = {
  isLoading: PropTypes.bool,
  tabs: PropTypes.array.isRequired,
  selectedTab: PropTypes.number.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageSelected: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default Rectifications;
