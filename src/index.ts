// src/index.ts
import Plugin from '@jbrowse/core/Plugin';
import PluginManager from '@jbrowse/core/PluginManager';

//locals 
import { version } from '../package.json'
import WatcherF from './WatcherPlugin';

export default class WatcherPlugin extends Plugin {
  name = 'WatcherPlugin';
  version = version;

  install(pluginManager: PluginManager) {
    WatcherF(pluginManager);
  }
}
