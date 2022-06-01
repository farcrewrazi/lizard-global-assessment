import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    // this.get('/posts/:id', (schema, request) => {
    //   console.log('yeah')
    //   // return data.find(request.params.id)
    //   // return data.findBy({ id: request.params.id });
    // });
  },
});
