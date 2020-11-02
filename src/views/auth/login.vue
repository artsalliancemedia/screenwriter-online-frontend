<template>
  <v-app>
    <v-icon color="grey darken-3" class="pa-8 logo">adi-brand-aam-text</v-icon>
    <v-row no-gutters>
      <v-col md="6">
        <v-card class="d-flex flex-column justify-center align-center" height="100%">
          <form class="pa-16 loginForm col-lg-8" @submit.prevent="submit" autocomplete="off">
            <div class="hidden-md-and-up d-flex d-md-none justify-center align-center mb-4">
              <v-img
                :src="$logo"
                width="48"
                height="48"
                max-height="48"
                max-width="48"
                class="mr-sm-4"
              />
              <div class="text-h4 hidden-xs-only">SCREENWRITER</div>
            </div>
            <h5 class="text-center text-sm-h4 mb-4 first-capitalize">{{ $t('word.log_in') }}</h5>
            <p class="text-center text--secondary">{{ $t('sentence.login') }}</p>
            <v-text-field
              v-model="form.name"
              :label="$tc('word.typeName', 2, { type: $tc('word.user', 1) })"
              :error-messages="nameErrors"
              @input="$v.form.name.$touch()"
              @blur="$v.form.name.$touch()"
              :disabled="loading"
            />
            <v-text-field
              v-model="form.password"
              :label="$t('word.password')"
              type="password"
              :error-messages="passwordErrors"
              @input="$v.form.password.$touch()"
              @blur="$v.form.password.$touch()"
              :disabled="loading"
            />
            <v-alert
              border="left"
              type="error"
              colored-border
              v-show="authSource.message"
              elevation="2"
              icon="adi-warning"
              class="mt-4"
              >{{ authSource.message }}</v-alert
            >
            <VueRecaptcha
              v-if="isProd"
              language="en"
              :loadRecaptchaScript="true"
              :recaptchaHost="recaptchaHost"
              style="margin-bottom: 10px"
              ref="recaptcha"
              size="invisible"
              @expired="onCaptchaExpired"
              @verify="onCaptchaVerified"
              sitekey="6LdEgrEZAAAAALZeefZrRAjHcxwGOkAxsY0d7dY_"
            />
            <v-btn
              color="primary"
              class="mt-8 text-capitalize"
              block
              x-large
              type="submit"
              :loading="loading"
              >{{ $t('word.login') }}</v-btn
            >
            <div class="d-flex justify-center">
              <a
                class="text-capitalize text-center mt-8 d-block font-weight-bold"
                @click="gotoForgotten"
                >{{ $t('phrase.forgotten_password') }}</a
              >
            </div>
          </form>
        </v-card>
      </v-col>
      <v-col md="6" class="hidden-sm-and-down">
        <div class="rightWrapper d-flex overflow-hidden">
          <div
            class="d-flex flex-column content align-center justify-center pa-16"
            style="z-index: 2"
          >
            <v-img
              :src="$logoWhite"
              max-width="120"
              width="120"
              height="120"
              max-height="120"
              class="mb-4"
            />
            <div class="white--text mb-4 text-h3 font-weight-black">SCREENWRITER</div>
            <p class="white--text">{{ $t('sentence.hub') }}</p>
          </div>
          <svg class="login-main-icon" preserveAspectRatio="none" viewBox="0 0 700 900">
            <path
              class="login-main-icon__shape"
              d="M189.319206,916 L0,916 L0,0 L351.470908,0
           L682.766056,916 L422.477063,916 L318.870755,637.728928
           C316.794754,631.883405 311.425747,628 305.420014,628 C299.414282,628 294.045275,631.883405 291.969274,637.728928 L189.319206,916 Z"
            />
          </svg>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import { verifyReCAPTCHA } from '@/api/base';
import Configuration from '@/Configuration';

@Component
export default class Login extends Vue {
  loading = false;

  message = '';

  lng = navigator.language;

  env = Configuration('env');

  form = {
    name: '',
    password: '',
  };

  recaptchaHost =
    ((this.lng === 'zh' || this.lng === 'zh-CN') && 'www.recaptcha.net') || 'www.google.com';

  @Validations()
  validations = {
    form: {
      name: { required },
      password: { required },
    },
  };

  get isProd() {
    return this.env === 'staging' || this.env === 'production';
  }

  get authSource() {
    return this.$store.getters['auth/authSource'];
  }

  get nameErrors() {
    const errors = [];
    if (!this.$v.form.name.$dirty) return errors;
    if (!this.$v.form.name.required) {
      errors.push(
        this.$tc('phrase.typeRequired', 1, {
          type: this.$tc('word.typeName', 2, { type: this.$tc('word.user', 1) }),
        })
      );
    }
    return errors;
  }

  get passwordErrors() {
    const errors = [];
    if (!this.$v.form.password.$dirty) return errors;
    if (!this.$v.form.password.required) {
      errors.push(this.$tc('phrase.typeRequired', 1, { type: this.$t('word.password') }));
    }
    return errors;
  }

  submit() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (this.isProd) {
        this.$refs.recaptcha.execute();
      } else {
        this.login();
      }
    }
  }

  async login() {
    const { name, password } = this.form;
    this.loading = true;
    const data = {
      username: name,
      password,
    };
    await this.$store.dispatch('auth/login', data);
    this.loading = false;
  }

  onCaptchaVerified(recaptchaToken) {
    const vm = this;
    verifyReCAPTCHA({ recaptchaToken })
      .then(response => {
        vm.verify = response.success;
        vm.login();
      })
      .catch(error => {
        this.message = error.message;
      });
    vm.$refs.recaptcha.reset();
  }

  onCaptchaExpired() {
    this.$refs.recaptcha.reset();
  }

  gotoForgotten() {
    this.$router.push('/reset');
  }
}
</script>
<style scoped lang="scss">
.logo {
  position: absolute;
  z-index: 2;
}
.loginForm {
  width: 100%;
}
.rightWrapper {
  position: relative;
  background-color: #0f270f;
  height: 100%;
  .content {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
.login-main-icon {
  position: absolute;
  z-index: 1;
  margin-right: auto;
  fill: $primary;
  height: 100vh;
}
</style>
