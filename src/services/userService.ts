import { Token, Service } from 'express-api-bootstrap'
import { Database, verbose } from 'sqlite3'

const sqlite3 = verbose()

export interface IUser {
  id: number
  email: string
  mobile: string | null
  name: string
  position: string
}

export interface IUserService {
  list(): Promise<IUser[] | null>
}

export const UserServiceToken = new Token<IUserService>()

@Service(UserServiceToken)
export class UserService implements IUserService {
  database: Database = new Database(':memory:')

  constructor() {
    this.database.serialize(() => {
      this.database.run(CREATE_TABLE)
      INIT_DATA.forEach(sql => {
        this.database.run(sql)
      })
    })
  }

  list(): Promise<IUser[] | null> {
    return new Promise<IUser[]>((resolve, reject) => {
      this.database.all('select * from user', (err, rows) => {
        if (err) {
          return reject(err)
        }
        if (!rows) {
          return resolve(rows)
        }
        resolve(
          rows.map(row => {
            return <IUser>{
              id: row['id'],
              name: row['name'],
              mobile: row['mobile'],
              position: row['position'],
              email: row['email']
            }
          })
        )
      })
    })
  }
}

const CREATE_TABLE = `
CREATE TABLE user (
    id int PRIMARY KEY,
    email text UNIQUE,
    mobile text,
    name text,
    position text
)
`

const INIT_DATA = [
  `INSERT INTO user (id, email, mobile, name, position) VALUES (1, 'howardzuo@examplepace.com', '15618909876', '大都督', '码农')`,
  `INSERT INTO user (id, email, mobile, name, position) VALUES (2, 'tzhang@examplepace.com', '18121665567', '市场小姑娘', '市场经理')`,
  `INSERT INTO user (id, email, mobile, name, position) VALUES (3, 'hmwss@examplepace.com', '18727233245', '敏小姐姐', '程序媛')`,
  `INSERT INTO user (id, email, mobile, name, position) VALUES (4, 'csen@examplepace.com', '13524565757', '马丁', '大Boss')`,
  `INSERT INTO user (id, email, mobile, name, position) VALUES (5, 'dhang@examplepace.com', '13866531124', '丹大哥哥', '设计大师')`,
  `INSERT INTO user (id, email, mobile, name, position) VALUES (6, 'hunter@examplepace.com', '17500098765', '猎手Hunter', '十万个为什么')`
]
