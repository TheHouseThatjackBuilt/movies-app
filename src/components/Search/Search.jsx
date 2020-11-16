/* eslint-disable */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { func } from 'prop-types';

import { Input } from 'antd';

export default class Search extends Component {
  state = {
    searchValue: null,
  };

  // componentDidMount = () => {
  //   this.userSearchParamsWithDebounce = debounce(this.onLabelChange, 500);
  // };

  onLabelChange = (evt) => {
    this.setState({ searchValue: evt.target.value });
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { searchValue } = this.state;
  //   const { userSearchParams } = this.props;
  //   if (searchValue !== prevState.searchValue) userSearchParams(searchValue);
  // };

  render = () => {
    const userSearchParamsWithDebounce = debounce(this.onLabelChange, 500);
    console.log(userSearchParamsWithDebounce);
    return (
      <header className="header movies-app__header">
        <Input className="header__input" placeholder="Type to search..." />
      </header>
    );
  };
}

Search.propTypes = {
  userSearchParams: func.isRequired,
};
