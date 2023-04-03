<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create and account
          </h1>
          <form action="#" class="space-y-4 md:space-y-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900" for="email">Your email</label>
              <input id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="email"
                     placeholder="email"
                     required="" type="email">
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900" for="password">Password</label>
              <input id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="password" placeholder="••••••••"
                     required=""
                     type="password">
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900" for="confirm-password">Confirm
                password</label>
              <input id="confirm-password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="confirm-password" placeholder="••••••••"
                     required=""
                     type="password">
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                       required=""
                       type="checkbox">
              </div>
              <div class="ml-3 text-sm">
                <label class="font-light text-gray-500" for="terms">I accept the <a
                    class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
              </div>
            </div>
            <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit">
              Create
              an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <router-link class="font-medium text-primary-600 hover:underline" to="/login">Login
                here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register"
}
</script>