import React from 'react';
import { css } from '@emotion/core';
// First way to import
//import { ClipLoader } from 'react-spinners';
// Another way to import
import ClipLoader from 'react-spinners/ClipLoader';
import {connect} from 'react-redux'

const override = css`display: block; margin: 0 auto; border-color: red;`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    console.log('spinner')
    if(this.props.spinner){
        return (
            <div className='Dialog'>
              <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={'#123abc'}
                loading={this.state.loading}
              />
            </div> 
        )
    }
    else{
        return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        spinner: state.spinner
    }
}

export default connect(mapStateToProps)(Spinner)