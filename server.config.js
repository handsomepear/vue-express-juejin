import path from 'path'

export default {
  port: 3000,
  host: '127.0.0.1',
  staticPaths: [path.join(__dirname, 'dist'), path.join(__dirname, 'src/static')],
  secret:'juejinzps'
}