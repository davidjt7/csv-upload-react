import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Home/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      amountsInINR: [],
      rate: 0,
      timestamp: 0,
      rows: []
    }
  }
  checkMimeType = (event) => {
    let files = event.target.files
    let err = []
    const types = ['text/csv']
    const checkTypes = type => files[x].type !== type
    for (var x = 0; x < files.length; x++) {
      if (types.every(checkTypes)) {
        err[x] = files[x].type + ' is not a supported format\n';
      }
    };
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }
  maxSelectFile = (event) => {
    let files = event.target.files
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      event.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }
  checkFileSize = (event) => {
    let files = event.target.files
    let size = 2000000
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    };
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }
  onChangeHandler = event => {
    var files = event.target.files
    if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        selectedFile: files,
        loaded: 0
      })
    }
  }
  onClickHandler = () => {
    this.setState({
      rows: []
    })
    const data = new FormData()
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('inr', this.state.selectedFile[x])
    }
    axios.get("http://localhost:8001/convert/1")
      .then(res => {
        this.setState({
          rate: res.data.amount,
          timestamp: res.data.timestamp
        })
      })
    axios.post("http://localhost:8001/csv", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },
    })
      .then(res => {
        this.setState({
          amountsInINR: res.data.amountsInINR
        })
        toast.success('Uploaded successfully')
      })
      .catch(err => {
        toast.error('Upload failed')
      })
  }

  render() {
    return (
      <div>
        <Dashboard onChangeHandler={this.onChangeHandler} onClickHandler={this.onClickHandler} loaded={this.state.loaded} amountsInINR={this.state.amountsInINR} rate={this.state.rate} timestamp={this.state.timestamp} upload={this.state.upload} />
      </div>
    );
  }
}

export default App;
