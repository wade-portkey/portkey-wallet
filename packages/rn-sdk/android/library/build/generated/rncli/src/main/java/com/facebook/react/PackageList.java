
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @invertase/react-native-apple-authentication
import com.RNAppleAuthentication.AppleAuthenticationAndroidPackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// expo
import expo.modules.ExpoModulesPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-config
import com.lugg.RNCConfig.RNCConfigPackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-localize
import com.zoontek.rnlocalize.RNLocalizePackage;
// react-native-mmkv
import com.reactnativemmkv.MmkvPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-spinkit
import com.react.rnspinkit.RNSpinkitPackage;
// react-native-spring-scrollview
import com.bolan9999.SpringScrollViewPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AppleAuthenticationAndroidPackage(),
      new AsyncStoragePackage(),
      new RNGoogleSigninPackage(),
      new ExpoModulesPackage(),
      new LottiePackage(),
      new BackgroundTimerPackage(),
      new RNCConfigPackage(),
      new FastImageViewPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new RNLocalizePackage(),
      new MmkvPackage(),
      new PagerViewPackage(),
      new SafeAreaContextPackage(),
      new RNSpinkitPackage(),
      new SpringScrollViewPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage()
    ));
  }
}
