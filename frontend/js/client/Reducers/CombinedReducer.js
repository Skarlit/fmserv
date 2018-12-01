import { combineReducers } from 'redux';
import FileExplorerReducer from './FileExplorerReducer';

export const getCombinedReducer = () => combineReducers({
    fileExplorer: FileExplorerReducer
});