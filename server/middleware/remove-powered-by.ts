import { removeResponseHeader } from 'h3';

export default defineEventHandler((event) => {
  removeResponseHeader(event, 'x-powered-by');
});
