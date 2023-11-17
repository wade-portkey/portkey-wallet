package io.aelf.portkey.demo.ui

import android.app.Activity
import android.app.Application
import android.graphics.Color
import android.os.Bundle
import android.view.ViewGroup
import android.widget.TextView
import com.facebook.react.ReactActivity
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.tencent.mmkv.MMKV
import io.aelf.portkey.BuildConfig
import io.aelf.portkey.components.logic.PortkeyReactNativeHost
import io.aelf.portkey.components.logic.hostInstance
import io.aelf.portkey.config.StorageIdentifiers
import io.aelf.portkey.demo.DemoStorage
import io.aelf.portkey.tools.dp

class PortkeyReactApplication : Application(), ReactApplication {

    override fun onCreate() {
        super.onCreate()
        MMKV.initialize(this)
        registerActivityLifecycleCallbacks(object : ActivityLifecycleCallbacks{
            override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
                if(!DemoStorage.isDevMode()){
                    return
                }
                if(activity is ReactActivity){
                    addInfoRect(activity)
                }
            }

            override fun onActivityStarted(activity: Activity) {
            }

            override fun onActivityResumed(activity: Activity) {
            }

            override fun onActivityPaused(activity: Activity) {
            }

            override fun onActivityStopped(activity: Activity) {
            }

            override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {
            }

            override fun onActivityDestroyed(activity: Activity) {
            }

        })
    }
    private fun addInfoRect(activity: Activity) {
        val textView = TextView(activity)
        val layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        textView.setPadding(20.dp,40.dp, 20.dp,10.dp)
        val pageName = activity.intent.getStringExtra(StorageIdentifiers.PAGE_ENTRY)
            ?: "unknown page"
        textView.text = pageName
        textView.textSize = 10f.dp
        textView.setBackgroundColor(Color.parseColor("#6680D8FF"))
        (activity.window.decorView as ViewGroup).addView(textView, layoutParams)
    }

    override fun getReactNativeHost(): ReactNativeHost {
            return hostInstance ?: createNewHost()
    }

    private fun createNewHost(): PortkeyReactNativeHost {
        val nativeHost = PortkeyReactNativeHost(
            application = this,
            isDebug = BuildConfig.IS_DEBUG
        )
        nativeHost.reactInstanceManager.createReactContextInBackground()
        return  nativeHost
    }

}
