import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'club.refr.biz',
  appName: 'Refr Business',
  webDir: 'dist/vendor',
  bundledWebRuntime: false,
  plugins:{

    GoogleAuth: {
      scopes: [ "profile", "email" ],
      serverClientId: "471641178783-poa1lb0fjdv7amnvh5ntftepaskgohh2.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }

  }
};

export default config;
