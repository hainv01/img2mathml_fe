<template>

  <div>
    <div class="font-bold text-3xl text-center container mx-auto mb-4">
      Convert
    </div>
    <div class="relative flex items-center justify-center sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
      <form action="#" class="space-y-3" method="POST">
        <div class="grid grid-cols-1 space-y-2">
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
              <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                  <img alt="freepik image"
                       class="has-mask h-36 object-center"
                       src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg">
                </div>
                <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br/> or <a
                    id="" class="text-blue-600 hover:underline" href="">select a file</a> from your computer</p>
              </div>
              <input class="hidden" type="file">
            </label>
          </div>
        </div>
        <p class="text-sm text-gray-300">
          <span>File type: jpg, png</span>
        </p>
        <div>
          <button class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  type="submit">
            Convert to Docs
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Convert"
}
</script>