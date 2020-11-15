/* eslint-disable */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { func } from 'prop-types';

import { Input } from 'antd';

export default class Search extends Component {
  // state = {
  //   value: null,
  // };

  // moviesSearchQuery = () => {
  //   debugger;
  //   const { value } = this.state;
  //   const { moviesSearchQuery } = this.props;
  //   userSearchParams(searchValue);
  // };

  // onChange = (value) => {
  //   debugger;
  //   this.setState({ value });
  //   this.moviesSearchQueryDebounce();
  // };
  state = {
    searchValue: null,
  };

  userSearchParamsWithDebounce = debounce(this.onLabelChange, 500);

  componentDidUpdate = (prevProps, prevState) => {
    const { searchValue } = this.state;
    const { userSearchParams } = this.props;
    if (searchValue !== prevState.searchValue) userSearchParams(searchValue);
  };

  onLabelChange = (evt) => {
    this.setState({ searchValue: evt.target.value });
  };

  render = () => {
    const { userSearchParamsWithDebounce } = this;
    return (
      <header className="header movies-app__header">
        <Input
          className="header__input"
          placeholder="Type to search..."
          onChange={(evt) => userSearchParamsWithDebounce(evt)}
        />
      </header>
    );
  };

  // componentDidMount() {
  //   debugger;
  //   this.userSearchParamsDebounce = debounce(this.userSearchParams, 1000);
  // }
  // state = {
  //   searchValue: null,
  // };
  // componentDidMount = () => {
  //   this.userSearchParamsWithDebounce = debounce(this.onLabelChange, 500);
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { searchValue } = this.state;
  //   const { userSearchParams } = this.props;
  //   if (searchValue !== prevState.searchValue) userSearchParams(searchValue);
  // };

  // onLabelChange = (evt) => {
  //   this.setState({ searchValue: evt.target.value });
  // };

  // render = () => {
  //   const { userSearchParamsWithDebounce } = this;
  //   return (
  //     <header className="header movies-app__header">
  //       <Input
  //         className="header__input"
  //         placeholder="Type to search..."
  //         onChange={(evt) => userSearchParamsWithDebounce(evt)}
  //       />
  //     </header>
  //   );
  // };
}

Search.propTypes = {
  userSearchParams: func.isRequired,
};
