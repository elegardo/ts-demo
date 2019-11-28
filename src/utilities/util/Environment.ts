/* eslint-disable */
export default class Environment {
  private _map: Map<string, string | undefined>;

  constructor() {
    this._map = new Map<string, string | undefined>();
    this._map.set('LOG_LEVEL', process.env.LOG_LEVEL);
    this._map.set('DB_USER', process.env.DB_USER);
    this._map.set('DB_HOST', process.env.DB_HOST);
    this._map.set('DB_DATABASE', process.env.DB_DATABASE);
    this._map.set('DB_PASSWORD', process.env.DB_PASSWORD);
    this._map.set('DB_PORT', process.env.DB_PORT);
  }

  get(name: string): string | undefined {
    return this._map.get(name);
  }

  getAll(): Map<string, string | undefined> {
    return this._map;
  }
}
