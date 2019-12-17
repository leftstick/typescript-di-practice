import { Container } from 'express-api-bootstrap'
import { IUserService, UserServiceToken, IUser } from '@/src/services/userService'
import { ViewServiceToken } from '@/src/services/viewService'

const MOCK_DATA = [
  {
    id: 1,
    email: 'howardzuo@examplepace.com',
    mobile: '15618098766',
    name: '大都督',
    position: '码农'
  },
  {
    id: 2,
    email: 'tizhang@examplepace.com',
    mobile: '18121678655',
    name: '市场小姑娘',
    position: '市场经理'
  },
  {
    id: 3,
    email: 'ssf@examplepace.com',
    mobile: '18727865654',
    name: '敏小姐姐',
    position: '程序媛'
  },
  {
    id: 4,
    email: 'crsen@examplepace.com',
    mobile: '13527765449',
    name: '马丁',
    position: '大Boss'
  },
  {
    id: 5,
    email: 'dzhang@examplepace.com',
    mobile: '13898765544',
    name: '丹大哥哥',
    position: '设计大师'
  },
  {
    id: 6,
    email: 'hunterwen@examplepace.com',
    mobile: '17599766554',
    name: '猎手Hunter',
    position: '十万个为什么'
  }
]

describe('viewService test', () => {
  it('测试：user数据都是合理正确的，并且有6条数据，并取出全部数据进行验证', async () => {
    const container = Container.of('case1')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[]>(MOCK_DATA)
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(6)
    expect(users[0].mobile).not.toBeNull()
    expect(users[0].mobile && users[0].mobile.endsWith('******')).toBeTruthy()
  })

  it('测试：user数据都是合理正确的，并且有6条数据，并取出前1条数据进行验证', async () => {
    const container = Container.of('case2')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[]>(MOCK_DATA)
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(1)

    expect(users.length).toBe(1)
    expect(users[0].mobile).not.toBeNull()
    expect(users[0].mobile && users[0].mobile.endsWith('******')).toBeTruthy()
  })

  it('测试：user数据返回null时，结果应该转换成EmptyList', async () => {
    const container = Container.of('case3')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[] | null>(null)
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(0)
  })

  it('测试：user数据返回第1条的mobile字段为不合法的156时，结果应该没有*，依旧是156', async () => {
    const container = Container.of('case4')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[] | null>([
            {
              id: 1,
              email: 'howardzuo@examplepace.com',
              mobile: '156',
              name: '大都督',
              position: '码农'
            }
          ])
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBe('156')
  })

  it('测试：user数据返回第1条的mobile字段为不合法的null时，结果应该也是null', async () => {
    const container = Container.of('case5')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[] | null>([
            {
              id: 1,
              email: 'howardzuo@examplepace.com',
              mobile: null,
              name: '大都督',
              position: '码农'
            }
          ])
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBeNull()
  })

  it('测试：user数据返回仅有1条，但期望取前3条时，结果也应该只有1条，且mobile正确处理', async () => {
    const container = Container.of('case6')
    container.set(
      UserServiceToken,
      new (class MockUserService implements IUserService {
        list(): Promise<IUser[] | null> {
          return Promise.resolve<IUser[] | null>(MOCK_DATA.slice(0, 1))
        }
      })()
    )
    const viewService = container.get(ViewServiceToken)
    const users = await viewService.getUsersWithPhoneMarked(3)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBe('15618******')
  })
})
