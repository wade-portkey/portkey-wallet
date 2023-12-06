package io.aelf.core

import android.content.ContentProvider
import android.content.ContentValues
import android.database.Cursor
import android.net.Uri
import com.tencent.mmkv.MMKV


class InitProvider: ContentProvider() {
    override fun onCreate(): Boolean {
        MMKV.initialize(context)
        return false
    }

    
    override fun query(
        uri: Uri,
         projection: Array<String?>?,
         selection: String?,
         selectionArgs: Array<String?>?,
         sortOrder: String?
    ): Cursor {
        throw IllegalStateException("Not allowed.")
    }

    
    override fun getType(uri: Uri): String {
        throw IllegalStateException("Not allowed.")
    }
    
    override fun insert(uri: Uri, values: ContentValues?): Uri {
        throw IllegalStateException("Not allowed.")
    }

    override fun delete(
        uri: Uri,
        selection: String?,
        selectionArgs: Array<String?>?
    ): Int {
        throw IllegalStateException("Not allowed.")
    }

    override fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<String?>?
    ): Int {
        throw IllegalStateException("Not allowed.")
    }
}
