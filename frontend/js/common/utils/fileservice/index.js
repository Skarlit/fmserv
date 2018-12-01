const FileTreeService = require('./filetree/FileTreeService');
const RawAccessService = require('./RawAccessService');

let serviceInstance;

module.exports = {
    startService: async (strategy, opts={}) => {
        switch(strategy) {
            case 'FILE_TREE':
                serviceInstance = new FileTreeService();
                break;
            default:
                serviceInstance = new RawAccessService();
        }
        await serviceInstance.init(opts);
        return serviceInstance;
    },
    getServiceInstance: () => {
        if (!serviceInstance) {
            throw 'Need to start service first';
        }
        return serviceInstance;
    }
}