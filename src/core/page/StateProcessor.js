import {debounce} from '@core/utils';

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen, delay).bind(this)
  }
  listen(state) {
    this.client.save(state)
  }
  get() {
    return this.client.get()
  }
}
