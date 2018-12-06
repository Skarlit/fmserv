import React from "react";
import 'react-table/react-table.css';
import {withRouter} from 'react-router'
import { connect } from 'react-redux';
import FileList from '../Components/FileList';
import { encodeURIString, reactRouterLinkEncodeURIString } from "../../common/utils/Utility";
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
            Header: 'S',
            accessor: 'size',
            id: 'size',
            maxWidth: 38,
            Cell: row => (
                row.original.isDirectory ? <Icon size="1x" type="FOLDER"/> : <SizeCell>{row.value}</SizeCell>
            ),
        }, {
            // id: 'friendName', // Required because our accessor is not a string
            Header: 'D',
            accessor: 'createdDate', // Custom value accessors!
            id: 'createdDate',
            maxWidth: 38,
            Cell: row => <DateCell>{row.original.createdDate}</DateCell>
        }, {
            Header: 'Dir',
            show: false,
            accessor: 'isDirectory',
            id: 'isDir',
            sortMethod: (a, b) => {
                if (a && b) {
                    return 0
                }
                if (a) return 1;
                if (b) return -1;
            }
        }, {
            Header: 'Name',
            accessor: 'name', // String-based value accessors!
            style: {
                fontSize: '10px',
            },
            Cell: row => {
                return row.original.isDirectory ?
                <Link to={`/browse/${this.props.path}/${reactRouterLinkEncodeURIString(row.value)}`} >{row.value}</Link> :
                <a href={`/api/file/download?path=${this.props.path}/${encodeURIString(row.value)}`}>{row.value}</a>
            }
        }];
        return <ReactTable 
            data={this.props.files && this.props.files.toArray()} 
            columns={columns} 
            loading={this.props.files == null}
            minRows={0}
            getTheadThProps={() =>({style: {textAlign: 'left'}})}
            sorted={[
                {
                    id: 'isDir',
                    desc: true,
                },
            ]}
            defaultSorted={[
                {
                    id: 'isDir',
                    desc: true,
                },
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileExplorer));