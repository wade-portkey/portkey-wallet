package io.aelf.portkey.tools

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import com.google.gson.JsonElement
import io.aelf.portkey.components.activities.entered
import io.aelf.portkey.components.logic.JSEventBus
import io.aelf.portkey.components.services.GeneralJSMethodService

internal fun generateUniqueCallbackID(): String {
    return System.currentTimeMillis().toString() + Math.random().toString()
}


fun callCaContractMethodTest(applicationContext: Context, callback: (JSMethodData) -> Unit = {}) {
    val bundle = Bundle()
    bundle.putString("contractMethodName", "GetVerifierServers")
    bundle.putBoolean("isViewMethod", false)
    callJsMethod(applicationContext, "callCaContractMethod", bundle, callback)
}

fun runTestCases(applicationContext: Context, callback: (JSMethodData) -> Unit = {}) {
    val bundle = Bundle()
    callJsMethod(applicationContext, "runTestCases", bundle, callback)
}

internal fun callJsMethod(
    applicationContext: Context,
    taskName: String,
    bundle: Bundle = Bundle(),
    callback: (JSMethodData) -> Unit = {}
) {
    if (!entered) {
        Toast.makeText(
            applicationContext,
            "Enter a react-native page at least once.",
            Toast.LENGTH_LONG
        ).show()
        return
    }
    bundle.putString("taskName", taskName)
    val callbackId = generateUniqueCallbackID()
    bundle.putString("eventId", callbackId)
    JSEventBus.registerCallback(callbackId, callback, JSMethodData::class.java)
    val service = Intent(applicationContext, GeneralJSMethodService::class.java)
    service.putExtras(bundle)
    applicationContext.startService(service)
}

data class JSMethodData(
    val status: String, //  'success' | 'fail'
    val transactionId: String,
    val data: JsonElement,
    val error: JsonElement
)

