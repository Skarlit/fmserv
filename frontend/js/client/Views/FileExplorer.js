import React from "react";
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import FileList from '../Components/FileList';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Actions, Selectors } from '../Reducers/FileExplorerReducer'
import Icon from "../Components/Icon";
import SizeCell from "../Components/SizeCell";
import ReactTable from 'react-table';
import DateCell from '../Components/DateCell';

const mapStateToProps = (state, ownProps) => {
    const path = ownProps.match.params[0] || "";
    return {
        path, 
        files:  Selectors.getFiles(state, path),
        history: ownProps.history,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadFilesByPath: (path) => dispatch(Actions.getFilesByPath(path))
    }
}

class FileExplorer extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidUpdate() {
       this.maybeLoadFiles();
    }
    componentDidMount() {
        this.maybeLoadFiles();
    }
    maybeLoadFiles() {
        if (this.props.files == null) {
            this.props.loadFilesByPath(this.props.path);
        }
    }
    render() { 
        
        const columns = [{
            Header: '',
            accessor: 'size',
            id: 'size',
            maxWidth: 60,
            Cell: row => (

                <div>
                  {row.value == 0 ? <Icon size="1x" type="FOLDER"/> : <SizeCell>{row.value}</SizeCell>}
                  <DateCell>{row.original.createdDate}</DateCell>
                </div>
            )
        }, {
            Header: 'Name',
            accessor: 'name', // String-based value accessors!
            Cell: row => (
                row.original.isDirectory ?
                <Link to={`/browse/${this.props.path}/${row.value}`}>{row.value}</Link> :
                <a href={`/api/file/download?path=${this.props.path}/${row.value}`}>{row.value}</a>
            )
        }, {
            // id: 'friendName', // Required because our accessor is not a string
            Header: 'Created',
            accessor: 'createdDate', // Custom value accessors!
            id: 'createdDate',
            show: false,
        }];
        return <ReactTable 
            data={this.props.files && this.props.files.toArray()} 
            columns={columns} 
            loading={this.props.files == null}
            minRows={0}
            getTheadThProps={() =>({style: {textAlign: 'left'}})}
            defaultSorted={[
                {
                    id: 'size',
                    desc: false,
                },
                {
                    id: "createdDate",
                    desc: true
                }]}
            className="-striped -highlight" />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);