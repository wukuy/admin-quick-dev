<template>
    <basic-container>
        <div>
            <el-tag>page:{{ page }}</el-tag>
        </div>
        <div>
            <el-tag>search:{{ search }}</el-tag>
        </div>
        <div>
            <el-tag>form:{{ form }}</el-tag>
        </div>
        <avue-crud
            v-model="form"
            v-model:search="search"
            v-model:page="page"
            :option="option"
            :data="tableData"
            @on-load="onLoad"
            @row-save="rowSave"
            @row-update="rowUpdate"
            @row-del="rowUpdate"
        />
    </basic-container>
</template>
<script setup name="setup">
import { reactive, toRefs } from 'vue'

const data = reactive({
    tableData: [],
    option: {
        index: true,
        border: true,
        selection: true,
        rowKey: 'id',
        column: [{
            label: '姓名',
            prop: 'name',
            search: true,
            rules: [
                {
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }
            ]
        }]
    },
    search: {},
    form: {},
    page: {
        total: 20
    }
})
const { tableData, option, form, page, search } = toRefs(data)

function onLoad() {
    if(page.value.currentPage == 1) {
        tableData.value = [{
            id: 1,
            name: '1-smallwei'
        }]
    }else {
        tableData.value = [{
            id: 1,
            name: '2-smallwei'
        }]
    }
}
// eslint-disable-next-line no-unused-vars
function rowDel(row, index, done) {
    done(row)
}
function rowUpdate(row, index, done, loading) {
    done(row)
}
function rowSave(row, done, loading) {
    row.id = new Date().getTime()
    done(row)
}
</script>
