package io.aelf.portkey

import android.app.Application
import cn.reactnative.modules.update.PushyFileProvider
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import io.aelf.core.PortKeySDKHolder

open class PortkeyReactApplication : Application(), ReactApplication {
    override fun onCreate() {
        super.onCreate()
        PortKeySDKHolder.initialize(this)
//        // Java
//        // Java
//        Pushy.update(this, object : PushyUpdateHandler() {
//            fun onUpdate(isUpdateAvailable: Boolean) {
//                if (isUpdateAvailable) {
//                    Pushy.downloadUpdate(this@MainActivity)
//                }
//            }
//
//            fun onDownload(status: DownloadStatus) {
//                if (status === DownloadStatus.Success) {
//                    Pushy.reloadBundle(this@MainActivity)
//                }
//            }
//        })
//        PushyFileProvider
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return PortKeySDKHolder.obtainNavHost(this)
    }

}
