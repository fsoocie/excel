import {storage} from '@core/utils';

function toStorageName(hash) {
  return 'excel:'+hash
}

export class LocalStorageClient {
  constructor(name) {
    this.name = toStorageName(name)
  }
  get() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(storage(this.name))
      }, 1000)
    })
  }
  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }
}
