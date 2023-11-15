package io.aelf.portkey.tools

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import io.aelf.portkey.components.activities.entered
import io.aelf.portkey.components.logic.JSEventBus
import io.aelf.portkey.components.services.GeneralJSMethodService

internal fun generateUniqueCallbackID(): String {
    return System.currentTimeMillis().toString() + Math.random().toString()
}


fun startJSBackgroundTaskTest(applicationContext: Context, callback: (JSMethodData) -> Unit = {}) {
    if (!entered) {
        Toast.makeText(
            applicationContext,
            "Enter a react-native page at least once.",
            Toast.LENGTH_LONG
        ).show()
        return
    }
    val methodName = "callContractMethod"
    val service = Intent(applicationContext, GeneralJSMethodService::class.java)
    val bundle = Bundle()
    val callbackId = generateUniqueCallbackID()
    bundle.putString("methodName", methodName)
    bundle.putString("eventId", callbackId)
    bundle.putBoolean("isViewMethod", false)
    bundle.putBundle("params", Bundle().apply {
        putString("contractAddress", "2.0.0")
        putString("methodName", "GetBlockHeight")
    })
    service.putExtras(bundle)
    JSEventBus.registerCallback(callbackId, callback, JSMethodData::class.java)
    applicationContext.startService(service)
}

data class JSMethodData(
    val data: Any
)
