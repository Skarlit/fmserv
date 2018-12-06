import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { reactRouterLinkEncodeURIString } from '../../common/utils/Utility';

class FileExplorerMenu extends React.Component {
    render() {
        let path = `/yt/${reactRouterLinkEncodeURIString(this.props.match.params[0] || "")}`;
        return <div>
            <Link to={path}>Youtube</Link>
        </div>
    }
}

export default FileExplorerMenu;