<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: !loginmode_pwd }"
            @click="toggle_loginmode"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: loginmode_pwd }"
            @click="toggle_loginmode"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form action="javascript:;">
          <div :class="{ on: !loginmode_pwd }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <!-- disabled="disabled" -->
              <button
                class="get_verification"
                :class="{ black: phoneOk && timecount == 0 }"
                @click="send_code"
                :disabled="!phoneOk || timecount != 0"
              >
                {{
                  timecount == 0
                    ? "获取验证码"
                    : "已发送 (" + (timecount - 1) + ")"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: loginmode_pwd }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="sb_on ? 'tel' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="sb_on ? 'on' : 'off'"
                  @click="sb_on = !sb_on"
                >
                  <div
                    class="switch_circle"
                    :class="sb_on ? 'on_' : 'off_'"
                  ></div>
                  <span class="switch_text">{{ sb_on ? "abc" : "" }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getcaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqLogin_pwd, reqLogin_sms, reqSendcode, reqUserinfo } from "../../api";
import { MessageBox } from "mint-ui";

// Vue.use(MessageBox)

export default {
  data() {
    return {
      loginmode_pwd: true, //true为账号密码登录
      sb_on: false,
      timecount: 0,
      timer: null,
      name: "",
      pwd: "",
      captcha: "",
      code: "",
      phone:"",
    };
  },
  computed: {
    ...mapState(["user"]),
    phoneOk() {
      // console.log("test");
      let phone = this.phone;
      // let timecount = this.timecount;
      let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (reg.test(phone)) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    //切换登录方式
    toggle_loginmode() {
      this.loginmode_pwd = !this.loginmode_pwd;
    },
    //登录入口函数
    login() {
      if (this.loginmode_pwd) {
        //前台检验，短信验证方式
        if (!this.name) {
          //请输入用户名
          MessageBox("请输入用户名");
        } else if (!this.pwd) {
          //请输入密码
          MessageBox("请输入密码");
        } else if (!this.captcha) {
          //请输入验证码
          MessageBox("请输入验证码");
        } else {
          this.login_pwd();
        }
      } else {
        //前台检验，账号密码方式
        //验证提示
        if (!this.phoneOk) {
          //手机号不正确
          MessageBox("手机号不正确");
        } else if (this.code.length != 6) {
          //验证码需要六位数字
          MessageBox("验证码需要六位数字");
        } else {
          this.login_sms();
        }
      }
    },

    //账号密码登录
    async login_pwd() {
      const req = await reqLogin_pwd({
        name: this.name,
        pwd: this.pwd,
        captcha: this.captcha,
      });
      // console.log(req.data);
      if (req.code == 0) {
        this.inint_afterlogin(req.data);
      } else {
        MessageBox("登录失败");
        this.getcaptcha();
      }
    },

    //手机验证码登录
    async login_sms() {
      const req = await reqLogin_sms(this.phone, this.code);
      console.log(req.data);
      if (req.code == 0) {
        this.inint_afterlogin(req.data);
        if (this.timer) {
          this.timecount = 0;
          clearInterval(this.timer);
          this.timer = null;
        }
      } else {
        MessageBox("登录失败");
      }
    },

    //给手机发验证码
    async send_code() {
      let msg = await reqSendcode(this.phone);
      console.log(msg);
      if (!msg.code) {
        //倒计时
        this.timecount = 31;
        this.timer = setInterval(() => {
          this.timecount--;
          console.log(this.timecount);
          if (this.timecount == 0) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      } else {
        MessageBox("短信验证码发送失败");
      }
    },

    //登陆以后，记录token，更新foodCategorys,shops
    inint_afterlogin(user) {
      // this.reqUserinfo()
      // this.$store.dispatch("updateToken", token);
      this.$store.dispatch("recorduser", user);
      this.$store.dispatch("getcategorys");
      this.$store.dispatch("getshops");
      this.$router.push("/msite");
    },
    //得到图形验证码
    getcaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
    //获得用户信息
    async reqUserinfo() {
      let req = await reqUserinfo();
      console.log(req);
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.black {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              .switch_circle {
                position: absolute;
                top: -1px;
                // left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                // transition: transform 0.3s;
                transition: left 0.3s;

                &.on_ {
                  left: 29px;
                }

                &.off_ {
                  left: -1px;
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>