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
                   class="bg-gray-50 w-10/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                   disabled type="text">
            <button v-clipboard="file.mathml"
                    class="bg-gray-50 right-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/12 p-2.5"
                    @click="showClicked">
                <div>{{ !copied ? "Copy" : "Copied" }}</div>
            </button>
            <button class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/12 p-2.5"
                    @click="exportDoc">
                <div>Export Docx</div>
            </button>
        </div>
    </div>
</template>

<script>
import {useFileStore} from "@/stores/snips";
import {exec} from "child_process";

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
        exportDoc(e) {
            e.preventDefault();
            exec(`pandoc -f latex -o a.docx <(echo "$ ${this.file.latex}$")`, async (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                // this.mathml = stdout
                let response = await fetch(`http://localhost:5173/a.docx`);
                let data = await response.blob();
                // let metadata = {
                //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                // };
                // const file = new File([data], `a.docx`, metadata);
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(data)
                link.download = 'doc1.docx'
                link.click()
                console.log(`stdout: ${stdout}`);
            });
        }
    }
}
</script>