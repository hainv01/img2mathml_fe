<template>
    <div>
        <div class="container mx-auto mb-4 text-3xl font-bold text-center">
            Convert
        </div>
        <div class="flex relative justify-center items-center bg-no-repeat bg-cover sm:px-6 lg:px-8">
            <form action="#" class="space-y-3" method="POST">
                <div class="grid grid-cols-1 space-y-2">
                    <div class="flex justify-center items-center w-full">
                        <label class="flex flex-col p-10 w-full  text-center rounded-lg border-4 border-dashed group">
                            <div class="flex flex-col justify-center items-center w-full h-full text-center">
                                <div class="flex flex-auto mx-auto ">
                                    <img v-if="url" :src="url" alt="image" class="object-cover">
                                </div>
                                <p v-if="!url" class="text-gray-500 pointer-none">Select a file from your computer</p>
                            </div>
                            <input accept="image/*" class="hidden" type="file"
                                   @change="($event) => onFileChange($event)">
                        </label>
                    </div>
                </div>
                <p class="text-sm text-gray-300">
                    <span>File type: jpg, png</span>
                </p>
                <p class="text-sm text-red-500">{{ alert }}</p>
                <div>
                    <button
                            class="flex justify-center p-5 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                            @click="capture">
                        Capture
                    </button>
                    <button v-if="wait === false" :disabled="url === ''"
                            class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:bg-blue-300"
                            type="submit" @click="convert">
                        Convert to Docs
                    </button>
                    <button v-else
                            class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-300 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer"
                            disabled>
                        Converting...
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import Alert from "@/components/Alert.vue";
import {authApi, convertApi} from "@/stores/auth";
import {mml2omml} from "mathml2omml";
import JSZip from "jszip";

const electron = require('electron');
const fs = require('fs');
const {exec} = require("child_process");

export default defineComponent({
    name: "Convert",
    components: {Alert},
    data() {
        return {
            image: '',
            url: '',
            file: null,
            wait: false,
            alert: '',
        }
    },
    methods: {
        onFileChange(e) {
            this.alert = ""
            e.stopPropagation();
            e.preventDefault();
            const target = e.target;
            if (!target) return
            const file = target.files;
            if (!file) return
            if (file[0].size > 512 * 1024) {
                this.alert = "File's size can not larger than 512KB"
                return
            }
            this.file = file[0]
            console.log(this.file)
            this.url = URL.createObjectURL(file[0]);
            // console.log(file[0], "url", this.url)
            exec(`mkdir imgs`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            exec(`cp ${file[0].path} ./imgs/`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            let img = file[0].path.split("/")
            this.image = `./test/${img[img.length - 1]}`
        },
        async convert(e) {
            e.preventDefault()
            e.stopPropagation()
            this.wait = true
            const up_file = this.file
            let formData = new FormData();
            formData.append('file', up_file)
            const image = await authApi.post('/files/upload-image/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            if (image.data.mathml.length !== 0) {
                const mml = image.data.mathml
                const omml = mml2omml(mml)
                const doc = new DOMParser().parseFromString(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:oel="http://schemas.microsoft.com/office/2019/extlst" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" xmlns:w16du="http://schemas.microsoft.com/office/word/2023/wordml/word16du" xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh wp14"><w:body><w:p w14:paraId="0A549C04" w14:textId="4406A6B4" w:rsidR="0054395B" w:rsidRDefault="0054395B"><m:oMathPara>${omml}</m:oMathPara></w:p><w:sectPr w:rsidR="0054395B"><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body></w:document>`, 'text/xml');
                let response = await fetch(`http://localhost:5173/template.zip`);
                let data = await response.blob();
                // Load the ZIP archive
                JSZip.loadAsync(data)
                  .then(function (zip) {
                      // Replace the contents of the file "path/to/replace.txt" with new content
                      zip.file('word/document.xml', new XMLSerializer().serializeToString(doc));
                      // Generate a new ZIP archive
                      return zip.generateAsync({ type: "nodebuffer" });
                  })
                  .then(function (blob) {
                      const file = new File([blob], 'output.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                      let link = document.createElement('a')
                      link.href = window.URL.createObjectURL(file)
                      link.download = 'doc1.docx'
                      link.click()
                  })
                  .catch(function (error) {
                      console.error("Error replacing file in ZIP archive:", error);
                  });
                this.wait = false
                return
            }
            const latex = convertApi.post('/predict/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                this.wait = false
                console.log(image.data._id, res.data)
                authApi.patch(`/files/${image.data._id}`, {latex: res.data})
                  .then(async res => {
                      console.log(res.data)
                      const mml = res.data.mathml
                      const omml = mml2omml(mml)
                      const doc = new DOMParser().parseFromString(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:oel="http://schemas.microsoft.com/office/2019/extlst" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" xmlns:w16du="http://schemas.microsoft.com/office/word/2023/wordml/word16du" xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh wp14"><w:body><w:p w14:paraId="0A549C04" w14:textId="4406A6B4" w:rsidR="0054395B" w:rsidRDefault="0054395B"><m:oMathPara>${omml}</m:oMathPara></w:p><w:sectPr w:rsidR="0054395B"><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body></w:document>`, 'text/xml');
                      let response = await fetch(`http://localhost:5173/template.zip`);
                      let data = await response.blob();
                      
                      // Load the ZIP archive
                      JSZip.loadAsync(data)
                        .then(function (zip) {
                            // Replace the contents of the file "path/to/replace.txt" with new content
                            zip.file('word/document.xml', new XMLSerializer().serializeToString(doc));
                            
                            // Generate a new ZIP archive
                            return zip.generateAsync({type: "nodebuffer"});
                        })
                        .then(function (blob) {
                            const file = new File([blob], 'output.docx', {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
                            let link = document.createElement('a')
                            link.href = window.URL.createObjectURL(file)
                            link.download = 'doc1.docx'
                            link.click()
                        })
                        .catch(function (error) {
                            console.error("Error replacing file in ZIP archive:", error);
                        });
                      this.wait = false
                  })
                
            })
        },
        capture(e) {
            // e.stopPropagation();
            this.alert = ""
            e.preventDefault();
            exec(`mkdir imgs`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            let r = Date.now()
            electron.ipcRenderer.send('minimize-win')
            exec(`xfce4-screenshooter -r -s ./imgs/${r}.png`, async (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }

                this.url = `./imgs/${r}.png`
//        this.image = `./test/${r}.png`
                console.log(`stdout: ${this.url}`);
                let img = this.url.split("/")
                this.image = `./test/${img[img.length - 1]}`
                let response = await fetch(`http://localhost:5173/imgs/${r}.png`);
                let data = await response.blob();
                let metadata = {
                    type: 'image/jpeg'
                };
                this.file = new File([data], `${r}.png`, metadata);
                console.log(this.file)
                electron.ipcRenderer.send('unhide-win')
            });
        },
    }
})
</script>
