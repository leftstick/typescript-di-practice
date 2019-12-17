import { Token, Service, Inject } from 'express-api-bootstrap'
import {
  IUser,
  UserServiceToken,
  IUserService
} from '@/src/services/userService'

export interface IViewService {
  getUsersWithPhoneMarked(top: number | null): Promise<IUser[]>
}

export const ViewServiceToken = new Token<IViewService>()

@Service(ViewServiceToken)
export class ViewService implements IViewService {
  @Inject(UserServiceToken)
  userService: IUserService

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
