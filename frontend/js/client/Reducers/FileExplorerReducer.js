import { createSelector } from 'reselect';
import {fromJS, List} from "immutable";
import Request from '../Common/Request';
import File from '../../common/objects/File';

const ERROR_PLACEHOLDER = List([ {name: "UNEXPECTED ERROR"}]);

//SELECTORS
const initialState = fromJS({
    errorState: false,
    fileCache: {

    },
});

const getFileExplorerState = state => state.fileExplorer || state;
const getFileCacheKey = (state, pathCacheKey) => pathCacheKey;
const getErrorState = createSelector(getFileExplorerState, s => s.get('errorState'));
const getFileCache = createSelector(getFileExplorerState, s => s.get('fileCache'));
const getFiles = createSelector([getFileCache, getErrorState,  getFileCacheKey], (fileCache, errorState, pathKey) => {
    if (errorState) {
        return ERROR_PLACEHOLDER;
    }
    return fileCache.get(pathKey);
});

export const Selectors = {
    getFiles: getFiles,
}

// ACTIONS
const CACHE_FILES = "FILE_EXPLORER/CACHE_FILES";
const UNEXPECTED_ERROR = "FILE_EXPLORER/UNEXPECTED_ERROR";

const cacheFiles = (cacheKey, files) => ({
    type: CACHE_FILES,
    payload: {cacheKey, files}
});

const unexpectedError = () => ({
    type: UNEXPECTED_ERROR
});

const getFilesByPath = path => dispatch => {
    return Request.xhr.get(`/api/file/view?path=${path}`)
    .then(({data}) => {
        dispatch(cacheFiles(path, List(data.file)));
    })
    .catch(() => {
        dispatch(unexpectedError());
    });
}

export const Actions = {
    getFilesByPath: getFilesByPath,
}

// REDUCER
export default function FileExplorerReducer(state = initialState, action) {
    switch(action.type) {
        case CACHE_FILES:
            return state.setIn(['fileCache', action.payload.cacheKey], action.payload.files);
        case UNEXPECTED_ERROR:
            return state.set('errorState', true);
    }

    return state;
}

