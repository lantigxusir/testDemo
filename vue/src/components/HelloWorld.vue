<template>
  <div class="hello">
    <div v-if="flag">
      <div class="login">
        <form>
          <label>
            账号:<input type="text" class="user_name" v-model='name'>
          </label>
          <label>密码:<input type="password" class="user_pas" v-model='pas'></label>
          <label>
            <button @click="loginForm">立即登录</button>
          </label>
        </form>
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;" @click="go_login">立即注册</a>
      </div>
    </div>
    <div v-else>
      <div class="go-login">
        <form action="">
          <label>
            账号:<input type="text" class="login_name" v-model="name" @blur="setText" vulue="">
          </label>
          <label>
            密码:<input type="password" class="login_pas" v-model="pas">
          </label>
          <label>
            <button @click="submitForm">注册</button>
          </label>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        flag: true,
        name: '',
        pas: ''
      }
    },
    methods: {
      go_login() {
        this.flag = false;
      },
      submitForm(event) {
        event.preventDefault();
        if (this.name != '' && this.pas != '') {
          this.$http.get('http://localhost:3000/users', {
            params: {
              userName: this.name,
              password: this.pas
            }
          }).then(response => {
            alert(response.data);
            this.flag = true;
          }, response => {
            console.log("error");
          });
        } else {
          alert('请输入账号或密码');
        }

      },
      loginForm(e) {
        e.preventDefault();
        if (this.name != '' && this.pas != '') {
          this.$http.get('http://localhost:3000/goData', {
            params: {
              userName: this.name,
              password: this.pas
            }
          }).then(response => {
            alert(response.data);
            this.flag = true;
          }, response => {
            console.log("error");
          })
        } else {
          alert('请输入正确的账号和密码')
        }
      },
      setText() {
        this.$http.get('http://localhost:3000/setText', {
          params: {
            userName: this.name,
          }
        }).then(response => {
          if (response.data != "success") {
            alert(response.data);
          }
        }, response => {
          console.log("error");
        });
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
