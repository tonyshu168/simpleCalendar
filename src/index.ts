import SimpleCalendar from './components/Calendar/index.vue';
import type { App } from 'vue';

const components = [SimpleCalendar];

export function install(app: App) {
  components.forEach(component => {
    app.component(component.name ? component.name : '', component);
  })
}

export default {
  install
}

export {
  SimpleCalendar
}