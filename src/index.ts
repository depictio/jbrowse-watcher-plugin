// src/index.ts
import Plugin from '@jbrowse/core/Plugin';
import PluginManager from '@jbrowse/core/PluginManager';

//locals 
import { version } from '../package.json'
import WatcherF from './WatcherPlugin';
import { configure } from 'mobx';

export default class WatcherPlugin extends Plugin {
  name = 'WatcherPlugin';
  version = version;

  install() {
    // console.log('Installing WatcherPlugin');
    // WatcherF(pluginManager);
  }
  
  configure(pluginManager: PluginManager) {
    console.log('Installing WatcherPlugin');
    WatcherF(pluginManager);
  }

}
