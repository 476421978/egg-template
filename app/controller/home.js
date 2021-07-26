'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 登录签发token
  async Login() {
    const { ctx, app } = this;
    const { jwt } = app;
    try {
      let minaToken = jwt.sign(
        {
          account: 'mina',
        },
        app.config.signInfo.minaSecretTitle,
        {
          expiresIn: '24h',
        }
      );
      ctx.success(minaToken);
    } catch (error) {
      ctx.fail(error);
    }
  }

  // 测试egg-joi
  async GetJoi() {
    const { ctx, app } = this;
    const res = ctx.JoiValidate('GetUserIdentity');
    if (!res) return;
    try {
      ctx.success(res);
    } catch (error) {
      ctx.fail(error);
    }
  }

  // 测试
  async Index() {
    const { app, ctx, service } = this;
    const { userInfo, shoppingCart } = service;
    const x = await shoppingCart.findOne(
      {
        id: '002',
      },
      [
        {
          model: this.app.model.UserInfo,
          attributes: ['id', 'name'],
        },
      ],
      [],
      {
        attributes: ['id'],
      }
    );
    // findAll
    const xx = await shoppingCart.findAll();
    // findByPk
    const xxx = await shoppingCart.findByPk('001');
    // findAndCountAll
    const xxxx = await shoppingCart.findAndCountAll({}, [], [], {
      Offset: 1,
      limit: 1,
    });
    // findOrCreate
    const xxxxx = await shoppingCart.findOrCreate(
      {
        id: '004',
      },
      {
        t_price: 100,
      }
    );
    // count
    const xxxxxx = await shoppingCart.count();

    // ===================================
    const params = {
      name: 'create',
      age: 0,
    };
    // 更新 update
    const up = await userInfo.update(
      { age: 1 },
      {
        name: params.name,
      }
    );
    // 删除 destroy
    const des = await userInfo.destroy({
      name: params.name,
    });
    // 增加 create
    const addUser = userInfo.create({
      name: params.name,
      age: params.age,
    });

    ctx.success({
      findOne: x,
      findAll: xx,
      findByPk: xxx,
      findAndCountAll: xxxx,
      findOrCreate: xxxxx,
      count: xxxxxx,
      up: up,
      des: des,
      addUser: addUser,
    });
  }
}

module.exports = HomeController;
