export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'gxw1990**',
  database: 'api_factory',
  entities: ['dist/**/*.entity{.ts,.js}'],
  entityPrefix: 't_',
  synchronize: true,
};
