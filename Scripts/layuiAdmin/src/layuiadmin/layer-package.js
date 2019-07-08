
var layer = undefined, table = undefined, $ = undefined;
//一般直接写在一个js文件中
layui.use(['layer', 'form', 'table'], function () {
    layer = top.layer, table = layui.table, $ = layui.jquery;
});
function layerShow(titile, url, width, height, btnDom) {
    var index = layer.open({
        type: 2,
        title: [titile, 'background-color:#35aefd;color:#fff;font-weight:bold;'],
        //title: titile,
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area: [width + 'px', height + 'px'],
        content: url,
        success: function (layero) {
            layer.setTop(layero); //置顶。
        },
        end: function () {
            if (btnDom) {
                btnDom.click();
            }
        }
    });
}

//table绑定数据。
function bindTable(tableid, formid, url) {
    var paras = serializeObject($("#" + formid));
    table.reload(tableid, {
        method: 'post',
        url: url,
        where: paras,
        limits: [20, 50, 100, 200, 500],
        limit: 20,
        page: {
            curr: 1 //重新从第 1 页开始
        },
        request: {
            pageName: 'PageIndex', //页码的参数名称，默认：page
            limitName: 'PageSize' //每页数据量的参数名，默认：limit
        }
    });
}

function layerShowStyle(titile, url, width, height, titlebgcolor) {
    var index = layer.open({
        type: 2,
        title: titile,
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area: [width + 'px', height + 'px'],
        content: url,
        success: function (layero) {
            //layer.setTop(layero); //置顶。
        },
        end: function () {
            if (btnDom) {
                btnDom.click();
            }
        }
    });
}

//form表单序列化。
serializeObject = function (form) {
    try {
        var o = {};
        $.each(form.serializeArray(), function (index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }
    catch (e) {
        //$.AlertInfo("表单序列化脚本异常：" + e.message);
    }
};

/**
 *
 @method layerMiddleShow
 *
 @param  titile 标题
 *
 @param  url url
 *
 @param  width 弹出窗口宽度
 *
 @param  height 弹出窗口高度
 *
 @param  shadeClose 点击遮罩关闭层 default:false
 *
 @param  btnDom btnDom
 */
function layerMiddleShow(titile, url, width, height, shadeClose, btnDom) {
    if (!shadeClose) { shadeClose = false; }
    var index = layer.open({
        type: 2,
        title: [titile, 'background-color:#009688;color:#fff;font-weight:bold;'],
        maxmin: true,
        shadeClose: shadeClose, //点击遮罩关闭层
        area: [width + 'px', height + 'px'],
        content: url, zIndex: layer.zIndex, //重点1
        success: function (layero) {
            layer.setTop(layero); //重点2
        },
        end: function () {
            if (btnDom) {
                btnDom.click();
            }
        }
    });
}
function layerTopShow(titile, url, width, height, btnDom) {
    var index = layer.open({
        type: 2,
        title: [titile, 'background-color:#009688;color:#fff;font-weight:bold;'],
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area: [width + 'px', height + 'px'],
        content: url,
        zIndex: layer.zIndex, //重点1
        success: function (layero) {
            layer.setTop(layero); //重点2
        },
        end: function () {
            if (btnDom) {
                btnDom.click();
            }
        }
    });
    //layer.restore(index);
}


function layerImgShow(obj) {
    var tmpObj = new Image();
    tmpObj.onload = function () {
        //原始宽度  
        var width = this.width;
        //原始高度   
        var height = this.height;
        if (height > 650) {
            width = parseInt(650 * width / height);
            height = 650;
        }
        var top = ($(parent.window).height() - height) / 2;
        if (top < 10) {
            top = 30;
        }
        var divhtml = '<div style="text-align: center;width:800px;height:' + 500 + 'px;overflow:hidden;"><img class="grab" src=\"' + tmpObj.src + '?t=' + Math.random() + '\" style="position: absolute;top: 50%;left:50%;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);" id="currentImg"/><div style="position:absolute;bottom:20px;left:50%;margin-left:-66px;"><img title="左转90度" src="../../Content/images/right.png" onclick="tranImg(-90,\'currentImg\')">&nbsp;<img title="右转90度" src="../../Content/images/left.png" onclick="tranImg(90,\'currentImg\')">&nbsp;<img title="放大" src="../../Content/images/big.png" onclick="bigORsamll_img(\'big\',\'currentImg\')">&nbsp;<img title="缩小" src="../../Content/images/small.png" onclick="bigORsamll_img(\'small\',\'currentImg\')"></div></div><script>photo_yyl_look("currentImg");$("#img-yyl-container").css("overflow","hidden");<\/script>';
        // var divhtml = "<div><img src='" + tmpObj.src + "' style='height: " + height + "px; width: " + width + "px' /></div>";
        var index = layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            zIndex: layer.zIndex,
            shadeClose: true, //点击遮罩关闭层
            area: ['90%', '90%'],
            content: divhtml,
            success: function (layero) {
                layer.setTop(layero); //置顶。
            }
        });
    }
    tmpObj.src = $(obj).attr("src");
}



function layerClose() {
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭   
}
//消息提示。
function AlertMessage(message) {
    layer.msg(message, { icon: 5, time: 6000 });
}
//失败消息。
function AlertFailMessage(message) {
    layer.msg(message, { icon: 2, time: 6000 });
}
//成功消息。
function AlertSuccessMessage(message) {
    layer.msg(message, { icon: 1, time: 6000 });
}



/**yyl-photo-look.js**/
function photo_yyl_look(img_id) {
    var X1;
    var Y1;
    var img_w = $("#" + img_id).width();
    var img_h = $("#" + img_id).height();
    $("#" + img_id).css({ "margin-left": -img_w / 2, "margin-top": -img_h / 2 });
    function mouse_down(event) {
        grab.className = "grabbing";
        if (store.drag) {
            X1 = event.x - parseInt($("#" + img_id).css("margin-left"));//记录鼠标点击的初始x
            Y1 = event.y - parseInt($("#" + img_id).css("margin-top"));//记录鼠标点击的初始y
            store.move = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    function mouse_move(event) {
        if (store.move == true) {
            if (store.move) {
                $("#" + img_id).css("margin-left", (event.x - X1));
                $("#" + img_id).css("margin-top", (event.y - Y1));
            }

        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    }
    function mouse_up(event) {
        grab.className = "grab";
        store.move = false;
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    }
    if (window.addEventListener) {
        var grab = document.querySelector("#" + img_id);
        var store = { move: false, drag: true };

        grab.addEventListener("mousedown", function (event) {
            mouse_down(event);
        });

        document.addEventListener("mousemove", function (event) {
            mouse_move(event);
        });

        document.addEventListener("mouseup", function (event) {
            mouse_up(event);
        });


        grab.addEventListener("mousewheel", function (event) {
            if ((event.wheelDelta) > 0) {
                bigORsamll_img("big", img_id);
            } else if ((event.wheelDelta) < 0) {
                bigORsamll_img("small", img_id);
            }
        });
        grab.addEventListener("DOMMouseScroll", function (event) {//兼容火狐的鼠标滚动的
            if (event.detail == -3) {//等于-3是向上滚动
                bigORsamll_img("big", img_id);
            } else if (event.detail == 3) {
                bigORsamll_img("small", img_id);
            }
        });

    } else if (window.attachEvent) {
        var grab = document.querySelector("#" + img_id);
        var store = { move: false, drag: true };

        grab.attachEvent("onmousedown", function (event) {
            mouse_down(event);
        });

        document.attachEvent("onmousemove", function (event) {
            mouse_move(event);
        });

        document.attachEvent("onmouseup", function (event) {
            mouse_up(event);
        });

        grab.attachEvent("onmousewheel", function (event) {
            if (event.wheelDelta > 0) {
                bigORsamll_img("big", img_id);
            } else {
                bigORsamll_img("small", img_id);
            }
        });
    }
}

//旋转和放大
var current = 0;//初始角度
var deg_num = 0;
function tranImg(trun, id) {
    var img = $("#" + id);
    current = (current + trun) % 360;
    if (current == -0 || current == 0) {
        deg_num = 4;
    } else if (current == -90 || current == 270) {
        deg_num = 3;
    } else if (current == -180 || current == 180) {
        deg_num = 2;
    } else if (current == -270 || current == 90) {
        deg_num = 1;
    }
    img.css("filter", 'progid:DXImageTransform.Microsoft.BasicImage(rotation:' + deg_num + ')');//兼容ie的

    img.css("transform", 'translate(-50%,-50%) rotate(' + current + 'deg)');
}

//放大和缩小
function bigORsamll_img(bigORsamll, id) {
    var percent_dafault = 100;//图片开始的大小比例
    if (percent_dafault == 10 && bigORsamll == "small") {
        return false;
    } else if (percent_dafault == 300 && bigORsamll == "big") {
        return false;
    }
    if (bigORsamll == "big") {
        $("#" + id).width($("#" + id).width() * 1.1);
        $("#" + id).height($("#" + id).height() * 1.1);
        percent_dafault += 10;
    } else if (bigORsamll == "small") {
        $("#" + id).width($("#" + id).width() / 1.1);
        $("#" + id).height($("#" + id).height() / 1.1);
        percent_dafault -= 10;
    }
}


