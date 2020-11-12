import React from 'react';
import Title from './Title';
import { ToastContainer } from 'react-toastify';
import { Progress } from 'reactstrap';

export default function FileUpload(props) {
    return (
        <div class="container">
            <div class="row">
                <div class="offset-md-3 col-md-6">
                    <div class="form-group files">
                        <Title>Upload Your File </Title>
                        <input type="file" class="form-control" multiple onChange={props.onChangeHandler} />
                    </div>
                    <div class="form-group">
                        <ToastContainer />
                        <Progress max="100" color="success" value={props.loaded} >{Math.round(props.loaded, 2)}%</Progress>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" onClick={props.onClickHandler}>Upload</button>
                </div>
            </div>
        </div>
    );
}