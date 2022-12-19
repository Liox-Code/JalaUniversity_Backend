// // test/fixtures/inversify.unit-config.ts
// import 'reflect-metadata'
// import { Container, inject, injectable } from 'inversify'
// import { TYPES } from '../src/type.core'
// import { BoardEntity } from '../src/entities/board.entity'

// // instead of importing the injectable classes from src,
// // import mocked injectables from a set of text fixtures.
// // For brevity, I defined mocks inline here, but you would
// // likely want these in their own files.

// @injectable()
// class TestKatana implements Weapon {
//   public hit () {
//     return 'TEST cut!'
//   }
// }

// @injectable()
// class TestShuriken implements ThrowableWeapon {
//   public throw () {
//     return 'TEST hit!'
//   }
// }

// @injectable()
// class TestNinja implements Warrior {
//   private _katana: Weapon
//   private _shuriken: ThrowableWeapon

//   public constructor (
//     @inject(TYPES.Weapon) katana: Weapon,
//     @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
//   ) {
//     this._katana = katana
//     this._shuriken = shuriken
//   }

//   public fight () { return this._katana.hit() }
//   public sneak () { return this._shuriken.throw() }
// }

// const myContainer = new Container()
// myContainer.bind<FoodService>(TYPES.FoodService).to(FoodService)

// export { myContainer }
