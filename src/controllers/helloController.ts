import { HttpRequest, RestController, GetMapping, Inject } from 'express-api-bootstrap'
import { IViewService, ViewServiceToken } from '@/src/services/viewService'

@RestController()
class HelloControler {

    @Inject(ViewServiceToken)
    viewService: IViewService


  @GetMapping('/hello')
  sayHello(req: HttpRequest) {
    return this.viewService.getUsersWithPhoneMarked(req.query['top'])
  }
}

export default HelloControler