import { Container } from 'express-api-bootstrap'
import { ViewService2Token } from '@/src/services/viewService2'

describe('viewService test', () => {
  it('测试：user数据都是合理正确的，并且有6条数据，并取出全部数据进行验证', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(6)
    expect(users[0].mobile).not.toBeNull()
    expect(users[0].mobile && users[0].mobile.endsWith('******')).toBeTruthy()
  })

  it('测试：user数据都是合理正确的，并且有6条数据，并取出前1条数据进行验证', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(1)

    expect(users.length).toBe(1)
    expect(users[0].mobile).not.toBeNull()
    expect(users[0].mobile && users[0].mobile.endsWith('******')).toBeTruthy()
  })

  it('测试：user数据返回null时，结果应该转换成EmptyList', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(0)
  })

  it('测试：user数据返回第1条的mobile字段为不合法的156时，结果应该没有*，依旧是156', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBe('156')
  })

  it('测试：user数据返回第1条的mobile字段为不合法的null时，结果应该也是null', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(null)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBeNull()
  })

  it('测试：user数据返回仅有1条，但期望取前3条时，结果也应该只有1条，且mobile正确处理', async () => {
    const viewService = Container.get(ViewService2Token)
    const users = await viewService.getUsersWithPhoneMarked(3)

    expect(users.length).toBe(1)
    expect(users[0].mobile).toBe('15618******')
  })
})
