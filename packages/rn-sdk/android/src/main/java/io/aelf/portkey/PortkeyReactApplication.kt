package io.aelf.portkey

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import io.aelf.core.PortKeySDKHolder

open class PortkeyReactApplication : Application(), ReactApplication {
    override fun onCreate() {
        super.onCreate()
        PortKeySDKHolder.initialize(this)
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return PortKeySDKHolder.obtainNavHost(this)
    }

}
