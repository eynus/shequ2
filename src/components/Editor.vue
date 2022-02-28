<template>
  <div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
      class="editor"
    ></quill-editor>

    <form
      action
      method="post"
      enctype="multipart/form-data"
      id="uploadFormMulti"
    >
      <input
        style="display: none"
        :id="uniqueId"
        type="file"
        name="file"
        multiple
        accept="image/jpg, image/jpeg, image/png, image/gif"
        @change="uploadImg('uploadFormMulti')"
      />
    </form>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import request from '@/utils/request.js'
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module' // 引用
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize) // 注册
// 字体
let fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
Quill.imports['formats/font'].whitelist = fonts
Quill.register(Quill.imports['formats/font'])

// 工具栏配置
const toolbarOptions = [
  [{ 'font': fonts }],
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote'], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  // [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  // [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  // ["clean"], // 清除文本格式-----['clean']
  ['image'] // 链接、图片、视频-----['link', 'image', 'video']
]

export default {
  name: '',
  props: ['contentinit'],
  components: {
    quillEditor
  },
  data () {
    return {
      uniqueId: 'uniqueId',
      content: '', // 富文本编辑器默认内容
      editorOption: {
        theme: 'snow',
        placeholder: '请输入正文',
        modules: {
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          //  富文本编辑器配置
          toolbar: {
            container: toolbarOptions
          }
        }
      }

    }
  },
  computed: {
    // 当前富文本实例
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    contentinit (newV) {
      this.content = newV
    }
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady () { },
    // 富文本编辑器 失去焦点事件
    onEditorBlur () { },
    // 富文本编辑器 获得焦点事件
    onEditorFocus () { },
    // 富文本编辑器 内容改变事件
    onEditorChange () {
      this.$emit('getContent', this.content)
    },
    uploadImg: async function () {
      var _this = this
      // 构造formData对象
      var formData = new FormData()
      formData.append('file', document.getElementById(_this.uniqueId).files[0])

      try {
        // 调用上传文件接口
        request({
          url: '/UploadInfo.ashx?action=uploadPhoto',
          method: 'post',
          data: formData
        }).then(res => {
          // 返回上传文件的地址
          let url = res.data && res.data.filePath
          if (url) {
            let Range = _this.editor.getSelection()
            url = this.GlobalCfg.apiUrl + url
            // 上传文件成功之后在富文本中回显(显示)
            _this.editor.insertEmbed(
              Range != null ? Range.index : 0,
              'image',
              url
            )
          } else {
            _this.$message.warning('图片上传失败')
          }
          // 成功之后,将文件的文本框的value置空
          document.getElementById(_this.uniqueId).value = ''
        })
      } catch ({ message: msg }) {
        document.getElementById(_this.uniqueId).value = ''
        _this.$message.warning(msg)
      }
    }
  },
  created () {

  },
  mounted () {
    var _this = this
    var imgHandler = async function (image) {
      if (image) {
        var fileInput = document.getElementById(_this.uniqueId) // 隐藏的file文本ID
        fileInput.click() // 加一个触发事件
      }
    }
    _this.editor.getModule('toolbar').addHandler('image', imgHandler)
  }
}
</script>
<style>
/* @import url('../assets/css/font-awesome.min.css'); */
.editor {
  line-height: 40px !important;
  /* height: 0vh; */
}
.ql-toolbar.ql-snow{
  padding: 0 !important;
}
.ql-toolbar.ql-snow,.ql-container.ql-snow{
  border: 1px solid #eee ;
}

.ql-editor{
  height: calc(100vh - 300px) !important;
  overflow-y: auto;
}
/* .ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
} */
/* .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
} */

/* .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
} */

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
  content: "宋体";
  font-family: "SimSun"!important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
  content: "黑体";
  font-family: "SimHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
  content: "楷体";
  font-family: "KaiTi"!important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
  content: "仿宋";
  font-family: "FangSong";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
  content: "Arial";
  font-family: "Arial";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
  content: "Times New Roman";
  font-family: "Times New Roman";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
  content: "sans-serif";
  font-family: "sans-serif";
}

.ql-font-SimSun {
  font-family: "SimSun";
}
.ql-font-SimHei {
  font-family: "SimHei";
}
.ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}
.ql-font-KaiTi {
  font-family: "KaiTi";
}
.ql-font-FangSong {
  font-family: "FangSong";
}
.ql-font-Arial {
  font-family: "Arial";
}
.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}
.ql-font-sans-serif {
  font-family: "sans-serif";
}
.ql-snow .ql-picker{
  height: 32px;
  line-height: 32px;
}
.ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg{
  position: absolute;
  top: 50%;
  margin-top: -10px;
}
.ql-snow .ql-picker.ql-header,.ql-snow .ql-picker.ql-size{
  /* width: 60; */
}
.ql-snow .ql-picker.ql-font{
  /* width:6rem; */
}
</style>
