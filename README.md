# typescript-di 小练习

观察 `viewServiceWithNew.Test.ts` 和 `viewService.Test.ts` 两个测试用例，他们测试的是一模一样的功能 `viewService2.ts` 和 `viewService.ts`。

区别在于 `viewService2.ts` 里对 `userService.ts` 的引用方式是 `new`。 `viewService.ts` 里对 `userService.ts` 的引用方式是依赖注入。

让后试试看能否在不改源码的情况下使 `viewServiceWithNew.Test.ts` 里的测试用例通过

## 运行全部测试用例

```bash
yarn test
```

## 运行指定测试用例

```bash
yarn test viewService.test.ts
```

## 调试指定测试用例

使用 `cmd + shift + d` 打开 `DEBUG` 窗口，然后在左上方的配置选择那选择 `test specific` , 最后打开你想要的测试用例，按下 `F5` 就可以了
