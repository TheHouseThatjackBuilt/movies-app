import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { func } from 'prop-types';

import { Input } from 'antd';

export default class Search extends Component {
  state = {
    searchValue: '',
  };

  componentDidMount = () => {
    this.userSearchParamsWithDebounce = debounce(this.decoratorForSearch, 300);
  };

  onChange = (event) => {
    const { value } = event.target;
    const { userSearchParamsWithDebounce } = this;
    this.setState({ searchValue: value });
    userSearchParamsWithDebounce();
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ searchValue: '' });
  };

  decoratorForSearch = () => {
    const { searchValue } = this.state;
    const { userSearchParams } = this.props;
    userSearchParams(searchValue);
  };

  render = () => {
    const { onChange, onSubmit } = this;
    const { searchValue } = this.state;
    return (
      <header className="header movies-app__header">
        <form onSubmit={onSubmit}>
          <Input className="header__input" placeholder="Type to search..." onChange={onChange} value={searchValue} />
        </form>
      </header>
    );
  };
}

Search.propTypes = {
  userSearchParams: func.isRequired,
};
