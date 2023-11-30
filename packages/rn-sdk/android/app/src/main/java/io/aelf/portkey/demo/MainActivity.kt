package io.aelf.portkey.demo

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import io.aelf.core.PortkeyEntries
import io.aelf.portkey.components.logic.PortkeyMMKVStorage
import io.aelf.portkey.demo.ui.composable.ChoiceMaker
import io.aelf.portkey.demo.ui.composable.DialogProps
import io.aelf.portkey.demo.ui.composable.Loading
import io.aelf.portkey.demo.ui.composable.Loading.PortkeyLoading
import io.aelf.portkey.demo.ui.composable.PortkeyDialog
import io.aelf.portkey.demo.ui.composable.PortkeyDialog.PortkeyDialog
import io.aelf.portkey.demo.ui.composable.SimpleChoiceMaker
import io.aelf.portkey.demo.ui.theme.MyRNApplicationTheme
import io.aelf.portkey.demo.ui.theme.Purple40
import io.aelf.portkey.entry.usePortkeyEntryWithParams
import io.aelf.portkey.tools.callCaContractMethodTest
import io.aelf.portkey.tools.runTestCases
import io.aelf.portkey.wallet.isWalletUnlocked
import java.security.InvalidKeyException


val environment = mapOf(
    Pair("MAIN NET", "https://did-portkey.portkey.finance"),
    Pair("TEST NET", "https://did-portkey-test.portkey.finance"),
    Pair("Test1", "https://localtest-applesign.portkey.finance")
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyRNApplicationTheme {
                var devModeStatus by remember {
                    mutableStateOf(DemoStorage.isDevMode())
                }
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.Gray
                ) {
                    val cachedChainId = remember {
                        val chainId = PortkeyMMKVStorage.readString("currChainId")
                        if (chainId.isNullOrEmpty()) {
                            changeChain("AELF")
                        }
                        chainId ?: "AELF"
                    }
                    val cachedEndPointName = remember {
                        val url = PortkeyMMKVStorage.readString("endPointUrl")
                        if (url.isNullOrEmpty()) {
                            changeEndPointUrl("MAIN NET")
                        }
                        environment.keys.find { environment[it] == url } ?: "MAIN NET"
                    }
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.spacedBy(2.dp, Alignment.Top),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        SimpleChoiceMaker(
                            title = "Select a page",
                            choicesList = mutableListOf(
                                "Login",
                                "Scan",
                                "AccountingSettings",
                                "GuardianHome",
                                "AssetsHome",
                                "CheckUpdate"
                            )
                        ) {
                            gotoPage(it)
                        }
                        ChoiceMaker(
                            title = "Choose Chain",
                            choicesList = mutableListOf("AELF", "tDVV", "tDVW"),
                            defaultChoice = cachedChainId
                        ) {
                            changeChain(it)
                        }
                        ChoiceMaker(
                            title = "Choose EndPointUrl",
                            choicesList = environment.keys.toList(),
                            useClearWallet = true,
                            defaultChoice = cachedEndPointName
                        ) {
                            changeEndPointUrl(it)
                        }
                        BigButton(text = "Call CA Contract Method") {
                            callCaContractMethodTest(this@MainActivity) {
                                Loading.hideLoading()
                                showWarnDialog(
                                    mainTitle = "Contract Result",
                                    subTitle = "$it",
                                )
                            }
                            Loading.showLoading("Calling CA Contract Method...")
                        }
                        BigButton(text = "Run Test Cases") {
                            runTestCases(this@MainActivity) {
                                Loading.hideLoading()
                                showWarnDialog(
                                    mainTitle = "Test Result ".plus(if (it.status == "success") "😊" else "😅"),
                                    subTitle = "$it",
                                )
                            }
                            Loading.showLoading("Running Test Cases...")
                        }
                        BigButton("Sign out?") {
                            signOut()
                        }
                        BigButton(if (devModeStatus) "DevMode On" else "DevMode Off") {

                            DemoStorage.setDevMode(!(devModeStatus))
                            devModeStatus = !(devModeStatus)
                        }
                    }
                    PortkeyLoading()
                    PortkeyDialog()
                }
            }
        }
//        AssetHelper.copyAssetsToFiles(this)   // copy bundle to memory，Simulate the process of loading bundle remotely
    }

    private fun gotoPage(it: String) {
        when (it) {
            "Login" -> {
                jumpToActivity()
            }

            "Scan" -> {
                jumpToActivity(PortkeyEntries.SCAN_QR_CODE_ENTRY.entryName)
            }

            "AccountingSettings" -> {
                jumpToActivity(PortkeyEntries.ACCOUNT_SETTING_ENTRY.entryName)
            }

            "GuardianHome" -> {
                jumpToActivity(PortkeyEntries.GUARDIAN_HOME_ENTRY.entryName)
            }

            "AssetsHome" -> {
                jumpToActivity(PortkeyEntries.ASSETS_HOME_ENTRY.entryName)
            }
            "CheckUpdate" ->{
                jumpToActivity(PortkeyEntries.UPDATE_CHECK_ENTRY.entryName, true)
            }
            else -> {
                Toast.makeText(this, "Unknown page", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun jumpToActivity(entryName: String = PortkeyEntries.SIGN_IN_ENTRY.entryName, isSimple: Boolean = false) {
        jumpToActivityWithParams(entryName, isSimple)
    }

    private fun jumpToActivityWithParams(
        entryName: String = PortkeyEntries.SIGN_IN_ENTRY.entryName,
        isSimple: Boolean = false,
        params: Bundle? = null
    ) {
        if (entryName != PortkeyEntries.SIGN_IN_ENTRY.entryName && !isSimple) {
            if (!isWalletUnlocked()) {
                showWarnDialog(
                    mainTitle = "Error 😅",
                    subTitle = "this operation needs wallet unlocked, and it seems that you did not unlock your wallet yet, click button below to enter login page.",
                ) {
                    jumpToActivity()
                }
                return
            }
        }
        usePortkeyEntryWithParams(entryName, params) {
            if (it.getString("status") != "cancel") {
                showWarnDialog(
                    mainTitle = "Entry Result",
                    subTitle = "$it",
                )
            }
        }
    }

    private fun changeChain(chainId: String) {
        PortkeyMMKVStorage.writeString("currChainId", chainId)
    }

    private fun changeEndPointUrl(name: String) {
        PortkeyMMKVStorage.writeString(
            "endPointUrl",
            environment[name] ?: throw InvalidKeyException()
        )
    }

    private fun signOut() {
        PortkeyMMKVStorage.clear()
        Toast.makeText(this, "all data erased, and all configs are reset.", Toast.LENGTH_SHORT)
            .show()
    }

    private fun showWarnDialog(
        mainTitle: String = "Warning",
        subTitle: String = "",
        then: () -> Unit = {}
    ) {
        PortkeyDialog.show(
            DialogProps().apply {
                this.mainTitle = mainTitle
                this.subTitle = subTitle
                this.useSingleConfirmButton = true
                positiveCallback = then
            }
        )
    }

}

@Composable
internal fun BigButton(text: String, callback: () -> Unit) {
    Button(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 2.dp, start = 10.dp, end = 10.dp)
            .background(Purple40, RoundedCornerShape(10.dp))
            .height(50.dp),
        onClick = callback,
        colors = ButtonDefaults.buttonColors(containerColor = Purple40)
    ) {
        Text(text, fontSize = 14.sp)
    }

}
