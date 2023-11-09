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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import io.aelf.core.PortkeyEntries
import io.aelf.portkey.components.logic.PortkeyMMKVStorage
import io.aelf.portkey.core.entry.PortkeyTest
import io.aelf.portkey.demo.ui.composable.ChoiceMaker
import io.aelf.portkey.demo.ui.theme.MyRNApplicationTheme
import io.aelf.portkey.demo.ui.theme.Purple40
import io.aelf.portkey.entry.usePortkeyEntry
import io.aelf.portkey.entry.usePortkeyEntryWithParams
import io.aelf.portkey.tools.startJSBackgroundTaskTest
import io.aelf.portkey.ui.dialog.DialogProps
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
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.Gray
                ) {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.spacedBy(2.dp, Alignment.Top),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        BigButton("Go to Login Entry", this@MainActivity::jumpToActivity)
                        ChoiceMaker(
                            title = "Choose Chain",
                            choicesList = mutableListOf("AELF", "tDVV", "tDVW")
                        ) {
                            changeChain(it)
                        }
                        ChoiceMaker(
                            title = "Choose EndPointUrl",
                            choicesList = environment.keys.toList(),
                            useClearWallet = true
                        ) {
                            changeEndPointUrl(it)
                        }
                        BigButton(text = "Jump to Scan Page") {
                            jumpToActivity(PortkeyEntries.SCAN_QR_CODE_ENTRY.entryName)
                        }
                        BigButton(text = "Jump to AccountSettings Page") {
                            jumpToActivityWithParams(PortkeyEntries.ACCOUNT_SETTING_ENTRY.entryName)
                        }
                        BigButton(text = "Background Service Call") {
                            startJSBackgroundTaskTest(this@MainActivity) {
                                PortkeyTest.showDialogForTestOnly(
                                    DialogProps().apply {
                                        mainTitle = "Background Service Call"
                                        subTitle =
                                            "data: ${it.data}"
                                        useSingleConfirmButton = true
                                    }
                                )
                            }
                        }
                        BigButton("Sign out?") {
                            signOut()
                        }
                    }
                    PortkeyTest.UsePortkeyViewStub()
                }
            }
        }
    }

    private fun jumpToActivity(entryName: String = "referral_entry") {
        usePortkeyEntry(entryName) {
            PortkeyTest.showDialogForTestOnly(
                DialogProps().apply {
                    mainTitle = "Login Result"
                    subTitle = "$it"
                    useSingleConfirmButton = true
                }
            )
        }
    }

    private fun jumpToActivityWithParams(
        entryName: String = "referral_entry",
        params: Bundle? = null
    ) {
        usePortkeyEntryWithParams(entryName, params) {
            PortkeyTest.showDialogForTestOnly(
                DialogProps().apply {
                    mainTitle = "Login Result"
                    subTitle = "$it"
                    useSingleConfirmButton = true
                }
            )
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
