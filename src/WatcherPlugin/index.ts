// src/WatcherPlugin/index.ts
import PluginManager from '@jbrowse/core/PluginManager';


function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default function WatcherF(pluginManager: PluginManager) {
    console.log('Installing WatcherPlugin inside WatcherF');
    const { autorun } = pluginManager.jbrequire('mobx');
    console.log('autorun:', autorun);


    const sendData = (assemblyNames, coarseDynamicBlocks, selectedTracks) => {
        console.log('Sending data to server');

        const logData = {
            assemblyNames,
            coarseDynamicBlocks,
            selectedTracks
        };

        fetch('http://0.0.0.0:8058/depictio/api/v1/jbrowse/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => console.log('Response from server:', data))
            .catch(error => console.error('Fetch error:', error));
    };

    const debouncedSendData = debounce(sendData, 1000);

    autorun(() => {
        if (pluginManager.rootModel?.session) {
            console.log('Autorun triggered');
            const assemblyNames = pluginManager.rootModel.session.assemblyNames;
            const coarseDynamicBlocks = pluginManager.rootModel.session.views.map(v => v.coarseDynamicBlocks);
            const selectedTracks = pluginManager.rootModel.session.views.map(view => ({
                viewId: view.id,
                tracks: view.tracks.map(t => t.configuration.trackId)
            }));

            debouncedSendData(assemblyNames, coarseDynamicBlocks, selectedTracks);
        }
    });
}
