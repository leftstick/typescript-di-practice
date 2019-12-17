import { Token, Service } from 'express-api-bootstrap'
import { IUser, UserService } from '@/src/services/userService'

export interface IViewService2 {
  getUsersWithPhoneMarked(top: number | null): Promise<IUser[]>
}

export const ViewService2Token = new Token<IViewService2>()

@Service(ViewService2Token)
export class ViewService2 implements IViewService2 {
  userService = new UserService()

  async getUsersWithPhoneMarked(top: number | null): Promise<IUser[]> {
    let users = await this.userService.list()

    if (!users || !users.length) {
      return []
    }

    if (top) {
      users = users.slice(0, top > users.length ? users.length : top)
    }

    return users.map(user => {
      const u = {
        ...user
      }
      if (user.mobile) {
        u.mobile = user.mobile.replace(/[0-9]{6}$/, '******')
      }
      return u
    })
  }
}
