//创建按钮（点击按钮找到cs路径触发cs函数）
var form = scriptContext.form;
if (scriptContext.type == 'view') {
    form.addButton({
        id: 'custpage_buttonid',
        label: '操作履歴ダウンロード',
        functionName: 'outPutFile()'
    });
    form.clientScriptModulePath = './btc_dl_cs_button_zxl.js';
}

var fieldGroupFirst = form.addFieldGroup({  //在画面中创建组
    id : 'custpage_btc_first_group1',
    label : ' '
});
fieldGroupFirst.isBorderHidden = true;      //是否显示组

//在文件柜中创建文件
file.create({
    name: 'zxl.txt',
    fileType: file.Type.PLAINTEXT,
    contents: 'sb',
    encoding: file.Encoding.UTF8,
    folder: 699,
});  

//处理数据
try {
    var key = context.key;
    var value = JSON.parse(context.value);
    context.write({
        key : key,
        value : value
    });
} catch (e) {
    log.error('Map エラー', e);
    throw e;
}

//发邮件
var userId = runtime.getCurrentUser().id;
    email.send({
        author : userId,
        recipients : userId,
        subject : "welcome",
        body : 'welcome:'+userId
    });

//生成PDF
var reportFile = file.load({
    id : 'テンプレート/PDFテンプレート/資材納品伝票.ftl'
});
var reportTemplate = reportFile.getContents();
var renderer = render.create();
    renderer.templateContent = reportTemplate;
    renderer.addCustomDataSource({
        format : render.DataSource.OBJECT,
        alias : "headerDic",
        data : headerDic
    });
var pdfTemplete = renderer.renderAsString();
var pdfFile = render.xmlToPdf({
    xmlString : pdfTemplete
});
context.response.writeFile(pdfFile, true);