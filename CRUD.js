//添加数据（创建一条数据，在相应的字段添加固定的值）
require(['N/record'], function (record) {
    var rec = record.create({
        type: 'customrecord_p1_record',
        isDynamic: true
    });
    rec.setValue({
        fieldId: 'custrecord_age_1',
        value: 38
    });
    rec.save();
});

// 删除数据
require(['N/record'], function (record) {
    var rec = record.delete({
        type: 'customrecord_p1_record',
        id: 10
    });
});

//修改数据，复制数据（copy）
require(['N/record'], function (record) {
    var rec = record.load({
        type: 'customrecord_p1_record',
        id: 39,
        isDynamic: true
    });
    rec.setValue({
        fieldId: 'custrecord_age_1',
        value: 38
    });
    rec.save();
});

//查询数据(查取某个字段里的最大值)
require(['N/search'], function (search) {
    var name = "custrecord_age_1";
    var summary = "MAX";
    var columns = [search.createColumn({
        name: name,
        summary: summary,
    })];
    var type = "customrecord_p1_record";
    var filters = [];
    var mySearch = search.create({
        type: type,
        filters: filters,
        columns: columns
    });
    var myResultSet = mySearch.run();
    var resultRange = myResultSet.getRange({
        start: 0,
        end: 1
    });
    result = resultRange[0];
    var max = result.getValue(columns[0]);
    log.debug(max);
});

//查询数据(查取某个字段里的范围值)
require(['N/search'], function (search) {
    var name = "custrecord_age_1";
    var columns = [search.createColumn({
        name: name,
    })];
    var type = "customrecord_p1_record";
    var filters = [];
    var mySearch = search.create({
        type: type,
        filters: filters,
        columns: columns
    });
    var myResultSet = mySearch.run();
    var resultRange = myResultSet.getRange({        //resultRange输出：[{"recordType":"customrecord_p1_record","id":"39","values":{"custrecord_age_1":"38"}},...,...,...,...]	
        start: 0,
        end: 5
    });
    for (var i = 0; i < resultRange.length; i++) {
        result = resultRange[i];                    //result输出：{"recordType":"customrecord_p1_record","id":"39","values":{"custrecord_age_1":"38"}}
        var range = result.getValue(columns[0]);
        log.debug(range);
    }
});

//查询数据(查取某个记录里的字段ID)
require(['N/record'], function (record) {
    var rec = record.load({
        type: 'customrecord_p1_record',
        id: 40,
        isDynamic: true
    });
    var objFields = rec.getField({
        fieldId: "custrecord_richtext_1"
    });
    log.debug(objFields.id);    //不写id输出：{"id":"custrecord_richtext_1","label":"richtext","type":"richtext"}
});

//查询数据(查取某个记录里的某个字段的值)
require(['N/record'], function (record) {
    var rec = record.load({
        type: 'customrecord_p1_record',
        id: 40,
        isDynamic: true
    });
    var objFields = rec.getValue({
        fieldId: "custrecord_age_1"
    });
    log.debug(objFields);
});

