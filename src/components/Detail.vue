<template>
    <div>
        <div class="container p-8 flex justify-center mx-auto">
            <div class="flex flex-row mx-auto">
                <button v-if="cur === 0" class="bg-blue-300 text-white rounded-l-md border-r border-gray-100 py-2 px-3"
                        type="button">
                    <div class="flex flex-row align-middle">
                        <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  fill-rule="evenodd"></path>
                        </svg>
                        <p class="ml-2">Prev</p>
                    </div>
                </button>
                <button v-else
                        class="bg-blue-500 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-600 hover:text-white px-3"
                        type="button"
                        @click="onPrev">
                    <div class="flex flex-row align-middle">
                        <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  fill-rule="evenodd"></path>
                        </svg>
                        <p class="ml-2">Prev</p>
                    </div>
                </button>
                <div class="rounded-lr-md border-r  py-2 px-3">
                    <div class="flex flex-row align-middle">
                        <p class="ml-2">{{ cur + 1 }} / {{ total }}</p>
                    </div>
                </div>
                <button v-if="cur === total2"
                        class="bg-blue-300 text-white rounded-r-md py-2 border-l border-gray-200 px-3" type="button">
                    <div class="flex flex-row align-middle">
                        <span class="mr-2">Next</span>
                        <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </button>
                <button v-else
                        class="bg-blue-500 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-600 hover:text-white px-3"
                        type="button"
                        @click="onNex">
                    <div class="flex flex-row align-middle">
                        <span class="mr-2">Next</span>
                        <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
        <div class="flex relative justify-center items-center bg-no-repeat bg-cover sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 space-y-2">
                <div class="flex justify-center items-center w-full">
                    <label class="flex flex-col p-10 w-full  text-center rounded-lg border-4 border-dashed group">
                        <div class="flex flex-col justify-center items-center w-full h-full text-center">
                            <div class="flex flex-auto mx-auto ">
                                <img v-if="file.url" :src="file.url" alt="image" class="object-cover">
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="mb-6 p-8 flex">
            <!--            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">MathML</label>-->
            <input id="default-input w-full" :value="file.mathml"
                   class="bg-gray-50 sm:w-8/12 lg:w-10/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                   disabled type="text">
            <button v-clipboard="file.mathml"
                    class="bg-gray-50 sm:w-2/12 lg:w-1/12 right-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    @click="showClicked">
                <div>{{ !copied ? "Copy" : "Copied" }}</div>
            </button>
            <button class="bg-gray-50 sm:w-2/12 lg:w-1/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    @click="exportDoc">
                <div>Export</div>
            </button>
        </div>
    </div>
</template>

<script>
import {useFileStore} from "@/stores/snips";
import {mml2omml} from "mathml2omml";
import JSZip from "jszip";

export default {
    name: "Detail",
    data() {
        return {
            file: null,
            total: 0,
            total2: 0,
            cur: 0,
            fileStore: useFileStore(),
            copied: false,
            mathml: null,
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.file = this.fileStore.getCurImg()
            this.total = this.fileStore.getTotal();
            this.total2 = this.total - 1;
            this.cur = this.fileStore.getCur();
        },
        onPrev() {
            this.fileStore.setCur(this.cur - 1)
            this.getData()
            this.copied = false
        },
        onNex() {
            this.fileStore.setCur(this.cur + 1)
            this.getData()
            this.copied = false
        },
        showClicked() {
            this.copied = true
        },
        async exportDoc(e) {
            e.preventDefault();
            
            const mml = this.file.mathml
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
        }
    }
}
</script>