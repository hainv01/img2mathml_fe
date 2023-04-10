import {defineStore} from 'pinia';
import {authApi} from './auth'

export const useFileStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        files: [],
        offset: 0,
        cur: 0,
        total: 0,
    }),
    actions: {
        async getFiles(offset = 1) {
            const result = await authApi.get('/files', {
                params: {
                    offset: this.offset,
                }
            })
            this.files = result.data.results;
            this.total = result.data.total;
            return result.data.results;
        },
        setCur(pos: number) {
          this.cur = pos;
        },
        getCurImg() {
          return this.files[this.cur]
        },
        getTotal() {
            return this.total
        },
        getCur() {
            return this.cur
        }
    }
});